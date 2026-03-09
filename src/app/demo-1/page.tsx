"use client";

import { type ReactNode, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import {
  Bot,
  Brain,
  CircuitBoard,
  CloudCog,
  Code2,
  Cpu,
  Database,
  type LucideIcon,
  MessageCircle,
  Network,
  SatelliteDish,
  Server,
  ShieldCheck,
  Workflow,
} from "lucide-react";

type DemoFormValues = {
  representativeName: string;
  clinicName: string;
  countryId: string;
  cityId: string;
  cityName: string;
  whatsappNumber: string;
  instagramHandle: string;
  contactEmail: string;
  perceivedProblem: string;
  professionalsAndServices: string;
  additionalComments: string;
};

type SubmitState = "idle" | "success";

type CityOption = {
  id: number;
  nombre: string;
};

type CountryOption = {
  id: number;
  nombre: string;
  iso2: string;
  codigoTelefonico: string | null;
  ciudades: CityOption[];
};

type LocationsResponse = {
  ok: boolean;
  countries: CountryOption[];
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9\s-]{6,20}$/;

const floatingIcons: Array<{
  Icon: LucideIcon;
  position: string;
  delay: number;
  duration: number;
  visibility?: string;
}> = [
  { Icon: Cpu, position: "top-[12%] left-[8%]", delay: 0, duration: 7 },
  { Icon: Brain, position: "top-[18%] right-[10%]", delay: 0.2, duration: 8 },
  { Icon: Code2, position: "top-[26%] left-[2%]", delay: 0.4, duration: 9 },
  {
    Icon: CircuitBoard,
    position: "top-[38%] right-[4%]",
    delay: 0.1,
    duration: 7,
  },
  { Icon: CloudCog, position: "bottom-[25%] left-[9%]", delay: 0.3, duration: 8 },
  { Icon: Bot, position: "bottom-[18%] right-[12%]", delay: 0.5, duration: 9 },
  { Icon: Server, position: "top-[58%] left-[4%]", delay: 0.2, duration: 7 },
  { Icon: Database, position: "top-[68%] right-[8%]", delay: 0.4, duration: 8 },
  {
    Icon: SatelliteDish,
    position: "bottom-[8%] left-[30%]",
    delay: 0.2,
    duration: 9,
  },
  { Icon: Network, position: "top-[8%] right-[34%]", delay: 0.4, duration: 8 },
  { Icon: ShieldCheck, position: "bottom-[30%] right-[30%]", delay: 0, duration: 7 },
  { Icon: Workflow, position: "top-[42%] left-[18%]", delay: 0.3, duration: 8 },
  { Icon: Brain, position: "top-[10%] left-[42%]", delay: 0.15, duration: 8 },
  {
    Icon: CircuitBoard,
    position: "top-[24%] right-[26%]",
    delay: 0.35,
    duration: 9,
    visibility: "hidden md:block",
  },
  {
    Icon: CloudCog,
    position: "top-[54%] right-[2%]",
    delay: 0.28,
    duration: 7,
    visibility: "hidden lg:block",
  },
  {
    Icon: SatelliteDish,
    position: "bottom-[38%] left-[2%]",
    delay: 0.42,
    duration: 8,
    visibility: "hidden md:block",
  },
  {
    Icon: Database,
    position: "bottom-[8%] right-[42%]",
    delay: 0.18,
    duration: 9,
    visibility: "hidden md:block",
  },
  { Icon: Bot, position: "top-[32%] right-[45%]", delay: 0.32, duration: 8 },
  {
    Icon: Workflow,
    position: "top-[78%] right-[20%]",
    delay: 0.3,
    duration: 8,
    visibility: "hidden md:block",
  },
  {
    Icon: Server,
    position: "top-[74%] left-[18%]",
    delay: 0.2,
    duration: 7,
    visibility: "hidden md:block",
  },
  {
    Icon: Cpu,
    position: "bottom-[6%] left-[56%]",
    delay: 0.45,
    duration: 9,
    visibility: "hidden lg:block",
  },
  { Icon: ShieldCheck, position: "top-[6%] right-[52%]", delay: 0.22, duration: 8 },
];

export default function DemoOnePage() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [isFormInView, setIsFormInView] = useState(false);
  const [countries, setCountries] = useState<CountryOption[]>([]);
  const [catalogError, setCatalogError] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<DemoFormValues>({
    defaultValues: {
      representativeName: "",
      clinicName: "",
      countryId: "",
      cityId: "",
      cityName: "",
      whatsappNumber: "",
      instagramHandle: "",
      contactEmail: "",
      perceivedProblem: "",
      professionalsAndServices: "",
      additionalComments: "",
    },
    mode: "onChange",
  });

  const selectedCountryId = watch("countryId");
  const selectedCountry = countries.find(
    (country) => String(country.id) === selectedCountryId
  );
  const dialCode = selectedCountry?.codigoTelefonico ?? "";
  const isEcuador = selectedCountry?.iso2 === "EC";
  const selectedCities = selectedCountry?.ciudades ?? [];

  useEffect(() => {
    let cancelled = false;

    async function loadLocations() {
      setCatalogError(null);
      try {
        const response = await fetch("/api/demo-leads/locations", { cache: "no-store" });
        const json = (await response.json()) as Partial<LocationsResponse> & {
          error?: string;
        };
        if (!response.ok || !json.ok || !Array.isArray(json.countries)) {
          throw new Error(json.error ?? "No se pudieron cargar los paises");
        }
        if (!cancelled) setCountries(json.countries);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "No se pudieron cargar los paises";
        if (!cancelled) setCatalogError(message);
      }
    }

    loadLocations();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    setValue("cityId", "");
    setValue("cityName", "");
  }, [selectedCountryId, setValue]);

  useEffect(() => {
    const formSection = document.getElementById("demo-1-form-card");
    if (!formSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFormInView(entry.isIntersecting);
      },
      {
        // Hide CTA as soon as the form starts entering the viewport.
        threshold: 0.01,
        rootMargin: "-96px 0px -45% 0px",
      }
    );

    observer.observe(formSection);
    return () => observer.disconnect();
  }, []);

  const onSubmit = async (values: DemoFormValues): Promise<void> => {
    setServerError(null);
    setSubmitState("idle");

    try {
      const payload = {
        representativeName: values.representativeName,
        clinicName: values.clinicName,
        countryId: Number(values.countryId),
        cityId: isEcuador ? Number(values.cityId) : undefined,
        cityName: isEcuador ? undefined : values.cityName,
        whatsappNumber: values.whatsappNumber,
        instagramHandle: values.instagramHandle,
        contactEmail: values.contactEmail,
        perceivedProblem: values.perceivedProblem,
        professionalsAndServices: values.professionalsAndServices,
        additionalComments: values.additionalComments,
        source: "demo-1",
      };

      const response = await fetch("/api/demo-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!response.ok || !json.ok) {
        setServerError(json.error ?? "No se pudo guardar tu solicitud");
        return;
      }
    } catch {
      setServerError("No se pudo guardar tu solicitud");
      return;
    }

    setSubmitState("success");
    reset({
      representativeName: "",
      clinicName: "",
      countryId: "",
      cityId: "",
      cityName: "",
      whatsappNumber: "",
      instagramHandle: "",
      contactEmail: "",
      perceivedProblem: "",
      professionalsAndServices: "",
      additionalComments: "",
    });
  };

  const scrollToForm = () => {
    const formSection = document.getElementById("demo-1-form-card");
    if (!formSection) return;
    formSection.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-neutral-50 px-4 pb-16 pt-28 text-neutral-900 sm:px-6 lg:px-8">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-20 [background:radial-gradient(1000px_600px_at_10%_-20%,#8B1E2D0f,transparent),radial-gradient(800px_500px_at_90%_120%,#8B1E2D14,transparent)]"
      />
      <FloatingIcons />

      <motion.main
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start"
      >
        <motion.section
          className="rounded-2xl border border-neutral-200/70 bg-white/90 p-6 shadow-lg shadow-neutral-900/5 backdrop-blur md:p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <RevealBlock
            delay={0.02}
            className="mb-4 inline-flex rounded-full border border-[#2563EB]/20 bg-[#2563EB]/5 px-3 py-1 text-xs font-medium tracking-wide text-[#2563EB]"
          >
            DEMO NEXI PARA CLINICAS DENTALES
          </RevealBlock>
          <RevealBlock delay={0.08} className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
            Atrae mas pacientes y organiza mejor tu clinica dental.
          </RevealBlock>
          <RevealBlock
            delay={0.14}
            className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-700 md:text-base"
          >
            Nexi te ayuda a responder mas rapido, agendar citas y
            dar mejor seguimiento a cada paciente.
          </RevealBlock>

          <div className="mt-7 grid gap-3 text-sm text-neutral-800">
            <RevealBlock delay={0.2} className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3">
              Atencion automatica por WhatsApp, Instagram y Messenger.
            </RevealBlock>
            <RevealBlock delay={0.26} className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3">
              Agenda, confirma y da seguimiento sin perder pacientes.
            </RevealBlock>
            <RevealBlock delay={0.32} className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3">
              Si hace falta, pasa la conversacion a alguien de tu equipo.
            </RevealBlock>
            <RevealBlock delay={0.38} className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3">
              Funciona para clinicas pequenas, medianas o con varias sedes.
            </RevealBlock>
          </div>

          <RevealBlock delay={0.44} className="mt-4 text-xs text-neutral-500">
            Nota: algunas funciones del portal siguen en version demo.
          </RevealBlock>
        </motion.section>

        <motion.section
          id="demo-1-form-card"
          className="relative rounded-2xl border border-neutral-200 bg-white p-6 shadow-xl shadow-neutral-900/5 md:p-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.14 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute -top-px left-2 right-2 h-1 rounded-t-2xl bg-[#1545ac]" />

          <header className="mb-5 text-center">
            <RevealBlock delay={0.04} className="mx-auto mb-3 inline-flex h-16 w-40 items-center justify-center rounded-xl bg-white">
              <Image
                src="/nexi-new-logo/Nexi-Logo.png"
                alt="Nexi"
                width={240}
                height={96}
                className="h-11 w-auto object-contain"
                priority
              />
            </RevealBlock>
            <RevealBlock delay={0.1} className="text-xl font-semibold tracking-tight">
              Agenda tu demo de Nexi
            </RevealBlock>
            <RevealBlock delay={0.16} className="mt-1 text-sm text-neutral-600">
              Dejanos tus datos y te contactamos.
            </RevealBlock>
          </header>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
            {catalogError && (
              <RevealBlock className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
                No se pudo cargar el listado de paises y ciudades. Recarga la pagina.
              </RevealBlock>
            )}

            <RevealBlock delay={0.02} className="space-y-2">
              <label
                htmlFor="representativeName"
                className="text-sm font-medium text-neutral-800"
              >
                Nombre del dueno o representante
              </label>
              <input
                id="representativeName"
                type="text"
                className={fieldClass(errors.representativeName)}
                placeholder="Nombre completo"
                {...register("representativeName", {
                  required: "Este campo es obligatorio",
                  minLength: { value: 2, message: "Escribe un poco mas" },
                })}
              />
              {errors.representativeName && (
                <FieldError message={errors.representativeName.message} />
              )}
            </RevealBlock>

            <RevealBlock delay={0.04} className="space-y-2">
              <label htmlFor="clinicName" className="text-sm font-medium text-neutral-800">
                Nombre de la clinica
              </label>
              <input
                id="clinicName"
                type="text"
                className={fieldClass(errors.clinicName)}
                placeholder="Nombre comercial"
                {...register("clinicName", {
                  required: "Este campo es obligatorio",
                  minLength: { value: 2, message: "Escribe un poco mas" },
                })}
              />
              {errors.clinicName && <FieldError message={errors.clinicName.message} />}
            </RevealBlock>

            <RevealBlock delay={0.06} className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="countryId" className="text-sm font-medium text-neutral-800">
                  Pais
                </label>
                <select
                  id="countryId"
                  className={fieldClass(errors.countryId)}
                  disabled={countries.length === 0}
                  {...register("countryId", {
                    required: "Selecciona un pais",
                  })}
                >
                  <option value="">Selecciona tu pais</option>
                  {countries.map((country) => (
                    <option key={country.id} value={String(country.id)}>
                      {country.nombre}
                    </option>
                  ))}
                </select>
                {errors.countryId && <FieldError message={errors.countryId.message} />}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor={isEcuador ? "cityId" : "cityName"}
                  className="text-sm font-medium text-neutral-800"
                >
                  Ciudad
                </label>
                {isEcuador ? (
                  <select
                    id="cityId"
                    className={fieldClass(errors.cityId)}
                    {...register("cityId", {
                      required: "Selecciona una ciudad",
                    })}
                  >
                    <option value="">Selecciona una ciudad de Ecuador</option>
                    {selectedCities.map((city) => (
                      <option key={city.id} value={String(city.id)}>
                        {city.nombre}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    id="cityName"
                    type="text"
                    className={fieldClass(errors.cityName)}
                    placeholder="Ej. Quito"
                    {...register("cityName", {
                      required: "Este campo es obligatorio",
                      minLength: { value: 2, message: "Escribe un poco mas" },
                    })}
                  />
                )}
                {errors.cityId && <FieldError message={errors.cityId.message} />}
                {errors.cityName && <FieldError message={errors.cityName.message} />}
              </div>
            </RevealBlock>

            <RevealBlock delay={0.08} className="space-y-2">
              <label htmlFor="whatsappNumber" className="text-sm font-medium text-neutral-800">
                Numero de WhatsApp
              </label>
              <div className="flex w-full items-center overflow-hidden rounded-xl border border-neutral-300 bg-white focus-within:border-[#8B1E2D] focus-within:ring-2 focus-within:ring-[#8B1E2D]/30">
                <span className="border-r border-neutral-200 bg-neutral-50 px-3 py-2.5 text-sm font-medium text-neutral-700">
                  {dialCode || "Codigo"}
                </span>
                <input
                  id="whatsappNumber"
                  type="tel"
                  inputMode="tel"
                  className="w-full bg-white px-4 py-2.5 outline-none placeholder-neutral-400"
                  placeholder="999 999 999"
                  {...register("whatsappNumber", {
                    required: "Este campo es obligatorio",
                    pattern: {
                      value: phonePattern,
                      message: "Usa solo numeros, espacios o guiones",
                    },
                  })}
                />
              </div>
              {errors.whatsappNumber && (
                <FieldError message={errors.whatsappNumber.message} />
              )}
              {!selectedCountry && (
                <p className="text-xs text-neutral-500">
                  Elige un pais para mostrar el codigo.
                </p>
              )}
            </RevealBlock>

            <RevealBlock delay={0.1} className="space-y-2">
              <label
                htmlFor="instagramHandle"
                className="text-sm font-medium text-neutral-800"
              >
                Usuario de Instagram (opcional)
              </label>
              <input
                id="instagramHandle"
                type="text"
                className={fieldClass(errors.instagramHandle)}
                placeholder="@tuclinica"
                {...register("instagramHandle")}
              />
            </RevealBlock>

            <RevealBlock delay={0.12} className="space-y-2">
              <label htmlFor="contactEmail" className="text-sm font-medium text-neutral-800">
                Email de contacto
              </label>
              <input
                id="contactEmail"
                type="email"
                inputMode="email"
                autoComplete="email"
                className={fieldClass(errors.contactEmail)}
                placeholder="contacto@clinica.com"
                {...register("contactEmail", {
                  required: "El email es obligatorio",
                  pattern: { value: emailPattern, message: "Ingresa un email valido" },
                })}
              />
              {errors.contactEmail && (
                <FieldError message={errors.contactEmail.message} />
              )}
            </RevealBlock>

            <RevealBlock delay={0.14} className="space-y-2">
              <label
                htmlFor="perceivedProblem"
                className="text-sm font-medium text-neutral-800"
              >
                Que problema principal quieres resolver con Nexi
              </label>
              <textarea
                id="perceivedProblem"
                rows={4}
                className={fieldClass(errors.perceivedProblem)}
                placeholder="Ej. Perdemos pacientes por falta de seguimiento"
                {...register("perceivedProblem", {
                  required: "Este campo es obligatorio",
                  minLength: { value: 12, message: "Cuentanos un poco mas" },
                })}
              />
              {errors.perceivedProblem && (
                <FieldError message={errors.perceivedProblem.message} />
              )}
            </RevealBlock>

            <RevealBlock delay={0.16} className="space-y-2">
              <label
                htmlFor="professionalsAndServices"
                className="text-sm font-medium text-neutral-800"
              >
                Cuantos profesionales tienen y que servicios ofrecen
              </label>
              <textarea
                id="professionalsAndServices"
                rows={4}
                className={fieldClass(errors.professionalsAndServices)}
                placeholder="Ej. 6 profesionales; limpieza, ortodoncia, implantes, estetica..."
                {...register("professionalsAndServices", {
                  required: "Este campo es obligatorio",
                  minLength: { value: 8, message: "Agrega un poco mas de informacion" },
                })}
              />
              {errors.professionalsAndServices && (
                <FieldError message={errors.professionalsAndServices.message} />
              )}
            </RevealBlock>

            <RevealBlock delay={0.18} className="space-y-2">
              <label
                htmlFor="additionalComments"
                className="text-sm font-medium text-neutral-800"
              >
                Comentarios o necesidades adicionales
              </label>
              <textarea
                id="additionalComments"
                rows={3}
                className={fieldClass(errors.additionalComments)}
                placeholder="Opcional"
                {...register("additionalComments")}
              />
            </RevealBlock>

            {submitState === "success" && (
              <RevealBlock className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                Listo, recibimos tus datos. Te contactaremos pronto.
              </RevealBlock>
            )}
            {serverError && (
              <RevealBlock className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {serverError}
              </RevealBlock>
            )}

            <RevealBlock delay={0.2}>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-[#8B1E2D] py-2.5 font-semibold text-white transition hover:brightness-110 focus:ring-2 focus:ring-[#8B1E2D]/30 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Enviando..." : "Quiero mi demo"}
              </button>
            </RevealBlock>
          </form>
        </motion.section>
      </motion.main>
      <AnimatePresence>
        {!isFormInView && <MobileFormCta onClick={scrollToForm} />}
      </AnimatePresence>
    </div>
  );
}

function FloatingIcons() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 select-none">
      {floatingIcons.map(({ Icon, position, delay, duration, visibility }, index) => (
        <motion.div
          key={`${Icon.displayName ?? Icon.name}-${index}`}
          className={cn("absolute", visibility, position)}
          initial={{ y: 0, x: 0, opacity: 0.55, rotate: 0, scale: 1 }}
          animate={{
            y: [0, -22, 0],
            x: [0, 14, 0],
            opacity: [0.4, 0.95, 0.4],
            rotate: [0, 210, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
            delay,
          }}
        >
          <Icon className="h-7 w-7 text-[#8B1E2D]/40" strokeWidth={1.6} />
        </motion.div>
      ))}
    </div>
  );
}

function RevealBlock({
  children,
  className,
  delay = 0,
  amount = 0.2,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  amount?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function MobileFormCta({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <motion.div
      className="fixed left-4 z-[80] flex flex-col items-start gap-2 md:hidden"
      style={{ bottom: "max(1rem, env(safe-area-inset-bottom))" }}
      initial={{ opacity: 0, y: 14, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 14, scale: 0.94 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.button
        type="button"
        onClick={onClick}
        aria-label="Completar formulario de demo"
        className="relative rounded-2xl border border-neutral-200 bg-white px-3 py-2 text-left shadow-lg shadow-neutral-900/10"
        initial={{ opacity: 0, x: -12, y: 10, scale: 0.94 }}
        animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
        transition={{ duration: 0.4, delay: 2, ease: [0.22, 1, 0.36, 1] }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="absolute -left-1.5 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-[#2563EB] shadow-[0_0_0_3px_rgba(37,99,235,0.15)]" />
        <span className="block text-sm font-semibold leading-tight text-[#000000]">
          Completa el formulario
        </span>
      </motion.button>  

      <motion.button
        type="button"
        onClick={onClick}
        aria-label="Ir al formulario"
        className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#2563EB] text-white shadow-[0_10px_24px_rgba(37,99,235,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900"
        initial={{ opacity: 0, y: 14, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="pointer-events-none absolute inset-0 rounded-full bg-[#2563EB] opacity-35 animate-ping" />
        <MessageCircle className="relative h-7 w-7" strokeWidth={2.2} />
      </motion.button>
    </motion.div>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs text-red-600">{message}</p>;
}

function fieldClass(hasError: unknown): string {
  return cn(
    "w-full rounded-xl border border-neutral-300 bg-white px-4 py-2.5 outline-none placeholder-neutral-400",
    "focus:border-[#8B1E2D] focus:ring-2 focus:ring-[#8B1E2D]/30",
    Boolean(hasError) && "border-red-400 focus:ring-red-300"
  );
}

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
