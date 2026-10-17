"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { MapPin as MapIcon, SlidersHorizontal, Shield, RefreshCw } from "lucide-react";
import { apiBaseUrl, cleanTitle, Estate, estateAvailability, estateLocation, estatePrice, MapPin } from "@/lib/estates";
import { PropertyMap } from "./property-map";

export function PropertyBrowser({
  externalFilters,
}: {
  externalFilters?: { availableFrom?: string; district?: string; minRooms?: string };
} = {}) {
  const [search, setSearch] = useState(externalFilters?.district || "");
  const [marketing, setMarketing] = useState("miete");
  const [minRooms, setMinRooms] = useState(externalFilters?.minRooms || "");
  const [maxPrice, setMaxPrice] = useState("");
  const [availableFrom, setAvailableFrom] = useState(externalFilters?.availableFrom || "");
  const [estates, setEstates] = useState<Estate[]>([]);
  const [pins, setPins] = useState<MapPin[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reload, setReload] = useState(0);
  const list = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const sp = new URLSearchParams(window.location.search);
      const urlDist = sp.get("district") || sp.get("search");
      if (urlDist) setSearch(urlDist);
    }
  }, []);

  useEffect(() => {
    if (externalFilters) {
      if (externalFilters.district !== undefined) setSearch(externalFilters.district);
      if (externalFilters.availableFrom !== undefined) setAvailableFrom(externalFilters.availableFrom);
      if (externalFilters.minRooms !== undefined) setMinRooms(externalFilters.minRooms);
    }
  }, [externalFilters]);

  const query = useMemo(() => {
    const params = new URLSearchParams();
    Object.entries({ searchTerm: search.trim(), vermarktungsart: marketing, minRooms, maxPrice, availableFrom }).forEach(([key, value]) => { if (value) params.set(key, value); });
    return params.toString();
  }, [search, marketing, minRooms, maxPrice, availableFrom]);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");
    setEstates([]);
    setPins([]);
    setSelectedId(null);
    const timeout = setTimeout(async () => {
      try {
        const read = async (path: string) => {
          const response = await fetch(`${apiBaseUrl()}${path}`, { signal: controller.signal, cache: "no-store" });
          if (!response.ok) throw new Error("Loading failed");
          return response.json();
        };
        const first = await read(`/onoffice/estates?${query}&page=1&limit=100`);
        if (!Array.isArray(first.data)) throw new Error("Invalid response");
        const all: Estate[] = [...first.data];
        const total = Number(first.meta?.total ?? all.length);
        const size = Number(first.meta?.limit || 100);
        for (let page = 2; (page - 1) * size < total; page++) {
          const next = await read(`/onoffice/estates?${query}&page=${page}&limit=100`);
          if (!Array.isArray(next.data) || !next.data.length) break;
          all.push(...next.data);
        }
        const map = await read(`/onoffice/estates/map?${query}`);
        if (!Array.isArray(map.data)) throw new Error("Invalid map response");
        if (controller.signal.aborted) return;
        const ids = new Set(all.map((estate) => estate._id));
        setEstates(all);
        setPins(map.data.filter((pin: MapPin) => ids.has(pin._id)));
      } catch {
        if (!controller.signal.aborted) setError("Die Immobilien konnten nicht geladen werden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 250);
    return () => {
      controller.abort();
      clearTimeout(timeout);
    };
  }, [query, reload]);

  const select = (id: string) => {
    setSelectedId(id);
    list.current?.querySelector<HTMLElement>(`[data-estate-id="${CSS.escape(id)}"]`)?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  const reset = () => {
    setSearch("");
    setMarketing("miete");
    setMinRooms("");
    setMaxPrice("");
    setAvailableFrom("");
  };

  const inputClass = "mt-2 h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm focus:border-[#1672E6] focus:outline-none focus:ring-2 focus:ring-[#1672E6]/20";

  return (
    <section id="wohnungen" className="container scroll-mt-28 px-4 py-8 sm:px-6 lg:px-10" aria-labelledby="property-heading">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h2 id="property-heading" className="section-title text-[#1672E6]">Map View</h2>
          <Shield className="h-8 w-8 text-[#1672E6]" strokeWidth={2.2} />
        </div>
        <p aria-live="polite" className="text-sm font-semibold text-slate-500">
          {loading ? "Apartments werden geladen …" : `${estates.length} Apartments in Düsseldorf`}
        </p>
      </div>

      <details className="mb-6 rounded-2xl border border-slate-200 bg-white shadow-sm transition">
        <summary className="flex cursor-pointer list-none items-center gap-2 p-4 text-sm font-semibold text-slate-700 hover:text-[#1672E6]">
          <SlidersHorizontal className="h-4 w-4 text-[#1672E6]" />
          <span>Filter & Suche anpassen</span>
          <span className="ml-auto text-xs font-normal text-slate-400">Klicken zum Öffnen / Schließen</span>
        </summary>
        <div className="grid gap-4 border-t border-slate-100 p-5 sm:grid-cols-2 lg:grid-cols-5">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
            Stadtteil / Begriff
            <input value={search} onChange={(event) => setSearch(event.target.value)} type="search" className={inputClass} placeholder="z. B. Carlstadt, Hafen" />
          </label>
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
            Angebotsart
            <select value={marketing} onChange={(event) => setMarketing(event.target.value)} className={inputClass}>
              <option value="miete">Mieten (Pauschal)</option>
              <option value="kauf">Kaufen</option>
              <option value="">Alle Angebote</option>
            </select>
          </label>
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
            Zimmer ab
            <input value={minRooms} onChange={(event) => setMinRooms(event.target.value)} type="number" min="0" step="0.5" className={inputClass} placeholder="z. B. 1" />
          </label>
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
            Preis bis (€)
            <input value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)} type="number" min="0" step="50" className={inputClass} placeholder="z. B. 2000" />
          </label>
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
            Einzug ab
            <input value={availableFrom} onChange={(event) => setAvailableFrom(event.target.value)} type="date" className={inputClass} />
          </label>
          <div className="sm:col-span-2 lg:col-span-5 flex items-center justify-between pt-2">
            <button type="button" onClick={reset} className="text-xs font-semibold text-slate-500 hover:text-red-600 underline underline-offset-4">
              Filter zurücksetzen
            </button>
            <span className="text-xs text-slate-400">Synchronisiert live mit interaktiver Google Maps</span>
          </div>
        </div>
      </details>

      {error ? (
        <div role="alert" className="rounded-2xl border border-red-200 bg-red-50/50 p-8 text-center">
          <p className="text-sm font-medium text-red-700">{error}</p>
          <button
            type="button"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#1672E6] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#125ec4]"
            onClick={() => setReload((current) => current + 1)}
          >
            <RefreshCw className="h-4 w-4" /> Erneut versuchen
          </button>
        </div>
      ) : (
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          <div ref={list} className="space-y-3.5 lg:max-h-[680px] lg:overflow-y-auto lg:pr-2" aria-busy={loading}>
            {loading ? (
              <div role="status" className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-sm text-slate-500">
                <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-[#1672E6]" />
                Veröffentlichte onOffice-Immobilien werden geladen …
              </div>
            ) : !estates.length ? (
              <div role="status" className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-sm text-slate-500">
                Keine Apartments für diese Auswahl gefunden. Bitte passen Sie Ihre Filter an.
              </div>
            ) : (
              estates.map((estate) => {
                const price = estatePrice(estate);
                const image = estate.titleImage || estate.images?.[0];
                const isSelected = selectedId === estate._id;
                return (
                  <article
                    key={estate._id}
                    data-estate-id={estate._id}
                    className={`scroll-m-4 overflow-hidden rounded-2xl border-2 bg-white transition-all duration-200 ${
                      isSelected
                        ? "border-[#1672E6] shadow-lg ring-4 ring-[#1672E6]/10"
                        : "border-slate-200 hover:border-slate-300 hover:shadow-sm"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => select(estate._id)}
                      aria-pressed={isSelected}
                      className="grid w-full gap-4 p-4 text-left sm:grid-cols-[160px_1fr]"
                    >
                      <div className="relative h-44 overflow-hidden rounded-xl bg-slate-100 sm:h-full sm:min-h-36">
                        {image?.url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={image.url}
                            alt={image.title || cleanTitle(estate.objekttitel)}
                            className="h-full w-full object-cover transition duration-300 hover:scale-105"
                            loading="lazy"
                          />
                        ) : (
                          <span className="flex h-full items-center justify-center text-xs text-slate-400">
                            Kein Bild verfügbar
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col justify-between">
                        <div>
                          <h3 className="text-base font-bold text-slate-800 line-clamp-1">
                            {cleanTitle(estate.objekttitel)}
                          </h3>
                          <p className="mt-1 flex items-start gap-1 text-xs text-slate-500">
                            <MapIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#1672E6]" />
                            {estateLocation(estate)}
                          </p>
                          <div className="mt-2.5 flex flex-wrap gap-2 text-xs font-medium text-slate-600">
                            {estate.wohnflaeche ? (
                              <span className="rounded-md bg-slate-100 px-2 py-0.5">
                                {estate.wohnflaeche} m²
                              </span>
                            ) : null}
                            {estate.anzahl_zimmer ? (
                              <span className="rounded-md bg-slate-100 px-2 py-0.5">
                                {estate.anzahl_zimmer} Zimmer
                              </span>
                            ) : null}
                            {estate.rentalStatusLabel && (
                              <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-emerald-700">
                                {estate.rentalStatusLabel}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="mt-3 pt-2 border-t border-slate-100 flex items-end justify-between">
                          <div>
                            <p className="text-lg font-bold text-[#1672E6]">
                              {price.text}{" "}
                              <span className="text-xs font-normal text-slate-500">
                                {price.period}
                              </span>
                            </p>
                            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                              {price.label}
                            </p>
                          </div>
                          <p className="text-xs text-slate-500 font-medium">
                            {estateAvailability(estate)}
                          </p>
                        </div>
                      </div>
                    </button>
                    <div className="border-t border-slate-100 bg-slate-50/50 px-4 py-2.5 text-right">
                      <Link
                        href={`/apartments/${encodeURIComponent(estate.slug || String(estate.onofficeId))}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#1672E6] hover:underline"
                      >
                        Details & Buchung anfragen →
                      </Link>
                    </div>
                  </article>
                );
              })
            )}
          </div>
          <div className="lg:sticky lg:top-28">
            <PropertyMap pins={pins} selectedId={selectedId} onSelect={select} />
            <p className="mt-2 text-xs text-slate-400 text-center">
              Klicken Sie auf Pins in der Karte oder auf Apartment-Karten zur gegenseitigen Hervorhebung.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
