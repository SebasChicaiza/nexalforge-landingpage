import Reveal from "@/components/Reveal";
import type { HowItWorksStep } from "@/types/pseo";
import {
  PlugZap,
  BrainCircuit,
  CalendarCheck2,
  MessageCircle,
  UserCheck,
  FileCheck,
  Settings,
  Bell,
  CheckCircle,
  ShoppingCart,
  ClipboardCheck,
  Activity,
  AlertTriangle,
  Calendar,
  Clock,
  Users,
  Star,
  RefreshCw,
  UserX,
  Gift,
  Home,
  MapPin,
  Package,
  Truck,
  ClipboardList,
  ShoppingBag,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  PlugZap,
  BrainCircuit,
  CalendarCheck2,
  MessageCircle,
  UserCheck,
  FileCheck,
  Settings,
  Bell,
  CheckCircle,
  ShoppingCart,
  ClipboardCheck,
  Activity,
  AlertTriangle,
  Calendar,
  Clock,
  Users,
  Star,
  RefreshCw,
  UserX,
  Gift,
  Home,
  MapPin,
  Package,
  Truck,
  ClipboardList,
  ShoppingBag,
};

type Props = {
  steps: HowItWorksStep[];
  prepositionPhrase: string;
};

export default function PseoHowItWorksSection({
  steps,
  prepositionPhrase,
}: Props) {
  return (
    <section className="bg-[#070A10] py-24 text-white">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <h2
            className="text-3xl font-[800] tracking-tight md:text-4xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Cómo funciona Nexi {prepositionPhrase}
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = ICON_MAP[step.icon_name] ?? PlugZap;

            return (
              <Reveal key={step.title} delay={index * 100}>
                <article className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_16px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-red-300/45 hover:shadow-[0_24px_55px_rgba(139,30,45,0.22)]">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-slate-900/80 text-red-200">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/55">
                    Paso {index + 1}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/75">
                    {step.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
