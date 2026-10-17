/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useState } from "react";
import { Shield, RefreshCw } from "lucide-react";
import { cleanTitle, type MapPin } from "@/lib/estates";

type Position = { lat: number; lng: number };
type GMap = {
  fitBounds(bounds: unknown): void;
  panTo(point: Position): void;
  setZoom(zoom: number): void;
  getZoom(): number;
};
type Marker = {
  setMap(map: GMap | null): void;
  setIcon(icon: object): void;
  setZIndex(index: number): void;
  getPosition(): Position;
  addListener(event: string, handler: () => void): { remove(): void };
};
type InfoWindow = {
  setContent(content: string | HTMLElement): void;
  open(options: { map: GMap; anchor?: any }): void;
  close(): void;
};
type Maps = {
  Map: new (element: HTMLElement, options: object) => GMap;
  Marker: new (options: object) => Marker;
  InfoWindow: new (options?: object) => InfoWindow;
  LatLngBounds: new () => { extend(point: Position): void; isEmpty(): boolean };
  SymbolPath: { CIRCLE: number };
};

declare global {
  interface Window {
    google?: any;
  }
}

let mapsLoaderPromise: Promise<Maps> | undefined;

function loadGoogleMapsApi(apiKey: string): Promise<Maps> {
  if (typeof window !== "undefined" && window.google?.maps) {
    return Promise.resolve(window.google.maps);
  }
  if (mapsLoaderPromise) return mapsLoaderPromise;

  mapsLoaderPromise = new Promise<Maps>((resolve, reject) => {
    const existingScript = document.getElementById("google-maps-script");
    if (existingScript) {
      existingScript.addEventListener("load", () => {
        if (window.google?.maps) resolve(window.google.maps);
        else reject(new Error("Google Maps not available"));
      });
      existingScript.addEventListener("error", () => reject(new Error("Script load failed")));
      return;
    }

    const script = document.createElement("script");
    script.id = "google-maps-script";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
      apiKey
    )}&v=weekly&language=de&region=DE`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (window.google?.maps) {
        resolve(window.google.maps);
      } else {
        reject(new Error("Google Maps object not found"));
      }
    };
    script.onerror = () => reject(new Error("Failed to load Google Maps SDK"));
    document.head.appendChild(script);
  }).catch((err) => {
    mapsLoaderPromise = undefined;
    throw err;
  });

  return mapsLoaderPromise;
}

function parsePosition(pin: MapPin): Position | null {
  if (pin.breitengrad == null || pin.laengengrad == null) return null;
  const lat = Number(pin.breitengrad);
  const lng = Number(pin.laengengrad);
  return Number.isFinite(lat) &&
    Number.isFinite(lng) &&
    Math.abs(lat) <= 90 &&
    Math.abs(lng) <= 180 &&
    !(lat === 0 && lng === 0)
    ? { lat, lng }
    : null;
}

// Clean luxury map style matching 0211wohnen design
const mapStyles = [
  {
    featureType: "all",
    elementType: "geometry.fill",
    stylers: [{ weight: "2.00" }],
  },
  {
    featureType: "all",
    elementType: "geometry.stroke",
    stylers: [{ color: "#9c9c9c" }],
  },
  {
    featureType: "all",
    elementType: "labels.text",
    stylers: [{ visibility: "on" }],
  },
  {
    featureType: "landscape",
    elementType: "all",
    stylers: [{ color: "#f2f2f2" }],
  },
  {
    featureType: "poi",
    elementType: "all",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "road",
    elementType: "all",
    stylers: [{ saturation: -100 }, { lightness: 45 }],
  },
  {
    featureType: "transit",
    elementType: "all",
    stylers: [{ visibility: "simplified" }],
  },
  {
    featureType: "water",
    elementType: "all",
    stylers: [{ color: "#cbe3fb" }, { visibility: "on" }],
  },
];

export function PropertyMap({
  pins,
  selectedId,
  onSelect,
}: {
  pins: MapPin[];
  selectedId: string | null;
  onSelect(id: string): void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<GMap | null>(null);
  const markersRef = useRef<Map<string, Marker>>(new Map());
  const infoWindowRef = useRef<InfoWindow | null>(null);
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  const [mapsApi, setMapsApi] = useState<Maps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadTrigger, setReloadTrigger] = useState(0);

  const apiKey =
    process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY ||
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
    process.env.GOOGLE_MAP_API_KEY ||
    "AIzaSyAgyE_W9FyqF-CAGQnFe8GvVCGVaZohABY";

  // 1. Initialize Google Map
  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    loadGoogleMapsApi(apiKey)
      .then((maps) => {
        if (!active || !containerRef.current) return;
        setMapsApi(maps);

        if (!mapInstanceRef.current) {
          const map = new maps.Map(containerRef.current, {
            center: { lat: 51.2277, lng: 6.7735 }, // Duesseldorf center
            zoom: 12,
            styles: mapStyles,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: true,
            zoomControl: true,
            gestureHandling: "cooperative",
          });
          mapInstanceRef.current = map;
          infoWindowRef.current = new maps.InfoWindow({ maxWidth: 260 });
        }
        setLoading(false);
      })
      .catch((err) => {
        if (active) {
          setError(err?.message || "Google Maps konnte nicht geladen werden.");
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [apiKey, reloadTrigger]);

  // 2. Render Markers on pins change
  useEffect(() => {
    if (!mapsApi || !mapInstanceRef.current) return;

    const bounds = new mapsApi.LatLngBounds();
    const listeners: { remove(): void }[] = [];

    // Clear old markers
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current.clear();

    pins.forEach((pin) => {
      const pos = parsePosition(pin);
      if (!pos) return;

      const marker = new mapsApi.Marker({
        map: mapInstanceRef.current,
        position: pos,
        title: cleanTitle(pin.objekttitel),
        icon: {
          path: mapsApi.SymbolPath.CIRCLE,
          scale: 9,
          fillColor: "#1672E6",
          fillOpacity: 1,
          strokeColor: "#FFFFFF",
          strokeWeight: 3,
        },
      });

      const listener = marker.addListener("click", () => {
        onSelectRef.current(pin._id);
      });
      listeners.push(listener);

      markersRef.current.set(pin._id, marker);
      bounds.extend(pos);
    });

    if (!bounds.isEmpty() && pins.length > 0) {
      mapInstanceRef.current.fitBounds(bounds);
    }

    const currentMarkers = markersRef.current;
    return () => {
      listeners.forEach((l) => l.remove());
      currentMarkers.forEach((m) => m.setMap(null));
      currentMarkers.clear();
    };
  }, [mapsApi, pins]);

  // 3. Highlight Selected Pin & Open InfoWindow
  useEffect(() => {
    if (!mapsApi || !mapInstanceRef.current) return;

    markersRef.current.forEach((marker, id) => {
      const isSelected = id === selectedId;
      marker.setIcon({
        path: mapsApi.SymbolPath.CIRCLE,
        scale: isSelected ? 13 : 9,
        fillColor: isSelected ? "#FF385C" : "#1672E6",
        fillOpacity: 1,
        strokeColor: "#FFFFFF",
        strokeWeight: isSelected ? 4 : 3,
      });
      marker.setZIndex(isSelected ? 9999 : 1);
    });

    if (selectedId) {
      const pin = pins.find((p) => p._id === selectedId);
      const marker = markersRef.current.get(selectedId);
      const pos = pin ? parsePosition(pin) : null;

      if (pos && mapInstanceRef.current) {
        mapInstanceRef.current.panTo(pos);
        if (mapInstanceRef.current.getZoom() < 13) {
          mapInstanceRef.current.setZoom(14);
        }

        if (infoWindowRef.current && marker && pin) {
          const priceDisplay = pin.miete_pauschal
            ? `${pin.miete_pauschal} € / Monat`
            : pin.price
            ? `${pin.price} €`
            : "Preis auf Anfrage";

          const imageTag = pin.titleImage?.url
            ? `<div style="height:110px;width:100%;overflow:hidden;border-radius:10px;margin-bottom:8px;">
                 <img src="${pin.titleImage.url}" alt="" style="height:100%;width:100%;object-fit:cover;" />
               </div>`
            : "";

          const html = `
            <div style="font-family: inherit; font-size: 13px; line-height: 1.4; color: #1e293b; padding: 2px;">
              ${imageTag}
              <div style="font-weight: 700; color: #0f172a; margin-bottom: 2px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                ${cleanTitle(pin.objekttitel) || "Wohnung in Düsseldorf"}
              </div>
              <div style="font-size: 11px; color: #64748b; margin-bottom: 8px;">
                ${pin.stadtteil ? `${pin.stadtteil}, ` : ""}Düsseldorf
              </div>
              <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid #f1f5f9; padding-top: 6px;">
                <span style="font-weight: 800; color: #1672E6; font-size: 13px;">${priceDisplay}</span>
                <a href="/apartments/${encodeURIComponent(
                  pin.slug || String(pin._id)
                )}" style="background: #1672E6; color: #ffffff; padding: 4px 10px; border-radius: 6px; text-decoration: none; font-size: 11px; font-weight: 600;">
                  Details →
                </a>
              </div>
            </div>
          `;

          infoWindowRef.current.setContent(html);
          infoWindowRef.current.open({
            map: mapInstanceRef.current,
            anchor: marker as any,
          });
        }
      }
    } else {
      infoWindowRef.current?.close();
    }
  }, [mapsApi, pins, selectedId]);

  return (
    <div className="relative h-[380px] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm lg:h-[680px]">
      <div
        ref={containerRef}
        className="h-full w-full"
        aria-label="Interaktive Google Map mit Apartments in Düsseldorf"
      />

      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50/80 backdrop-blur-sm">
          <div className="h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-[#1672E6]" />
          <p className="mt-3 text-xs font-semibold text-slate-600">
            Google Maps wird geladen …
          </p>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-white/95">
          <Shield className="h-10 w-10 text-[#1672E6] mb-2" />
          <p className="text-sm font-semibold text-slate-700">Karte wird vorbereitet</p>
          <p className="mt-1 text-xs text-slate-500 max-w-xs">{error}</p>
          <button
            type="button"
            onClick={() => setReloadTrigger((c) => c + 1)}
            className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-[#1672E6] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#125ec4]"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Erneut versuchen
          </button>
        </div>
      )}

      {!loading && !error && pins.length > 0 && (
        <div className="pointer-events-none absolute bottom-4 left-4 z-10 rounded-xl bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-md backdrop-blur-sm">
          📍 {pins.filter(parsePosition).length} Standorte auf der Karte
        </div>
      )}
    </div>
  );
}
