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

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

export function CategoryOptions() {
  const { data, error, isLoading } = useSWR("/api/categories", fetcher);

  const form = useFormContext<z.infer<typeof createProductSchema>>();

  const value = form.watch("category");

  const [open, setOpen] = React.useState(false);

  if (error) return <div>Failed to load categories</div>;
  if (!data) return <div>Loading...</div>;

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
            ? data.data.find((framework) => framework.value === value)?.label
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
              {data.data.map((framework) => (
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
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
