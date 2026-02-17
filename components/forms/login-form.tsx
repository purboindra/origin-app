"use client";

import { login } from "@/action/auth.action";
import { loginSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const initialState = {
  errors: {
    email: undefined,
    password: undefined,
  },
  message: undefined,
  timestamp: undefined,
  success: false,
};

export default function LoginForm() {
  // const [state, dispatch, pending] = useActionState(login, initialState);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // useEffect(() => {
  //   if (!state.success) {
  //     toast.error(state.message);
  //   }
  // }, [state.message, state.success, state.timestamp]);

  return (
    <div className="flex flex-col gap-5 w-[70%] mt-8">
      <h1 className="text-5xl font-semibold">Silahkan Masuk</h1>
      <Form {...form}>
        <form action={login} className="flex flex-col gap-1">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email"
                    id="email"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage>
                  {/* {state.errors?.email && state.errors?.email[0]} */}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="password">Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Password"
                    id="password"
                    type="password"
                    endIcon={EyeOff}
                    {...field}
                  />
                </FormControl>
                <FormMessage>
                  {/* {state.errors?.password && state.errors?.password[0]} */}
                </FormMessage>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="mt-8 bg-red-500 hover:bg-red-600 w-[249px] py-6"
            // disabled={pending}
          >
            Masuk
          </Button>
        </form>
      </Form>
    </div>
  );
}
