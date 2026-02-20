"use client";

import { Plus } from "lucide-react";
import React from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import { createProductSchema } from "@/lib/validation";
import { FormControl, FormField, FormItem } from "../ui/form";
import { Field } from "../ui/field";
import { Input } from "../ui/input";

export default function CalorOptionsForm() {
  const [color, setColor] = React.useState("#aabbcc");
  const [open, setOpen] = React.useState(false);
  const [colors, setColors] = React.useState<string[]>([]);

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    setColors((prevColor) => [...prevColor, newColor]);
  };

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <div className="flex flex-col space-y-1">
        <h1 className="text-xl font-medium text-blue-800/50">Warna Tersedia</h1>
        <div className="flex space-x-1">
          {colors.map((color, index) => {
            return (
              <Field key={color}  className="w-8 h-8 rounded-full flex items-center justify-center">
               <div>
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: color }}
                        />
                        <input
                          type="hidden"
                          name={`colors.${index}`}
                          value={color}
                        />
                      </div>
              </Field>
            );
          })}
          {colors.length < 3 && (
            <PopoverTrigger>
              <div className="w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center">
                <Plus className="w-6 h-6 text-white" />
              </div>
            </PopoverTrigger>
          )}
        </div>
      </div>
      <PopoverContent>
        <HexColorPicker color={color} onChange={setColor} />
        <div className="flex flex-col space-y-1">
          <HexColorInput color={color} onChange={setColor} />
          <Button
            onClick={() => {
              handleColorChange(color);
              setOpen(false);
            }}
          >
            Add
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
