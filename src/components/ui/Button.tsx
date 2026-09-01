import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-4 whitespace-nowrap font-sans text-[9px] font-light uppercase tracking-[0.3em] overflow-hidden transition-all duration-1000 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-obsidian text-ivory hover:bg-charcoal border border-obsidian hover:border-gold-subtle",
  outline:
    "border border-gold-subtle/30 text-champagne hover:border-gold hover:text-ivory bg-transparent backdrop-blur-sm",
  ghost: "text-charcoal hover:text-gold",
};

const sizes: Record<Size, string> = {
  sm: "h-12 px-7 text-[8px]",
  md: "h-14 px-9 text-[9px]",
  lg: "h-16 px-11 text-[10px]",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      <span className="relative z-10 transition-transform duration-1000 group-hover:translate-x-1">
        {children}
      </span>
      <span className="relative z-10 h-px w-5 bg-current opacity-50 transition-all duration-1000 group-hover:w-10 group-hover:opacity-100" />
    </button>
  );
}

interface ButtonLinkProps {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      <span className="relative z-10 transition-transform duration-1000 group-hover:translate-x-1">
        {children}
      </span>
      <span className="relative z-10 h-px w-5 bg-current opacity-50 transition-all duration-1000 group-hover:w-10 group-hover:opacity-100" />
    </Link>
  );
}
