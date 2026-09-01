import Link from "next/link";
import {
  InstagramIcon,
  FacebookIcon,
  LinkedinIcon,
  PinterestIcon,
} from "@/components/ui/SocialIcons";
import { Mail, MapPin, Phone } from "lucide-react";

const FOOTER_LINKS = [
  {
    heading: "Studio",
    links: [
      { href: "/about", label: "About" },
      { href: "/services", label: "Services" },
      { href: "/projects", label: "Projects" },
      { href: "/blog", label: "Journal" },
    ],
  },
  {
    heading: "Connect",
    links: [
      { href: "/contact", label: "Contact" },
      { href: "/testimonials", label: "Testimonials" },
      { href: "/careers", label: "Careers" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-gradient-to-b from-ivory to-cream-dark">
      <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <p className="font-display text-3xl text-charcoal">
              A&amp;H <span className="text-gradient-gold">Interiors</span>
            </p>
            <p className="mt-5 max-w-sm text-base leading-relaxed text-taupe">
              A boutique interior design studio crafting warm, timeless
              spaces shaped around light, material, and calm.
            </p>
            
            {/* Contact Info */}
            <div className="mt-6 space-y-3 text-sm text-taupe">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-gold" />
                <span>Downtown Design District</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-gold" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gold" />
                <span>hello@ahinteriors.com</span>
              </div>
            </div>
            
            {/* Social Icons */}
            <div className="mt-8 flex gap-4 text-charcoal">
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-all duration-300 hover:border-gold hover:bg-gold/10 hover:text-gold"
              >
                <InstagramIcon />
              </a>
              <a
                href="#"
                aria-label="Pinterest"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-all duration-300 hover:border-gold hover:bg-gold/10 hover:text-gold"
              >
                <PinterestIcon />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-all duration-300 hover:border-gold hover:bg-gold/10 hover:text-gold"
              >
                <FacebookIcon />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-all duration-300 hover:border-gold hover:bg-gold/10 hover:text-gold"
              >
                <LinkedinIcon />
              </a>
            </div>
          </div>

          {FOOTER_LINKS.map((group) => (
            <div key={group.heading}>
              <p className="text-xs uppercase tracking-[0.2em] text-gold">
                {group.heading}
              </p>
              <ul className="mt-6 flex flex-col gap-4">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-base text-charcoal/80 transition-colors duration-300 hover:text-gold"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-10 text-sm text-taupe lg:flex-row">
          <p>© {new Date().getFullYear()} A&amp;H Interiors. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <div className="h-1 w-1 rounded-full bg-gold" />
            <p>Crafted with care and precision</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
