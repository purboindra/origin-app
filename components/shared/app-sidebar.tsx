"use client";

import { signOut } from "@/action/auth.action";
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
import { usePathname, useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

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

const initialState = {
  message: "",
  timestamp: 0,
  success: false,
};

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [state, dispatch, isPending] = useActionState(signOut, initialState);

  console.log(state);

  useEffect(() => {
    if (state.success) {
      router.push("/dashboard/login");
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <Sidebar className="pt-30">
      <SidebarContent className="py-2">
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
                    <SidebarMenuButton asChild className="hover:bg-transparent">
                      {item.title === "Keluar" ? (
                        <form
                          action={dispatch}
                          className="hover:cursor-pointer"
                        >
                          <button
                            type="submit"
                            disabled={isPending}
                            className="flex"
                          >
                            <Image
                              src={item.icon}
                              alt={item.title}
                              width={24}
                              height={24}
                              className="w-6 h-6 invert text-white"
                            />
                            <span
                              className={`text-base font-semibold ${
                                isActive ? "text-white" : "text-gray-800"
                              }`}
                            >
                              {item.title}
                            </span>
                          </button>
                          {isPending ? <LoadingIndicator /> : null}
                        </form>
                      ) : (
                        <Link href={item.url} prefetch={false}>
                          <Image
                            src={item.icon}
                            alt={item.title}
                            width={24}
                            height={24}
                            className={
                              isActive ? "filter-white" : "filter-gray"
                            }
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
                      )}
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
