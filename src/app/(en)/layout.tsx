import type { Metadata } from "next";
import "../globals.css";
import SiteHeadScripts from "@/components/layout/SiteHeadScripts";
import SiteShell, { siteBodyClassName } from "@/components/layout/SiteShell";

export const metadata: Metadata = {
  metadataBase: new URL("https://nexalforge.com"),
  title: {
    default: "Nexal Forge",
    template: "%s · Nexal Forge",
  },
  icons: { icon: "/favicon.ico" },
};

export default function EnglishRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <SiteHeadScripts />
      </head>
      <body className={siteBodyClassName}>
        <SiteShell locale="en">{children}</SiteShell>
      </body>
    </html>
  );
}
