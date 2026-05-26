"use client";

import { login } from "@/action/auth.action";
import Form from "next/form";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

const initialState = {
  message: "",
  timestamp: 0,
  success: false,
  email: undefined,
  password: undefined,
  values: {
    email: "",
  },
};

export default function LoginForm() {
  const [state, dispatch, isPending] = useActionState(login, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      router.push("/dashboard");
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <div className="flex flex-col gap-5 w-[70%] mt-8">
      <h1 className="text-5xl font-semibold">Silahkan Masuk</h1>
      <Form className="flex flex-col gap-1" action={dispatch}>
        <FieldGroup>
          <Field data-invalid={state.email}>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              placeholder="email"
              id="email"
              name="email"
              type="email"
              autoComplete="off"
              defaultValue={state.values?.email}
            />
            {state.email && (
              <FieldDescription className="text-xs text-red-500">
                {state.email}
              </FieldDescription>
            )}
          </Field>
        </FieldGroup>
        <FieldGroup>
          <Field data-invalid={state.password}>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              placeholder="password"
              id="password"
              name="password"
              type="password"
              autoComplete="off"
            />
            {state.password && (
              <FieldDescription className="text-xs text-red-500">
                {state.password}
              </FieldDescription>
            )}
          </Field>
        </FieldGroup>
        <Button
          disabled={isPending}
          type="submit"
          className="mt-8 bg-red-500 hover:bg-red-600 w-[249px] py-6"
        >
          {isPending ? "Loading..." : "Masuk"}
        </Button>
      </Form>
    </div>
  );
}
