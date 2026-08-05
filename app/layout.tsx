import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { StudioBanner } from "@/components/common/StudioBanner";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Hatab Studios | Digital Web Portfolio",
    template: "%s | Hatab Studios",
  },
  description: "Hatab Studios Portfolio - Explore featured digital experiences and web platforms.",
  keywords: ["Hatab Studios", "Web Portfolio", "Gym Template", "Aasifaa", "Majarrah", "Vercel Apps"],
  authors: [{ name: "Hatab Studios" }],
  openGraph: {
    title: "Hatab Studios | Digital Web Portfolio",
    description: "Explore featured digital experiences and web platforms built by Hatab Studios.",
    url: siteConfig.domain,
    siteName: "Hatab Studios",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-background text-foreground antialiased flex flex-col selection:bg-primary selection:text-white">
        <StudioBanner />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
