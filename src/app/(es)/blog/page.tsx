import type { Metadata } from "next";
import BlogIndexClient from "./BlogIndexClient";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articulos y recursos de Nexal Forge sobre IA, automatizacion, analitica y operaciones digitales.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    url: "https://nexalforge.com/blog",
    title: "Blog | Nexal Forge",
    description:
      "Articulos y recursos de Nexal Forge sobre IA, automatizacion, analitica y operaciones digitales.",
  },
};

export default function BlogPage() {
  return <BlogIndexClient />;
}
