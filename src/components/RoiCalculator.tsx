"use client";
import { useMemo, useState, useEffect } from "react";

export default function RoiCalculator({ defaultSetup = 1900 }: { defaultSetup?: number }) {
  const [tareasMes, setTareasMes] = useState<number>(200);
  const [minPorTarea, setMinPorTarea] = useState<number>(8);
  const [costoHora, setCostoHora] = useState<number>(12);
  const [equipos, setEquipos] = useState<number>(1);
  const [reduccion, setReduccion] = useState<number>(45); // % ahorro de tiempo típico
  const [setupCost, setSetupCost] = useState<number>(defaultSetup);

  const {
    horasMes,
    costoBaseMes,
    ahorroMes,
    ahorroAnual,
    breakevenSemanas,
    roiPct,
  } = useMemo(() => {
    const hMes = (tareasMes * minPorTarea) / 60;                 // horas/mes actuales
    const base = hMes * costoHora;                               // costo mensual actual
    // Factor leve por equipos (3% extra por equipo adicional, cap en 15%)
    const teamFactor = Math.min(1 + Math.max(0, equipos - 1) * 0.03, 1.15);
    const ahorro = base * (reduccion / 100) * teamFactor;        // ahorro mensual estimado
    const ahorroYear = ahorro * 12;
    const breakeven = ahorro > 0 ? (setupCost / ahorro) * 4.345 : Infinity; // semanas
    const roi = setupCost > 0 ? ((ahorroYear - setupCost) / setupCost) * 100 : 0;
    return {
      horasMes: hMes,
      costoBaseMes: base,
      ahorroMes: ahorro,
      ahorroAnual: ahorroYear,
      breakevenSemanas: breakeven,
      roiPct: roi,
    };
  }, [tareasMes, minPorTarea, costoHora, equipos, reduccion, setupCost]);

  const fmt = (v: number) =>
    new Intl.NumberFormat("es-EC", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(
      isFinite(v) ? v : 0
    );

  const num = (v: number, d = 1) =>
    isFinite(v) ? new Intl.NumberFormat("es-EC", { maximumFractionDigits: d }).format(v) : "—";

  return (
    <div className="rounded-2xl border border-neutral-200 p-6 shadow-sm">
      {/* Inputs */}
      <div className="grid gap-3 md:grid-cols-2">
        <Field label="Tareas/mes">
          <InputNumber value={tareasMes} onChange={setTareasMes} min={0} step={10} />
        </Field>
        <Field label="Minutos por tarea">
          <InputNumber value={minPorTarea} onChange={setMinPorTarea} min={0} step={1} />
        </Field>
        <Field label="Costo/hora (USD)">
          <InputNumber value={costoHora} onChange={setCostoHora} min={0} step={1} />
        </Field>
        <Field label="Equipos involucrados">
          <InputNumber value={equipos} onChange={setEquipos} min={1} step={1} />
        </Field>
      </div>

      {/* Ajustes avanzados */}
      <details className="mt-3 rounded-xl border border-neutral-200 bg-white p-3 text-sm text-neutral-700">
        <summary className="cursor-pointer select-none font-medium">Ajustes avanzados</summary>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <Field label="Reducción esperada (%)">
            <InputNumber value={reduccion} onChange={setReduccion} min={0} max={100} step={5} />
          </Field>
          <Field label="Costo de implementación (USD)">
            <InputNumber value={setupCost} onChange={setSetupCost} min={0} step={50} />
          </Field>
        </div>
        <p className="mt-2 text-xs text-neutral-500">
          Tip: usa 35–55% como rango típico de reducción el primer mes. Ajusta según tu caso.
        </p>
      </details>

      {/* Resultados */}
      <div className="mt-4 rounded-xl bg-[#F5F5F5] p-4">
        <div className="grid gap-3 md:grid-cols-2">
          <Stat label="Horas/mes actuales" value={`${num(horasMes, 1)} h`} />
          <Stat label="Costo mensual actual" value={fmt(costoBaseMes)} />
          <Stat label="Ahorro mensual estimado" value={fmt(ahorroMes)} highlight />
          <Stat label="Ahorro anual (estimado)" value={fmt(ahorroAnual)} />
          <Stat
            label="Punto de equilibrio"
            value={isFinite(breakevenSemanas) ? `${num(breakevenSemanas, 1)} semanas` : "—"}
          />
          <Stat label="ROI 12 meses (estimado)" value={`${num(roiPct, 0)}%`} />
        </div>
      </div>
    </div>
  );
}

/* ------- pequeños helpers UI ------- */
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="text-neutral-600">{label}</span>
      {children}
    </label>
  );
}
function InputNumber({
  value,
  onChange,
  min,
  max,
  step,             // por compatibilidad; no lo usa este input text
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
}) {
  // Estado de texto para permitir "", "0.", "05" mientras se escribe
  const [text, setText] = useState<string>(() => (value ?? 0).toString());

  // Sincroniza cuando el valor externo cambia
  useEffect(() => {
    setText((value ?? 0).toString());
  }, [value]);

  const re = /^-?\d*(?:[.,]\d*)?$/; // permite enteros/decimales con . o ,
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (!re.test(raw)) return; // bloquea caracteres no numéricos
    setText(raw);
  };

  const commit = () => {
    const n = parseFloat(text.replace(",", "."));
    let normalized = Number.isFinite(n) ? n : 0;
    if (typeof min === "number") normalized = Math.max(min, normalized);
    if (typeof max === "number") normalized = Math.min(max, normalized);
    onChange(normalized);
    setText(String(normalized)); // escribe el número limpio (sin ceros a la izquierda)
  };

  return (
    <input
      type="text"
      inputMode="decimal"     // teclado numérico en móvil
      pattern="[0-9.,-]*"     // hint para navegadores
      className="rounded-xl border border-neutral-300 px-3 py-2 outline-none ring-[#8B1E2D]/30 focus:ring-4"
      value={text}
      onChange={handleChange}
      onBlur={commit}
      onKeyDown={(e) => {
        if (e.key === "Enter") (e.currentTarget as HTMLInputElement).blur();
      }}
      onFocus={(e) => e.currentTarget.select()} // selecciona el contenido; escribes y reemplaza
    />
  );
}




function Stat({ label, value, highlight }: { label: string; value: React.ReactNode; highlight?: boolean }) {
  return (
    <div className={`rounded-lg p-3 ${highlight ? "bg-white border border-[#8B1E2D]/30" : ""}`}>
      <div className="text-xs uppercase tracking-wide text-neutral-500">{label}</div>
      <div className={`text-base font-semibold ${highlight ? "text-[#8B1E2D]" : "text-[#2A2A2A]"}`}>{value}</div>
    </div>
  );
}
