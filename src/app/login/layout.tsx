import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Acceso interno de Nexal Forge.",
  alternates: {
    canonical: "/login",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
