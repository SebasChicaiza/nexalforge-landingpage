import Link from "next/link";
import { ArrowLeft, MessageCircle, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-white px-4 py-20 text-[#0D0D11]">
      <div className="w-full max-w-3xl rounded-3xl border border-neutral-200 bg-white px-6 py-10 shadow-lg md:px-10">
        <div className="inline-flex items-center gap-2 rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-neutral-600">
          <span className="h-2 w-2 rounded-full bg-[#8B1E2D]" />
          Error 404
        </div>
        <h1 className="mt-4 text-3xl font-bold md:text-4xl">
          No encontramos esa página.
        </h1>
        <p className="mt-3 max-w-2xl text-neutral-600">
          Te ayudamos a volver a contenido útil. Revisa la home o conoce Nexi,
          nuestro asistente virtual con IA.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-[#8B1E2D] px-5 py-3 text-white shadow-md transition hover:bg-[#B84550]"
          >
            <Home className="h-4 w-4" />
            Ir a la home
          </Link>
          <Link
            href="/asistente-virtual-nexi"
            className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-5 py-3 text-sm font-semibold text-[#0D0D11] transition hover:border-[#8B1E2D] hover:text-[#8B1E2D]"
          >
            <MessageCircle className="h-4 w-4" />
            Conocer a Nexi
          </Link>
          <Link
            href="#contacto"
            className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-5 py-3 text-sm font-semibold text-[#0D0D11] transition hover:border-[#8B1E2D] hover:text-[#8B1E2D]"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al contacto
          </Link>
        </div>
      </div>
    </main>
  );
}
