"use client";

import LoadingIndicator from "@/app/loading-indicator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: "/graph.svg",
  },
  {
    title: "Tambah Produk",
    url: "/dashboard/products/create",
    icon: "/camera.svg",
  },
  {
    title: "Pesanan",
    url: "/dashboard/orders",
    icon: "/shopping_cart.svg",
  },
  {
    title: "Produk",
    url: "/dashboard/products",
    icon: "/product.svg",
  },
  {
    title: "Pengaturan",
    url: "/dashboard/settings",
    icon: "/settings.svg",
  },
  {
    title: "Keluar",
    url: "#",
    icon: "/logout.svg",
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="pt-30">
      <SidebarContent className="py-2 bg-white">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = item.url === pathname;

                return (
                  <SidebarMenuItem
                    key={item.title}
                    className={`py-3 mr-8 ${
                      isActive ? "bg-red-500 rounded-md" : ""
                    }`}
                  >
                    <SidebarMenuButton asChild isActive className="bg-red-500">
                      <Link href={item.url} prefetch={false}>
                        <Image
                          src={item.icon}
                          alt={item.title}
                          width={24}
                          height={24}
                          className="w-6 h-6 text-white"
                        />
                        <span
                          className={`text-base font-semibold ${
                            isActive ? "text-white" : "text-gray-800"
                          }`}
                        >
                          {item.title}
                        </span>
                        <LoadingIndicator />
                      </Link>
                    </SidebarMenuButton>
                    {/* <SidebarMenuAction className="peer-data-[active=true]/menu-button:opacity-100" /> */}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
