"use client";

import { useEffect, useState } from "react";
import Link from "next/link";


const BRAND = {
  primary: "#8B1E2D",
  primaryHover: "#B84550",
  text: "#2A2A2A",
};

export default function AdminBlogsButton() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  async function refresh() {
    try {
      const res = await fetch("/api/auth/is-admin", { cache: "no-store" });
      const data = (await res.json()) as { isAdmin?: boolean };
      setIsAdmin(Boolean(data.isAdmin));
    } catch {
      setIsAdmin(false);
    }
  }

  useEffect(() => {
    let alive = true;
    (async () => {
      if (!alive) return;
      await refresh();
    })();

    return () => {
      alive = false;
    };
  }, []);

  if (!isAdmin) return null;

  return (
    <Link
      href="/admin/blog"
      className="rounded-full border px-3 py-1.5 text-sm transition-colors border-transparent text-white"
      style={{ background: BRAND.primary, marginTop: 8 }}
    >
      Administrar blogs
    </Link>
  );
}
