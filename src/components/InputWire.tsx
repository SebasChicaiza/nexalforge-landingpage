// components/InputWire.tsx
"use client";
import { forwardRef, InputHTMLAttributes } from "react";
import clsx from "clsx";

type InputWireProps = {
  label: string;
  name: string; // ✅ necesario para <form>
  containerClassName?: string;
} & InputHTMLAttributes<HTMLInputElement>; // ✅ acepta type, required, etc.

const InputWire = forwardRef<HTMLInputElement, InputWireProps>(
  ({ label, name, id, className, containerClassName, ...props }, ref) => {
    const inputId = id ?? name;
    return (
      <div className={clsx("grid gap-1", containerClassName)}>
        <label htmlFor={inputId} className="text-sm text-neutral-600">
          {label}
        </label>
        <input
          id={inputId}
          name={name}
          ref={ref}
          className={clsx(
            "w-full rounded-xl border border-neutral-300 px-3 py-2",
            "focus:outline-none focus:ring-2 focus:ring-[#8B1E2D]",
            className
          )}
          {...props} // ✅ pasa required, type, autoComplete, etc.
        />
      </div>
    );
  }
);
InputWire.displayName = "InputWire";
export default InputWire;
