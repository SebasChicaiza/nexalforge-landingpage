import Link from "next/link";
import Image from "next/image";
import { COMPANY_DOMICILE, CONTACT_EMAIL, TRADE_NAME } from "@/lib/legal";

export default function FooterEn() {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="border-t border-white/10 bg-[#0D0D0D] py-10 text-sm text-white/60"
    >
      <div className="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-4">
        {/* Brand */}
        <div>
          <div className="mb-3 flex items-center gap-2">
            <Link href="/en/nexi/spas-salons" className="inline-flex items-center" aria-label="Home">
              <Image
                src="/logo-blanco-nf.png"
                alt="NexalForge"
                width={160}
                height={40}
                priority
                className="h-12 w-auto object-contain"
              />
            </Link>
          </div>
          <p>AI applied to move your KPIs in weeks, not months.</p>
        </div>

        {/* Nexi */}
        <nav aria-label="Nexi">
          <div className="mb-2 font-semibold text-white">Nexi</div>
          <ul className="space-y-1">
            <li>
              <Link className="hover:text-white hover:underline" href="/en/nexi/pricing">
                Pricing
              </Link>
            </li>
            <li>
              <Link className="hover:text-white hover:underline" href="/en/nexi/spas-salons">
                Nexi for Spas &amp; Salons
              </Link>
            </li>
          </ul>
        </nav>

        {/* Legal */}
        <nav aria-label="Legal">
          <div className="mb-2 font-semibold text-white">Legal</div>
          <ul className="space-y-1">
            <li>
              <Link className="hover:text-white hover:underline" href="/en/terms">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link className="hover:text-white hover:underline" href="/en/privacy">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link className="hover:text-white hover:underline" href="/en/refunds">
                Refund Policy
              </Link>
            </li>
            <li>
              <Link className="hover:text-white hover:underline" href="/en/cookies">
                Cookie Policy
              </Link>
            </li>
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <div className="mb-2 font-semibold text-white">Contact</div>
          <p>
            <a className="hover:text-white hover:underline" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
          </p>
          <p className="mt-1">{COMPANY_DOMICILE}</p>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-7xl px-4 text-xs text-white/40">
        © {year} {TRADE_NAME}. All rights reserved.
      </div>
    </footer>
  );
}
