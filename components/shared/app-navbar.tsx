"use client";

import { User } from "@supabase/supabase-js";
import { ChevronDown, Search } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { Input } from "../ui/input";

interface AppNavbarInterface {
  user: User;
}

export function AppNavbar({ user }: AppNavbarInterface) {
  const [query, setQuery] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);
    params.set("q", query);
    const url = `/dashboard/products?${params.toString()}`;
    router.push(url);
  };

  return (
    <nav className=" px-12 py-8 flex justify-between items-center sticky top-0 z-50 w-full bg-white ">
      <div className="relative w-32 h-12">
        <Image src={"/origin_logo.svg"} alt="Origin Logo" fill />
      </div>

      <h1 className="max-lg:hidden text-4xl font-semibold text-blue-800">
        Dashboard
      </h1>

      <div className="flex max-lg:hidden w-[500px]">
        <Input
          startIcon={Search}
          placeholder="Pencarian"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className="flex space-x-4 justify-end hover:cursor-pointer">
        <div className="h-8 w-8 md:h-12 md:w-12 relative bg-red-200 rounded-md">
          <div className=" rounded-md absolute bottom-0 h-full w-full" />
          <div className=" absolute transform translate-x-1/2 translate-y-1/2 w-6 h-6">
            <Image
              src={"/notification.svg"}
              alt="Notification Logo"
              width={24}
              height={24}
            />
          </div>
          <div className="absolute w-2 h-2 top-1 right-1 rounded-full bg-red-500" />
        </div>
        {/* USER INFO */}
        <div className="flex space-x-2">
          <div className="w-12 h-12 bg-gray-200 rounded-md">
            {user.user_metadata.avatar_url && (
              <Image
                src={user.user_metadata.avatar_url}
                alt="User Logo"
                width={48}
                height={48}
                className="rounded-md object-cover"
              />
            )}
          </div>
          <div className="flex items-center">
            <h2 className="text-base font-medium text-blue-800">
              {user?.user_metadata?.name ?? "-"}
            </h2>
            <div className="flex space-x-1 items-center">
              <ChevronDown size={12} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
