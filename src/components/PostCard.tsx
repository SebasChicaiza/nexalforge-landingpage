"use client";

import Link from "next/link";
import Image from "next/image";
import { HTMLAttributes, useEffect, useRef } from "react";

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  cover?: string;
  category: string;
  tags: string[];
  readingMins: number;
};

export type PostCardProps = {
  post: Post;
  hrefBase?: string; // default = "/blog"
  onTagClick?: (tag: string) => void;
  analyticsId?: string;
  onImpression?: (id: string) => void;
  className?: string;
  variant?: "default" | "compact";
} & HTMLAttributes<HTMLElement>;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-EC", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function PostCard({
  post,
  hrefBase = "/blog",
  onTagClick,
  analyticsId,
  onImpression,
  className = "",
  variant = "default",
  ...rest
}: PostCardProps) {
  const { slug, title, excerpt, date, cover, category, tags, readingMins } = post;
  const isCompact = variant === "compact";
  const ref = useRef<HTMLDivElement>(null);

  // Track impression with IntersectionObserver
  useEffect(() => {
    if (!analyticsId || !onImpression) return;
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onImpression(analyticsId);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [analyticsId, onImpression]);

  return (
    <article
      {...rest}
      ref={ref}
      className={[
        "group overflow-hidden rounded-2xl border border-neutral-200 bg-white",
  "shadow-sm transition-shadow duration-300",
  // Softer Nexal red glow + gentle border tint on hover
  "hover:shadow-[0_8px_24px_rgba(139,30,45,0.16)] hover:border-[#8B1E2D]/30",
        className,
      ].join(" ")}
    >
      <Link href={`${hrefBase}/${slug}`} className="block">
        {cover && (
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
            <Image
              src={cover}
              alt={title}
              fill
              sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>
        )}
        <div className={isCompact ? "p-3" : "p-4"}>
          <div className="mb-2 flex items-center gap-2 text-xs text-neutral-500">
            <span className="rounded-full bg-neutral-100 px-2 py-0.5">{category}</span>
            <span>•</span>
            <time dateTime={date}>{formatDate(date)}</time>
            <span>•</span>
            <span>{readingMins} min</span>
          </div>

          <h2
            className={[
              "text-[#2A2A2A] group-hover:underline",
              isCompact ? "line-clamp-2 text-base font-semibold" : "line-clamp-2 text-lg font-semibold",
            ].join(" ")}
          >
            {title}
          </h2>

          {!isCompact && (
            <p className="mt-1 line-clamp-2 text-sm text-neutral-600">{excerpt}</p>
          )}

          {tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {tags.slice(0, isCompact ? 2 : 3).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    onTagClick?.(t);
                  }}
                  className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs text-neutral-700 hover:bg-neutral-200"
                >
                  #{t}
                </button>
              ))}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}

export function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm p-4 animate-pulse">
      <div className="mb-3 h-40 w-full rounded-lg bg-neutral-200" />
      <div className="mb-2 flex items-center gap-2">
        <div className="h-4 w-16 rounded bg-neutral-200" />
        <div className="h-4 w-4 rounded-full bg-neutral-200" />
        <div className="h-4 w-20 rounded bg-neutral-200" />
        <div className="h-4 w-4 rounded-full bg-neutral-200" />
        <div className="h-4 w-10 rounded bg-neutral-200" />
      </div>
      <div className="mb-2 h-5 w-3/4 rounded bg-neutral-200" />
      <div className="h-4 w-2/3 rounded bg-neutral-200" />
      <div className="mt-3 flex gap-2">
        <div className="h-6 w-16 rounded-full bg-neutral-200" />
        <div className="h-6 w-14 rounded-full bg-neutral-200" />
      </div>
    </div>
  );
}

