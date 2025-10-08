// src/app/sitemap.ts
import type { MetadataRoute } from "next";

const BASE_URL = "https://www.nexalforge.com";

// Simula tu fuente de posts (MDX/DB/CMS). Devuelve { slug, updatedAt }.
async function getBlogPosts() {
  // TODO: reemplaza por tu fetch real (Prisma, FS, CMS…)
  return [
    { slug: "agente-ia-en-whatsapp", updatedAt: new Date("2025-09-30") },
    { slug: "tendencias-y-avances-de-la-inteligencia-artificial-en-septiembre-de-2025", updatedAt: new Date("2025-10-01") }
  ];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPosts();

  return [
    {
      url: `${BASE_URL}/`,
      priority: 1.0,
      changefreq: "weekly",
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/blog`,
      priority: 0.9,
      changefreq: "weekly",
      lastModified: new Date(),
    },
    // Páginas estáticas útiles (sin #)
    {
      url: `${BASE_URL}/politicas-privacidad`,
      priority: 0.3,
      changefreq: "yearly",
      lastModified: new Date(),
    },
    // Entradas del blog
    ...posts.map((p) => ({
      url: `${BASE_URL}/blog/${p.slug}`,
      priority: 0.8,
      changefreq: "monthly",
      lastModified: p.updatedAt,
    })),
  ];
}
