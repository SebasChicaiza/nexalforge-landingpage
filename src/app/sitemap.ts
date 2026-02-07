// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import pseoDataRaw from "@/data/pSEO.json";
import type { PSEOPageData } from "@/types/pseo";

export const dynamic = "force-dynamic";

const BASE_URL = "https://www.nexalforge.com";
const pseoData: PSEOPageData[] = pseoDataRaw as PSEOPageData[];

type SitemapPost = {
  slug: string;
  updatedAt: Date;
};

type PostRow = {
  slug: string;
  actualizadoEn: Date;
  publicadoEn: Date | null;
  creadoEn: Date;
};

async function getBlogPosts(): Promise<SitemapPost[]> {
  try {
    const rows: PostRow[] = await prisma.publicacion.findMany({
      where: {
        estado_borrado: false,
        estado: { nombre: "PUBLICADO" },
      },
      select: {
        slug: true,
        actualizadoEn: true,
        publicadoEn: true,
        creadoEn: true,
      },
      orderBy: { actualizadoEn: "desc" },
    });

    return rows.map((row): SitemapPost => {
      const maybeUpdatedAt = row.actualizadoEn ?? row.publicadoEn;
      return {
        slug: row.slug,
        updatedAt: maybeUpdatedAt ?? row.creadoEn,
      };
    });
  } catch (error) {
    console.warn("[sitemap] Falling back to static routes; failed to fetch posts", error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPosts();
  const now = new Date();
  const industryIndexRoutes = Array.from(
    new Set(pseoData.map((entry) => entry.industry_slug))
  ).map(
    (slug): MetadataRoute.Sitemap[number] => ({
      url: `${BASE_URL}/soluciones/${slug}`,
      priority: 0.8,
      changeFrequency: "monthly",
      lastModified: now,
    })
  );

  const pseoRoutes = Array.from(
    new Set(
      pseoData.map(
        (entry) => `/soluciones/${entry.industry_slug}/${entry.use_case_slug}`
      )
    )
  ).map(
    (path): MetadataRoute.Sitemap[number] => ({
      url: `${BASE_URL}${path}`,
      priority: 0.8,
      changeFrequency: "monthly",
      lastModified: now,
    })
  );

  return [
    {
      url: `${BASE_URL}/`,
      priority: 1.0,
      changeFrequency: "weekly",
      lastModified: now,
    },
    {
      url: `${BASE_URL}/blog`,
      priority: 0.9,
      changeFrequency: "weekly",
      lastModified: now,
    },
    {
      url: `${BASE_URL}/asistente-virtual-nexi`,
      priority: 0.9,
      changeFrequency: "monthly",
      lastModified: now,
    },
    {
      url: `${BASE_URL}/soluciones`,
      priority: 0.8,
      changeFrequency: "monthly",
      lastModified: now,
    },
    ...industryIndexRoutes,
    {
      url: `${BASE_URL}/cookies`,
      priority: 0.3,
      changeFrequency: "yearly",
      lastModified: now,
    },
    {
      url: `${BASE_URL}/privacy`,
      priority: 0.3,
      changeFrequency: "yearly",
      lastModified: now,
    },
    {
      url: `${BASE_URL}/forgot-password`,
      priority: 0.2,
      changeFrequency: "yearly",
      lastModified: now,
    },
    {
      url: `${BASE_URL}/politicas-privacidad`,
      priority: 0.3,
      changeFrequency: "yearly",
      lastModified: now,
    },
    ...pseoRoutes,
    ...posts.map((p): MetadataRoute.Sitemap[number] => ({
      url: `${BASE_URL}/blog/${p.slug}`,
      priority: 0.8,
      changeFrequency: "monthly",
      lastModified: p.updatedAt,
    })),
  ];
}
