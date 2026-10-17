import { PropertyBrowser } from "@/components/home/property-browser";
import { SiteHeader } from "@/components/shared/site-header";
import { SiteFooter } from "@/components/shared/site-footer";
export const metadata = { title: "Apartments finden | 0211wohnen" };
export default function ApartmentsPage() { return <><SiteHeader /><main><PropertyBrowser /></main><SiteFooter /></>; }
