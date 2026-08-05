"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { X, Dumbbell, Phone, Mail, MapPin, Instagram, Facebook, Youtube } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-zinc-950 border-l border-surface-border p-6 flex flex-col justify-between overflow-y-auto z-10"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between pb-6 border-b border-surface-border">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white">
                  <Dumbbell className="w-5 h-5" />
                </div>
                <span className="text-lg font-black tracking-widest text-white font-heading">
                  {siteConfig.logo.text}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/10"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="py-6 flex flex-col gap-2">
              {siteConfig.nav.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={`px-4 py-3 text-sm font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-between ${
                      isActive
                        ? "bg-primary text-white font-extrabold"
                        : "text-zinc-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-white animate-pulse" />}
                  </Link>
                );
              })}
            </div>

            {/* Bottom Contact & CTA */}
            <div className="pt-6 border-t border-surface-border space-y-4">
              <Button
                href={siteConfig.hero.primaryCta.href}
                variant="primary"
                fullWidth
                onClick={onClose}
              >
                {siteConfig.hero.primaryCta.text}
              </Button>

              <div className="space-y-2 text-xs text-zinc-400 pt-2">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" />
                  <span>{siteConfig.contact.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary" />
                  <span>{siteConfig.contact.email}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>{siteConfig.contact.address}, {siteConfig.contact.city}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <a
                  href={siteConfig.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 text-zinc-400 hover:text-primary rounded-lg bg-surface-card border border-surface-border"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={siteConfig.socials.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 text-zinc-400 hover:text-primary rounded-lg bg-surface-card border border-surface-border"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href={siteConfig.socials.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 text-zinc-400 hover:text-primary rounded-lg bg-surface-card border border-surface-border"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
