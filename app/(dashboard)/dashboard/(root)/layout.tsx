import { AppSidebar } from "@/components/shared/app-sidebar";
import { NavbarWrapper } from "@/components/shared/navbar-wrapper";
import { SidebarProvider } from "@/components/ui/sidebar";
import React, { Suspense } from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <main className="flex w-full min-h-screen flex-col bg-[#FAFBFC]">
        <Suspense
          fallback={<div className="h-16 w-full animate-pulse bg-white" />}
        >
          <NavbarWrapper />
        </Suspense>
        <Suspense>
          <AppSidebar />
        </Suspense>
        <section className="pl-64">{children}</section>
      </main>
    </SidebarProvider>
  );
}
