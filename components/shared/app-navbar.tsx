"use client";

import { ChevronDown, Search } from "lucide-react";
import { Input } from "../ui/input";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

export function AppNavbar() {
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

      <div className="flex space-x-4 justify-end">
        <div className="h-8 w-8 md:h-12 md:w-12 relative">
          <div className="bg-red-200 rounded-md absolute bottom-0 h-full w-full" />
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
          <div className="w-12 h-12 bg-gray-200 rounded-md" />
          <div className="flex flex-col">
            <div className="flex space-x-1 items-center">
              <h2 className="text-base font-medium text-blue-800">
                Purboyndra
              </h2>
              <ChevronDown size={12} />
            </div>
            <h3 className="text-gray-400">Admin</h3>
          </div>
        </div>
      </div>
    </nav>
  );
}
