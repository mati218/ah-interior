"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "Studio" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isTransparent = !scrolled && !open;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, delay: 4.5, ease: [0.65, 0, 0.35, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-700",
        isTransparent
          ? "bg-transparent"
          : "border-b border-border/30 bg-ivory/98 backdrop-blur-xl"
      )}
    >
      <div className="mx-auto flex h-20 max-w-[1800px] items-center justify-between px-8 lg:h-24 lg:px-16">
        {/* Logo */}
        <Link
          href="/"
          className={cn(
            "font-display text-xl tracking-tight transition-all duration-700 lg:text-2xl",
            isTransparent ? "text-cream" : "text-charcoal"
          )}
          data-cursor-text="HOME"
        >
          A&H
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-12 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-cursor-text="VIEW"
              className={cn(
                "relative text-[11px] uppercase tracking-[0.2em] transition-all duration-500",
                isTransparent ? "text-beige" : "text-charcoal/80",
                pathname === link.href && (isTransparent ? "text-ivory" : "text-black"),
                "after:absolute after:bottom-[-2px] after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-500 hover:after:w-full",
                pathname === link.href && "after:w-full"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "flex flex-col items-end gap-1.5 lg:hidden",
            isTransparent ? "text-cream" : "text-charcoal"
          )}
          data-cursor-text="MENU"
        >
          <motion.span
            animate={{ rotate: open ? 45 : 0, y: open ? 7 : 0 }}
            className="h-px w-7 origin-right bg-current transition-all"
          />
          <motion.span
            animate={{ opacity: open ? 0 : 1 }}
            className="h-px w-5 bg-current"
          />
          <motion.span
            animate={{ rotate: open ? -45 : 0, y: open ? -7 : 0 }}
            className="h-px w-7 origin-right bg-current transition-all"
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
            className="overflow-hidden border-t border-border/30 bg-ivory lg:hidden"
          >
            <div className="flex flex-col gap-8 px-8 py-12">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "font-display text-3xl font-light tracking-tight transition-colors duration-300",
                      pathname === link.href ? "text-gold" : "text-charcoal/70 hover:text-black"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
