"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "./MobileMenu";
import { Menu, Phone, Dumbbell } from "lucide-react";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (pathname === "/") return null;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-zinc-950/85 backdrop-blur-xl border-b border-surface-border py-3 shadow-2xl"
            : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Gym Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white font-extrabold font-heading text-xl shadow-lg shadow-primary-glow group-hover:scale-105 transition-transform">
                <Dumbbell className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-widest text-white font-heading leading-tight group-hover:text-primary transition-colors">
                  {siteConfig.logo.text}
                </span>
                <span className="text-[9px] font-bold tracking-widest text-zinc-400 uppercase">
                  {siteConfig.logo.subtext}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 bg-surface-muted/40 p-1.5 rounded-full border border-surface-border">
              {siteConfig.nav.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-200 ${
                      isActive
                        ? "bg-primary text-white shadow-md shadow-primary-glow"
                        : "text-zinc-300 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Items */}
            <div className="hidden sm:flex items-center gap-4">
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="hidden xl:flex items-center gap-2 text-xs font-bold text-zinc-300 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-primary" />
                <span>{siteConfig.contact.phone}</span>
              </a>

              <Button href={siteConfig.hero.primaryCta.href} variant="primary" size="sm">
                Free Pass
              </Button>
            </div>

            {/* Mobile Hamburger Trigger */}
            <div className="flex lg:hidden items-center gap-3">
              <Button
                href={siteConfig.hero.primaryCta.href}
                variant="primary"
                size="sm"
                className="sm:hidden px-3 py-1.5 text-[11px]"
              >
                Free Pass
              </Button>
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2.5 text-zinc-300 hover:text-white bg-surface-card rounded-lg border border-surface-border"
                aria-label="Open mobile menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
};
