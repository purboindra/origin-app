import { AppNavbar } from "@/components/shared/app-navbar";
import { AppSidebar } from "@/components/shared/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <main className="flex w-full min-h-screen flex-col bg-[#FAFBFC]">
        <AppNavbar />
        <AppSidebar />
        <section className="pl-64">{children}</section>
      </main>
    </SidebarProvider>
  );
}
