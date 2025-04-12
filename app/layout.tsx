import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/app-sidebar";
import { AppNavbar } from "@/components/shared/app-navbar";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Origin",
  description: "Origin Admin Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased `}>
        <SidebarProvider>
          <main className="flex w-full min-h-screen flex-col bg-[#FAFBFC]">
            <AppNavbar />
            <AppSidebar />
            <section className="pl-64">{children}</section>
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
