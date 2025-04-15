"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

export function SubmitButtonCreatePrudct() {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      type="submit"
      className="bg-red-500 h-[56px] mt-11"
    >
      {pending ? "Loading..." : "Simpan"}
    </Button>
  );
}
