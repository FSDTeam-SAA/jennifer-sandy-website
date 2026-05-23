import { MinusCircle, PlusCircle } from "lucide-react";
import Image from "next/image";
import { ContactCtaSection } from "@/components/shared/contact-cta-section";

const faqs = [
  {
    q: "How does the booking process work?",
    a: "Our booking process is simple and digital. After you submit your request, we will review it and send you a digital rental agreement for signature. Attached you will receive all the necessary information for your move-in. We are here to support you every step of the way.",
  },
  { q: "What is included in the additional costs?" },
  { q: "Can I view the apartment?" },
  { q: "How long is the lease?" },
  { q: "How does billing work?" },
  { q: "How do I change my account email?" },
];

export function FaqPageContent() {
  return (
    <main className="space-y-20 py-12">
      <section className="container mx-auto px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-[12px]">
          <Image src="/images/banner.jpg" alt="FAQ banner" width={1600} height={420} className="h-[210px] w-full object-cover" priority />
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-10 text-center text-white">
            <h1 className="banner-title">Frequently Asked Questions</h1>
            <p className="banner-desc mt-2 text-white/90">Our team is ready to assist you with any questions, provide guidance, and help you confidently connect with the most suitable transition living facilities for your loved ones.</p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 lg:px-10">
        <div className="divide-y divide-slate-200 border-y border-slate-200">
          {faqs.map((item, index) => (
            <div key={item.q} className="py-5">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-[20px] text-slate-700">{item.q}</h3>
                {index === 0 ? (
                  <MinusCircle className="h-5 w-5 text-[#1672E6]" />
                ) : (
                  <PlusCircle className="h-5 w-5 text-[#1672E6]" />
                )}
              </div>
              {index === 0 && <p className="section-desc mt-2 pr-10 text-slate-500">{item.a}</p>}
            </div>
          ))}
        </div>
      </section>

      <ContactCtaSection />
    </main>
  );
}
