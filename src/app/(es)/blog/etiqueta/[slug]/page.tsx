import type { Metadata } from "next";
import BlogIndexClient from "../../BlogIndexClient";

type TagPageParams = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<TagPageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const readable = slug.replace(/-/g, " ");
  return {
    title: `Blog: ${readable}`,
    description: `Artículos con la etiqueta ${readable}.`,
    alternates: {
      canonical: `/blog/etiqueta/${slug}`,
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function BlogTagPage({
  params,
}: {
  params: Promise<TagPageParams>;
}) {
  const { slug } = await params;
  return <BlogIndexClient initialTag={slug} />;
}
