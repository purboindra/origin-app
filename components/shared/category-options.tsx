"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { fetcher } from "@/lib/fetcher";
import { cn } from "@/lib/utils";
import { createProductSchema } from "@/lib/validation";
import { CategoryInterface } from "@/types";
import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";
import { useFormContext } from "react-hook-form";
import useSWR from "swr";
import { z } from "zod";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";

export function CategoryOptions() {
  const {
    data: categories,
    error,
    isLoading,
  } = useSWR<CategoryInterface[]>("/api/categories", fetcher);

  const form = useFormContext<z.infer<typeof createProductSchema>>();

  const value = "";

  const [open, setOpen] = React.useState(false);

  if (error) return <div>Failed to load categories</div>;

  if (!categories || (Array.isArray(categories) && categories.length === 0))
    return <div>No Data Found</div>;

  if (isLoading) return <div>Loading...</div>;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="h-12">
        <Button
          disabled={isLoading}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between text-base font-medium text-blue-800/50"
        >
          {value
            ? categories.find((framework) => String(framework.id) === value)
                ?.label
            : "Kategori"}
          <ChevronsUpDown className="opacity-50" />
          {value.length > 0 && (
            <input type="hidden" name="category" value={value} />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Kategori" />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {Array.isArray(categories) && categories.length === 0 ? (
                <div>No Data</div>
              ) : (
                categories.map((framework) => (
                  <CommandItem
                    key={framework.id}
                    value={framework.label}
                    onSelect={(currentValue) => {
                      form.setValue(
                        "category",
                        currentValue === value ? "" : String(framework.id),
                      );
                      setOpen(false);
                    }}
                  >
                    {framework.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === String(framework.id)
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
