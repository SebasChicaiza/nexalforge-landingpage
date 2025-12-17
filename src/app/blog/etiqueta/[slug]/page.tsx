import type { Metadata } from "next";
import BlogPage from "../../page";

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
    alternates: { canonical: `/blog?tag=${slug}` },
  };
}

export default async function BlogTagPage({
  params,
}: {
  params: Promise<TagPageParams>;
}) {
  const { slug } = await params;
  return <BlogPage initialTag={slug} />;
}
