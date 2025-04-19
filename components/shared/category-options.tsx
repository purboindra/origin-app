"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { z } from "zod";
import { createProductSchema } from "@/lib/validation";
import { useFormContext } from "react-hook-form";
import { CategoryInterface } from "@/types";

export function CategoryOptions() {
  const { data, error, isLoading } = useSWR<CategoryInterface[]>(
    "/api/categories",
    fetcher
  );

  const form = useFormContext<z.infer<typeof createProductSchema>>();

  const value = form.watch("category");

  const [open, setOpen] = React.useState(false);

  if (error) return <div>Failed to load categories</div>;
  if (!data || data.length === 0) return <div>No Data Found</div>;

  if (isLoading) return <div>Loading...</div>;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="h-16">
        <Button
          disabled={isLoading}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between text-xl font-medium text-blue-800/50"
        >
          {value
            ? data.find((framework) => framework.name === value)?.name
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
              {data.length === 0 ? (
                <div>No Data</div>
              ) : (
                data.map((framework) => (
                  <CommandItem
                    key={framework.name}
                    value={framework.name}
                    onSelect={(currentValue) => {
                      form.setValue(
                        "category",
                        currentValue === value ? "" : currentValue
                      );
                      setOpen(false);
                    }}
                  >
                    {framework.name}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === framework.name ? "opacity-100" : "opacity-0"
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
