"use client";

import type { JSX, ReactNode, RefCallback } from "react";
import { useEffect, useRef, useState } from "react";

type Props = {
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  delay?: number;
};

/**
 * Reveal animates its children when they enter the viewport.
 */
export default function Reveal({
  children,
  as = "div",
  className = "",
  delay = 0,
}: Props) {
  const [visible, setVisible] = useState(false);
  type IntrinsicElement = HTMLElement | SVGElement;
  const ref = useRef<IntrinsicElement | null>(null);
  const Element = as as keyof JSX.IntrinsicElements;
  const setRef: RefCallback<IntrinsicElement> = (node) => {
    ref.current = node;
  };

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Element
      ref={setRef}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transform-gpu transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </Element>
  );
}
