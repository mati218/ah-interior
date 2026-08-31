import Link from "next/link";
import {
  InstagramIcon,
  FacebookIcon,
  LinkedinIcon,
  PinterestIcon,
} from "@/components/ui/SocialIcons";

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
    <footer className="border-t border-border bg-ivory">
      <div className="mx-auto max-w-[1440px] px-6 py-20 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl text-charcoal">
              A&amp;H <span className="text-gold">Interiors</span>
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-taupe">
              A boutique interior design studio crafting warm, timeless
              spaces shaped around light, material, and calm.
            </p>
            <div className="mt-6 flex gap-4 text-charcoal">
              <a href="#" aria-label="Instagram" className="hover:text-gold">
                <InstagramIcon />
              </a>
              <a href="#" aria-label="Pinterest" className="hover:text-gold">
                <PinterestIcon />
              </a>
              <a href="#" aria-label="Facebook" className="hover:text-gold">
                <FacebookIcon />
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-gold">
                <LinkedinIcon />
              </a>
            </div>
          </div>

          {FOOTER_LINKS.map((group) => (
            <div key={group.heading}>
              <p className="text-xs uppercase tracking-wider text-taupe">
                {group.heading}
              </p>
              <ul className="mt-4 flex flex-col gap-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-charcoal/80 transition-colors hover:text-gold"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs text-taupe lg:flex-row">
          <p>© {new Date().getFullYear()} A&amp;H Interiors. All rights reserved.</p>
          <p>Crafted with care.</p>
        </div>
      </div>
    </footer>
  );
}
