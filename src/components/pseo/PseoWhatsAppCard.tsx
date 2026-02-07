"use client";

import { motion } from "framer-motion";
import {
  CheckCheck,
  MessageCircleMore,
  Sparkles,
} from "lucide-react";

type ChatMessage = {
  role: "Cliente" | "Nexi";
  text: string;
};

type Props = {
  industryName: string;
  useCaseName: string;
  chatMessages: ChatMessage[];
  benefit: string;
};

export default function PseoWhatsAppCard({
  industryName,
  useCaseName,
  chatMessages,
  benefit,
}: Props) {
  return (
    <div className="[perspective:1000px]">
      <motion.div
        whileHover={{ y: -6, rotateX: 4, rotateY: -7 }}
        transition={{ type: "spring", stiffness: 180, damping: 18 }}
        className="relative rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-red-500/20 backdrop-blur-xl [transform-style:preserve-3d] md:[transform:rotateX(6deg)_rotateY(-12deg)]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[1.75rem] bg-[linear-gradient(125deg,rgba(255,255,255,0.2),transparent_30%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-1 rounded-[2rem] border border-white/10"
        />

        <div className="relative rounded-2xl border border-white/15 bg-[#0B141A]/92 p-4">
          <div className="mb-4 rounded-xl border border-white/10 bg-[#202C33] px-3 py-2">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366]/20 text-[#93f9b5]">
                <MessageCircleMore className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold leading-none text-white">
                  Nexi (IA)
                </p>
                <p className="mt-1 text-[11px] text-[#7CFC9B]">En línea</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-[#48545B] bg-[#E5DDD5] p-3 text-black">
            <p className="mb-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-[#5f5f5f]">
              <Sparkles className="h-3.5 w-3.5 text-[#8B1E2D]" />
              <span className="text-[#2a2a2a]">
                Nexi en {industryName}: {useCaseName}
              </span>
            </p>

            <div className="space-y-3">
              {chatMessages.map((message, index) => {
                const isAgent = message.role === "Nexi";

                return (
                  <div
                    key={`${message.role}-${index}`}
                    className={`flex ${isAgent ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`relative max-w-[92%] px-3 py-2 text-sm leading-relaxed shadow-[0_1px_0_rgba(0,0,0,0.15)] ${isAgent ? "rounded-2xl rounded-tr-none bg-[#dcf8c6] pb-5 text-black" : "rounded-2xl rounded-tl-none bg-white text-black"}`}
                    >
                      <p>{message.text}</p>
                      {isAgent ? (
                        <CheckCheck className="absolute bottom-1.5 right-2 h-3.5 w-3.5 text-sky-500" />
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">
              <p className="text-[10px] uppercase tracking-[0.1em] text-white/55">
                Respuesta
              </p>
              <p className="mt-1 text-sm font-semibold text-white">
                &lt; 30 segundos
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">
              <p className="text-[10px] uppercase tracking-[0.1em] text-white/55">
                Resultado esperado
              </p>
              <p className="mt-1 text-sm font-semibold text-white">{benefit}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
