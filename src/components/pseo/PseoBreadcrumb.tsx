import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href: string;
};

type Props = {
  items: BreadcrumbItem[];
};

export default function PseoBreadcrumb({ items }: Props) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mx-auto max-w-6xl px-4 pt-20 md:pt-24"
    >
      <ol className="flex flex-wrap items-center gap-1 text-xs text-white/60">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.href} className="flex items-center gap-1">
              {index > 0 && (
                <span aria-hidden="true" className="text-white/30">
                  /
                </span>
              )}
              {isLast ? (
                <span className="text-white/90 font-medium">{item.label}</span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-white/90 transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
