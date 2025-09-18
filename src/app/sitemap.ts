// src/app/sitemap.ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://www.nexalforge.com/", priority: 1.0 },
    { url: "https://www.nexalforge.com/#servicios", priority: 0.7 },
    { url: "https://www.nexalforge.com/#proceso", priority: 0.7 },
    { url: "https://www.nexalforge.com/#roi", priority: 0.7 },
    { url: "https://www.nexalforge.com/#faq", priority: 0.6 },
    { url: "https://www.nexalforge.com/#contacto", priority: 0.8 },
  ];
}
