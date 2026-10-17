import type { Metadata } from "next";
import { Manrope, Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AppProvider } from "@/components/providers/AppProvider";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { Toaster } from "@/components/ui/sonner";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
});

import TranslateProvider from "@/components/providers/TranslateProvider";

export const metadata: Metadata = {
  title: {
    default: "0211wohnen · Möblierte Apartments in Düsseldorf",
    template: "%s | 0211wohnen",
  },
  description:
    "Möblierte Apartments und Wohnen auf Zeit in Düsseldorf und Umgebung. Erstklassiger Standard, transparente Pauschalmiete.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          manrope.variable,
          playfair.variable,
          poppins.variable
        )}
      >
        <AuthProvider>
          <AppProvider>
            <TranslateProvider />
            {children}
            <Toaster />
          </AppProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
