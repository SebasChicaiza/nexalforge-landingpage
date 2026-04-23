import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demo 1",
  description: "Formulario interno de demo de Nexal Forge.",
  alternates: {
    canonical: "/demo-1",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function DemoOneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
