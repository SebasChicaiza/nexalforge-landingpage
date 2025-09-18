// components/SelectWire.tsx
"use client";
import { forwardRef, SelectHTMLAttributes } from "react";
import clsx from "clsx";

type Option = string | { label: string; value: string };

type SelectWireProps = {
  label: string;
  name: string; // ✅
  options: Option[];
  containerClassName?: string;
} & SelectHTMLAttributes<HTMLSelectElement>; // ✅

const SelectWire = forwardRef<HTMLSelectElement, SelectWireProps>(
  (
    { label, name, id, options, className, containerClassName, ...props },
    ref
  ) => {
    const selectId = id ?? name;
    return (
      <div className={clsx("grid gap-1", containerClassName)}>
        <label htmlFor={selectId} className="text-sm text-neutral-600">
          {label}
        </label>
        <select
          id={selectId}
          name={name}
          ref={ref}
          className={clsx(
            "w-full rounded-xl border border-neutral-300 px-3 py-2",
            "focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]",
            className
          )}
          {...props}
        >
          <option value="" disabled selected hidden>
            Selecciona…
          </option>
          {options.map((opt, i) => {
            const o =
              typeof opt === "string" ? { label: opt, value: opt } : opt;
            return (
              <option key={i} value={o.value}>
                {o.label}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
);
SelectWire.displayName = "SelectWire";
export default SelectWire;
