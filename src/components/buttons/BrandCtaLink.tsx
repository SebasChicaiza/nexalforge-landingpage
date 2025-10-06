"use client";

import Link, { type LinkProps } from "next/link";
import { type ReactNode } from "react";

type BrandCtaLinkProps = LinkProps & {
  children: ReactNode;
  className?: string;
  /** Use "dark" for dark backgrounds so the focus ring offsets correctly */
  ringOffset?: "white" | "dark";
};

export default function BrandCtaLink({
  children,
  className = "",
  ringOffset = "dark",
  ...props
}: BrandCtaLinkProps) {
  const base =
    [
      // layout
      "relative inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5",
      "font-medium text-white select-none",
      // glossy red gradient
      "bg-gradient-to-br from-nf-primary-400 via-nf-primary-500 to-nf-primary-600",
      // glassy border + inner line
      "border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_8px_30px_rgba(139,30,45,0.35)]",
      // focus ring (dark background by default)
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nf-primary-400/40",
      ringOffset === "dark"
        ? "focus-visible:ring-offset-2 focus-visible:ring-offset-nf-background"
        : "focus-visible:ring-offset-2 focus-visible:ring-offset-white",
      // micro-interactions
      "transition-all duration-200 hover:brightness-105 hover:saturate-110",
      "hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.24),0_10px_35px_rgba(139,30,45,0.45)]",
      "active:scale-[0.99]",
      // enable pseudo overlays
      "overflow-hidden",
      // glossy film across the top (subtle)
      "before:content-[''] before:absolute before:inset-0 before:rounded-[inherit]",
      "before:bg-[linear-gradient(to_bottom,rgba(255,255,255,0.22),rgba(255,255,255,0))]",
      "before:opacity-60 before:pointer-events-none",
      // bright corner highlight (top-right “spark”)
      "after:content-[''] after:absolute after:top-0 after:right-0 after:h-16 after:w-16",
      "after:rounded-full after:bg-white/35 after:blur-2xl",
      "after:-translate-x-1/3 after:-translate-y-1/3 after:pointer-events-none",
    ].join(" ");

  return (
    <Link {...props} className={`${base} ${className}`}>
      {children}
    </Link>
  );
}
