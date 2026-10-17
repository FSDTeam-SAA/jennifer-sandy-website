import { PropertyDetail } from "@/components/home/property-detail";
import { SiteHeader } from "@/components/shared/site-header";
import { SiteFooter } from "@/components/shared/site-footer";
export const metadata = { title: "Immobilie | 0211wohnen" };
export default function ApartmentPage({ params }: { params: { slug: string } }) { return <><SiteHeader /><PropertyDetail slug={params.slug} /><SiteFooter /></>; }
