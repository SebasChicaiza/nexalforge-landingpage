import type { ReactNode } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-100/70 pt-24">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-4 px-4 pb-10 md:flex-row md:gap-6 md:px-6">
        <AdminSidebar />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
