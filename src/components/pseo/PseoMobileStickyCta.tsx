"use client";

type Props = {
  demoCtaUrl: string;
  whatsappCtaUrl: string;
  ctaPrimaryText: string;
  ctaWhatsappText: string;
};

export default function PseoMobileStickyCta({
  demoCtaUrl,
  whatsappCtaUrl,
  ctaPrimaryText,
  ctaWhatsappText,
}: Props) {
  return (
    <div className="fixed inset-x-4 bottom-4 z-40 md:hidden">
      <div className="rounded-2xl border border-white/10 bg-black/80 p-2 shadow-[0_14px_40px_rgba(0,0,0,0.45)] backdrop-blur-md">
        <div className="mb-2 flex items-center gap-2 px-2 text-xs font-medium text-emerald-200">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300/80" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-300" />
          </span>
          Nexi está en línea
        </div>

        <div className="grid grid-cols-2 gap-2">
          <a
            href={whatsappCtaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-[#25D366] px-3 py-3 text-sm font-semibold text-[#05210F]"
          >
            {ctaWhatsappText}
          </a>
          <a
            href={demoCtaUrl}
            className="inline-flex items-center justify-center rounded-xl bg-[#8B1E2D] px-3 py-3 text-sm font-semibold text-white"
          >
            {ctaPrimaryText}
          </a>
        </div>
      </div>
    </div>
  );
}
