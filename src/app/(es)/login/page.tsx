"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, type TargetAndTransition } from "framer-motion";
import Image from "next/image";
import {
  Cpu,
  Brain,
  CircuitBoard,
  Network,
  CloudCog,
  Bot,
  Code2,
  Database,
  Server,
  ShieldCheck,
  SatelliteDish,
  Workflow,
} from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

/**
 * Asunciones de compilación (de tu tsconfig.json):
 * - esModuleInterop: true, allowSyntheticDefaultImports: true → imports por defecto.
 * - strictNullChecks: true → sin null/undefined inseguros.
 *
 * Cambios solicitados:
 * - Layout centrado sin opciones sociales (Google/GitHub removidos).
 * - Fondo del formulario blanco.
 * - Botón/acento principal #8B1E2D.
 * - Íconos tech/IA animados alrededor del formulario (fuera de la card).
 */

type LoginValues = {
  email: string;
  password: string;
  remember?: boolean;
};

// Validadores simples
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const hasLetter = /[A-Za-z]/;
const hasDigit = /\d/;
const hasUpperLower = /(?=.*[a-z])(?=.*[A-Z])/;

export default function NexalForgeLogin() {
  const [isVisible, setIsVisible] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<LoginValues>({
    defaultValues: { email: "", password: "", remember: false },
    mode: "onChange",
  });

  const password = watch("password");

  const onSubmit = async (values: LoginValues): Promise<void> => {
    console.log("Valores del formulario:", values);
    setServerError(null);

    const response = await axios.post("/api/auth/login", values);
    console.log("Respuesta del servidor:", response);

    router.push("/admin/blog");

    await new Promise((r) => setTimeout(r, 600));
    if (values.email.includes("fail")) {
      setServerError("Credenciales inválidas. Intenta de nuevo.");
    }
  };

  const strength = getPasswordStrength(password);

  return (
    <div className="relative min-h-screen bg-neutral-50 text-neutral-900 flex items-center justify-center p-6 pt-25 overflow-hidden"> {/*Change pt-25 if use another navbar*/}
      {/* Fondo con patrón radial sutil */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-20 [background:radial-gradient(1000px_600px_at_10%_-20%,#8B1E2D0f,transparent),radial-gradient(800px_500px_at_90%_120%,#8B1E2D14,transparent)]"
      />

      {/* Íconos animados tech/IA (fuera del formulario) */}
      <IconField />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-md"
      >
        {/* Card */}
        <div className="relative bg-white border border-neutral-200 rounded-2xl shadow-xl shadow-neutral-900/5 p-6 md:p-8">
          {/* Borde superior acentuado */}
          <div className="absolute -top-px left-2 right-2 h-1 bg-[#8B1E2D] rounded-t-2xl" />

          <header className="mb-6 text-center">
            <div className="mx-auto mb-4 inline-flex items-center justify-center size-25">
              <Image
                src="/logo-nexal.png"
                alt="NexalForge"
                width={160}
                height={40}
                priority
                className="h-14 w-auto object-contain"
              />
            </div>
            <h1 className="text-xl font-semibold tracking-tight">
              Inicia sesión
            </h1>
            <p className="text-sm text-neutral-600 mt-1">
              Bienvenido a Nexal Forge
            </p>
          </header>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-neutral-800"
              >
                Correo
              </label>
              <input
                id="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="tú@empresa.com"
                className={cn(
                  "w-full rounded-xl bg-white border border-neutral-300 px-4 py-2.5 outline-none placeholder-neutral-400",
                  "focus:ring-2 focus:ring-[#8B1E2D]/30 focus:border-[#8B1E2D]",
                  errors.email && "border-red-400 focus:ring-red-300"
                )}
                {...register("email", {
                  required: "El correo es obligatorio",
                  pattern: { value: emailPattern, message: "Correo inválido" },
                })}
              />
              {errors.email && (
                <p role="alert" className="text-xs text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2 mt-4">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-neutral-800"
                >
                  Contraseña
                </label>
                <button
                  type="button"
                  onClick={() => setIsVisible((v) => !v)}
                  className="text-xs text-[#8B1E2D] hover:opacity-90"
                  aria-pressed={isVisible}
                >
                  {isVisible ? "Ocultar" : "Mostrar"}
                </button>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={isVisible ? "text" : "password"}
                  autoComplete="current-password"
                  className={cn(
                    "w-full rounded-xl bg-white border border-neutral-300 px-4 py-2.5 pr-10 outline-none placeholder-neutral-400",
                    "focus:ring-2 focus:ring-[#8B1E2D]/30 focus:border-[#8B1E2D]",
                    errors.password && "border-red-400 focus:ring-red-300"
                  )}
                  placeholder="••••••••"
                  {...register("password", {
                    required: "La contraseña es obligatoria",
                    minLength: { value: 8, message: "Mínimo 8 caracteres" },
                    validate: {
                      letters: (v) =>
                        hasLetter.test(v) || "Debe incluir letras",
                      digits: (v) => hasDigit.test(v) || "Debe incluir números",
                      mixCase: (v) =>
                        hasUpperLower.test(v) || "Usa mayúsculas y minúsculas",
                    },
                  })}
                />
              </div>
              {errors.password ? (
                <p role="alert" className="text-xs text-red-600">
                  {errors.password.message}
                </p>
              ) : (
                <PasswordStrengthBar strength={strength} />
              )}
            </div>

            {/* Remember + forgot */}
            <div className="mt-4 flex items-center justify-between gap-2">
              <label className="inline-flex items-center gap-2 text-sm text-neutral-700">
                <input
                  type="checkbox"
                  className="size-4 rounded border-neutral-300 bg-white accent-[#8B1E2D]"
                  {...register("remember")}
                />
                Recordarme
              </label>
              <a
                href="/forgot-password"
                className="text-sm text-[#8B1E2D] hover:opacity-90"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            {/* Error del servidor */}
            {serverError && (
              <div className="mt-4 text-sm text-red-700 border border-red-300 bg-red-50 rounded-xl p-3">
                {serverError}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 w-full rounded-xl bg-[#8B1E2D] text-white font-semibold py-2.5 hover:brightness-110 focus:ring-2 focus:ring-[#8B1E2D]/30 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Ingresando…" : "Ingresar"}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-neutral-500">
            Al continuar aceptas los{" "}
            <a className="underline hover:text-neutral-700" href="#">
              Términos
            </a>{" "}
            y la{" "}
            <a className="underline hover:text-neutral-700" href="#">
              Política de Privacidad
            </a>
            .
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-neutral-500">
          © {new Date().getFullYear()} Nexal Forge
        </p>
      </motion.div>
    </div>
  );
}

function IconField() {
  const floatInitial: TargetAndTransition = {
    y: 0,
    x: 0,
    opacity: 1,
    rotate: 0,
    scale: 1,
  };
  const float = (i: number): TargetAndTransition => ({
    y: [0, -20, 0],
    x: [0, 10, 0],
    rotate: [0, 200, 0],
    scale: [1, 1.1, 1],
    opacity: [0.55, 1, 0.55],
    transition: {
      duration: 6 + (i % 5),
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "mirror",
      delay: (i % 4) * 0.3,
    },
  });

  const size = "w-7 h-7";
  const cls = "text-[#8B1E2D]/40";

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 select-none"
    >
      {/* Primer conjunto de iconos */}
      <div className="pointer-events-none absolute inset-0 z-0 select-none">
        {/* Anillo superior-izquierdo */}
        <motion.div
          className="absolute top-[10%] left-[30%]"
          initial={floatInitial}
          animate={float(0)}
        >
          <Cpu className={`${size} ${cls}`} strokeWidth={1.6} />
        </motion.div>
        <motion.div
          className="absolute top-[16%] left-[18%]"
          initial={floatInitial}
          animate={float(1)}
        >
          <Code2 className={`${size} ${cls}`} strokeWidth={1.6} />
        </motion.div>
        <motion.div
          className="absolute top-[22%] left-[6%]"
          initial={floatInitial}
          animate={float(2)}
        >
          <Workflow className={`${size} ${cls}`} strokeWidth={1.6} />
        </motion.div>

        {/* Lado superior-derecho */}
        <motion.div
          className="absolute top-[18%] right-[14%]"
          initial={floatInitial}
          animate={float(3)}
        >
          <Brain className={`${size} ${cls}`} strokeWidth={1.6} />
        </motion.div>
        <motion.div
          className="absolute top-[8%] right-[8%]"
          initial={floatInitial}
          animate={float(4)}
        >
          <SatelliteDish className={`${size} ${cls}`} strokeWidth={1.6} />
        </motion.div>

        {/* Anillo medio */}
        <motion.div
          className="absolute top-[36%] left-[86%]"
          initial={floatInitial}
          animate={float(5)}
        >
          <CloudCog className={`${size} ${cls}`} strokeWidth={1.6} />
        </motion.div>
        <motion.div
          className="absolute top-[44%] left-[16%]"
          initial={floatInitial}
          animate={float(6)}
        >
          <CircuitBoard className={`${size} ${cls}`} strokeWidth={1.6} />
        </motion.div>
        <motion.div
          className="absolute top-[40%] right-[22%]"
          initial={floatInitial}
          animate={float(7)}
        >
          <Server className={`${size} ${cls}`} strokeWidth={1.6} />
        </motion.div>

        {/* Anillo inferior-izquierdo */}
        <motion.div
          className="absolute bottom-[22%] left-[12%]"
          initial={floatInitial}
          animate={float(8)}
        >
          <Database className={`${size} ${cls}`} strokeWidth={1.6} />
        </motion.div>
        <motion.div
          className="absolute bottom-[16%] left-[22%]"
          initial={floatInitial}
          animate={float(9)}
        >
          <ShieldCheck className={`${size} ${cls}`} strokeWidth={1.6} />
        </motion.div>

        {/* Anillo inferior-derecho */}
        <motion.div
          className="absolute bottom-[24%] right-[10%]"
          initial={floatInitial}
          animate={float(10)}
        >
          <Network className={`${size} ${cls}`} strokeWidth={1.6} />
        </motion.div>
        <motion.div
          className="absolute bottom-[14%] right-[20%]"
          initial={floatInitial}
          animate={float(11)}
        >
          <Bot className={`${size} ${cls}`} strokeWidth={1.6} />
        </motion.div>
      </div>

      {/* Segundo conjunto de iconos */}
      <div className="pointer-events-none absolute inset-0 z-0 select-none">
        <motion.div
          className="absolute top-[30%] left-[8%]"
          initial={floatInitial}
          animate={float(12)}
        >
          <Cpu className={`${size} ${cls}`} strokeWidth={1.6} />
        </motion.div>
        <motion.div
          className="absolute top-[40%] left-[25%]"
          initial={floatInitial}
          animate={float(13)}
        >
          <Code2 className={`${size} ${cls}`} strokeWidth={1.6} />
        </motion.div>
        <motion.div
          className="absolute top-[50%] right-[15%]"
          initial={floatInitial}
          animate={float(14)}
        >
          <Workflow className={`${size} ${cls}`} strokeWidth={1.6} />
        </motion.div>
        <motion.div
          className="absolute bottom-[30%] left-[30%]"
          initial={floatInitial}
          animate={float(15)}
        >
          <Brain className={`${size} ${cls}`} strokeWidth={1.6} />
        </motion.div>
        <motion.div
          className="absolute top-[28%] right-[32%]"
          initial={floatInitial}
          animate={float(16)}
        >
          <SatelliteDish className={`${size} ${cls}`} strokeWidth={1.6} />
        </motion.div>
        <motion.div
          className="absolute bottom-[5%] left-[50%]"
          initial={floatInitial}
          animate={float(17)}
        >
          <CloudCog className={`${size} ${cls}`} strokeWidth={1.6} />
        </motion.div>
        <motion.div
          className="absolute top-[15%] right-[55%]"
          initial={floatInitial}
          animate={float(18)}
        >
          <CircuitBoard className={`${size} ${cls}`} strokeWidth={1.6} />
        </motion.div>
        <motion.div
          className="absolute bottom-[40%] right-[40%]"
          initial={floatInitial}
          animate={float(19)}
        >
          <Server className={`${size} ${cls}`} strokeWidth={1.6} />
        </motion.div>
        <motion.div
          className="absolute bottom-[25%] left-[80%]"
          initial={floatInitial}
          animate={float(20)}
        >
          <Database className={`${size} ${cls}`} strokeWidth={1.6} />
        </motion.div>
        <motion.div
          className="absolute top-[60%] left-[70%]"
          initial={floatInitial}
          animate={float(21)}
        >
          <ShieldCheck className={`${size} ${cls}`} strokeWidth={1.6} />
        </motion.div>
        <motion.div
          className="absolute bottom-[8%] right-[75%]"
          initial={floatInitial}
          animate={float(22)}
        >
          <Network className={`${size} ${cls}`} strokeWidth={1.6} />
        </motion.div>
        <motion.div
          className="absolute top-[75%] left-[45%]"
          initial={floatInitial}
          animate={float(23)}
        >
          <Bot className={`${size} ${cls}`} strokeWidth={1.6} />
        </motion.div>
      </div>
    </div>
  );
}

function PasswordStrengthBar({ strength }: { strength: Strength }) {
  const labels: Record<Strength, string> = {
    empty: "",
    weak: "Débil",
    medium: "Media",
    strong: "Fuerte",
  };
  const pct =
    strength === "empty"
      ? 0
      : strength === "weak"
        ? 33
        : strength === "medium"
          ? 66
          : 100;
  const color =
    strength === "strong"
      ? "bg-[#8B1E2D]"
      : strength === "medium"
        ? "bg-amber-500"
        : strength === "weak"
          ? "bg-red-500"
          : "bg-neutral-300";

  return (
    <div className="mt-1.5" aria-live="polite">
      <div className="h-1.5 w-full rounded-full bg-neutral-200 overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      {strength !== "empty" && (
        <p className="mt-1 text-xs text-neutral-500">
          Seguridad: {labels[strength]}
        </p>
      )}
    </div>
  );
}

/** Utilidades **/

type Strength = "empty" | "weak" | "medium" | "strong";

function getPasswordStrength(pw?: string): Strength {
  if (!pw) return "empty";
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score >= 3 && pw.length >= 10) return "strong";
  if (score >= 2) return "medium";
  return "weak";
}

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
