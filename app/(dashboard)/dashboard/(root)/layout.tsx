import { fetchCurrentUser } from "@/action/users.action";
import { AppNavbar } from "@/components/shared/app-navbar";
import { AppSidebar } from "@/components/shared/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await fetchCurrentUser();
  return (
    <SidebarProvider>
      <main className="flex w-full min-h-screen flex-col bg-[#FAFBFC]">
        {data && <AppNavbar user={data} />}
        <AppSidebar />
        <section className="pl-64">{children}</section>
      </main>
    </SidebarProvider>
  );
}
