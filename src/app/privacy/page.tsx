import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how Nexal Forge processes data. This page directs you to our full privacy notice in Spanish.",
  alternates: { canonical: "/politicas-privacidad" },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-neutral-50 pb-16 pt-20">
      <div className="mx-auto max-w-3xl px-4">
        <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-medium text-rose-700">Privacy</p>
          <h1 className="mt-2 text-3xl font-bold text-neutral-900">
            Privacy Policy (EN)
          </h1>
          <p className="mt-3 text-neutral-600">
            Our full privacy notice is available in Spanish. It covers data
            captured via web forms, WhatsApp, analytics, and support channels.
          </p>
          <div className="mt-6 flex flex-col gap-3 text-sm text-neutral-700">
            <Link
              href="/politicas-privacidad"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-rose-700 px-4 py-2 text-white transition hover:bg-rose-800"
            >
              Ver Política de Privacidad
            </Link>
            <p>
              If you have questions in English, email us at{" "}
              <a
                href="mailto:contact@nexalforge.com"
                className="text-rose-700 hover:underline"
              >
                contact@nexalforge.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
