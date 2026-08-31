import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Tone = "gold" | "sage" | "neutral" | "error" | "success";

const tones: Record<Tone, string> = {
  gold: "bg-gold/10 text-gold-dark",
  sage: "bg-sage/15 text-charcoal",
  neutral: "bg-cream-dark text-taupe",
  error: "bg-error/10 text-error",
  success: "bg-success/10 text-success",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[11px] uppercase tracking-wider",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
