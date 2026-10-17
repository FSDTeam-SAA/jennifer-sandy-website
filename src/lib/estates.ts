export type EstateImage = { id?: number; url: string; title?: string };
export type Estate = {
  _id: string; onofficeId?: number; slug?: string; objekttitel: string;
  ort?: string; stadtteil?: string; plz?: string; strasse?: string; hausnummer?: string;
  wohnflaeche?: number; anzahl_zimmer?: number; breitengrad?: number; laengengrad?: number;
  verfuegbar_ab?: string | null; verfuegbarAbText?: string;
  kaltmiete?: number; warmmiete?: number; kaufpreis?: number; miete_pauschal?: number;
  vermarktungsart?: string; vermarktungsartLabel?: string; objektartLabel?: string;
  price?: number | null; priceType?: "rent" | "purchase" | "unknown";
  priceLabel?: string; pricePeriod?: "day" | "week" | "month" | null;
  rentalStatusLabel?: string; titleImage?: EstateImage | null; images?: EstateImage[];
  objektbeschreibung?: string; lage?: string; ausstatt_beschr?: string; minimumStay?: string;
  amenities?: Record<string, boolean>;
};
export type MapPin = {
  _id: string;
  objekttitel: string;
  breitengrad?: number;
  laengengrad?: number;
  slug?: string;
  stadtteil?: string;
  ort?: string;
  price?: number | null;
  miete_pauschal?: number;
  titleImage?: EstateImage | null;
};
export const estateLocation = (estate: Estate) => [estate.stadtteil, estate.plz, estate.ort].filter(Boolean).join(" · ");
export function estatePrice(estate: Estate) {
  const type = estate.priceType ?? (estate.vermarktungsart === "kauf" ? "purchase" : estate.vermarktungsart === "miete" ? "rent" : "unknown");
  const amount = estate.price !== undefined ? estate.price : type === "purchase" ? estate.kaufpreis : type === "rent" ? (estate.miete_pauschal || estate.warmmiete || estate.kaltmiete) : null;
  const period = estate.pricePeriod === "day" ? "Tag" : estate.pricePeriod === "week" ? "Woche" : estate.pricePeriod === "month" ? "Monat" : "";
  return { text: amount && amount > 0 ? new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 2 }).format(amount) : "Preis auf Anfrage", label: estate.priceLabel || (type === "purchase" ? "Kaufpreis" : type === "rent" ? estate.miete_pauschal ? "Pauschalmiete" : estate.warmmiete ? "Warmmiete" : "Kaltmiete" : ""), period: type === "rent" && period ? `/ ${period}` : "" };
}
export function estateAvailability(estate: Estate) {
  if (estate.verfuegbarAbText) return estate.verfuegbarAbText;
  if (!estate.verfuegbar_ab) return "Verfügbarkeit auf Anfrage";
  const date = new Date(estate.verfuegbar_ab);
  return Number.isNaN(date.getTime()) ? "Verfügbarkeit auf Anfrage" : `Verfügbar ab ${date.toLocaleDateString("de-DE", { timeZone: "Europe/Berlin" })}`;
}
export const apiBaseUrl = () => (process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api/v1").replace(/\/$/, "");
export const estateImages = (estate: Estate) => [estate.titleImage, ...(estate.images || [])].filter((image): image is EstateImage => Boolean(image?.url)).filter((image, index, images) => images.findIndex((other) => other.url === image.url) === index);

// Strip leading/trailing asterisks (*), hashtags, and decorative symbols from titles
export function cleanTitle(title?: string): string {
  if (!title) return "";
  return title
    .replace(/\*+/g, " ")
    .replace(/^[\s#!~=\-_–—•·|:]+/, "")
    .replace(/[\s#!~=\-_–—•·|:]+$/, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

// Render CRM/editor HTML as text. Untrusted markup must never execute in visitors' browsers.
export function contentText(value: string = "") {
  if (typeof document !== "undefined") {
    const documentValue = new DOMParser().parseFromString(value.replace(/<\/(p|div|h[1-6]|li)>/gi, "\n\n").replace(/<br\s*\/?\s*>/gi, "\n"), "text/html");
    documentValue.querySelectorAll("script,style,iframe,object,embed").forEach((element) => element.remove());
    return documentValue.body.textContent?.trim() || "";
  }
  return value.replace(/<[^>]*>/g, "").trim();
}
