"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { Dumbbell, Phone, Mail, MapPin, Clock, ArrowRight, Instagram, Facebook, Youtube, Twitter } from "lucide-react";

export const Footer: React.FC = () => {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return (
    <footer className="bg-zinc-950 border-t border-surface-border text-zinc-400 pt-16 pb-12 relative overflow-hidden">
      {/* Glow background accent */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-surface-border">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white font-extrabold font-heading text-xl shadow-lg shadow-primary-glow">
                <Dumbbell className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-widest text-white font-heading">
                  {siteConfig.logo.text}
                </span>
                <span className="text-[9px] font-bold tracking-widest text-zinc-400 uppercase">
                  {siteConfig.logo.subtext}
                </span>
              </div>
            </Link>

            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
              {siteConfig.description}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg bg-surface-card border border-surface-border flex items-center justify-center text-zinc-400 hover:text-white hover:bg-primary transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socials.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-lg bg-surface-card border border-surface-border flex items-center justify-center text-zinc-400 hover:text-white hover:bg-primary transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socials.youtube}
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-lg bg-surface-card border border-surface-border flex items-center justify-center text-zinc-400 hover:text-white hover:bg-primary transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socials.twitter}
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="w-9 h-9 rounded-lg bg-surface-card border border-surface-border flex items-center justify-center text-zinc-400 hover:text-white hover:bg-primary transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading mb-4 border-l-2 border-primary pl-2">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold uppercase tracking-wider">
              {siteConfig.nav.slice(0, 5).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-primary transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight className="w-3 h-3 text-zinc-600 group-hover:text-primary transition-colors" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Member Services */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading mb-4 border-l-2 border-primary pl-2">
              Explore More
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold uppercase tracking-wider">
              {siteConfig.nav.slice(5).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-primary transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight className="w-3 h-3 text-zinc-600 group-hover:text-primary transition-colors" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/schedule"
                  className="hover:text-primary transition-colors flex items-center gap-1.5 group"
                >
                  <ArrowRight className="w-3 h-3 text-zinc-600 group-hover:text-primary transition-colors" />
                  <span>Weekly Schedule</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="hover:text-primary transition-colors flex items-center gap-1.5 group"
                >
                  <ArrowRight className="w-3 h-3 text-zinc-600 group-hover:text-primary transition-colors" />
                  <span>7-Day Free Trial</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Hours & Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading mb-4 border-l-2 border-primary pl-2">
              Hours & Location
            </h4>

            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>
                  {siteConfig.contact.address}, {siteConfig.contact.city}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>{siteConfig.contact.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>{siteConfig.contact.email}</span>
              </div>
            </div>

            <div className="pt-2">
              <div className="flex items-center gap-2 text-xs font-bold text-white mb-1">
                <Clock className="w-3.5 h-3.5 text-primary" />
                <span>Working Hours</span>
              </div>
              <p className="text-[11px] text-zinc-400">
                Mon-Fri: {siteConfig.contact.workingHours.weekdays}
              </p>
              <p className="text-[11px] text-zinc-400">
                Sat-Sun: {siteConfig.contact.workingHours.weekends}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All Rights Reserved. Built with Next.js 15 template.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-zinc-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-zinc-300 transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-zinc-300 transition-colors">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
