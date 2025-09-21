"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function useTrackPageView() {
  const pathname = usePathname();
  const search = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.fbq !== "function")
      return;
    // retrack en cada cambio de ruta
    window.fbq("track", "PageView");
  }, [pathname, search]);
}
