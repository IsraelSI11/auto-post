"use client";

import { redirect } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerAction } from "../actions/registerAction";
import { LoginParams } from "../types/loginParams";

const formSchema = z.object({
  email: z.string().email({
    message: "Introduce un correo electrónico válido.",
  }),
  password: z.string().min(8, {
    message: "La contraseña debe tener al menos 8 caracteres.",
  }),
  confirmPassword: z.string().min(8, {
    message: "La confirmación de la contraseña debe tener al menos 8 caracteres.",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden.",
  path: ["confirmPassword"],
});

export function RegisterForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const registerValues : LoginParams = {
      email: values.email,
      password: values.password,
    }
    // Replace loginAction with registerAction
    registerAction(registerValues).then(() => {
      redirect("/login");
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-muted-foreground font-medium">
                Correo electrónico
              </FormLabel>
              <FormControl>
                <Input placeholder="example@hotmail.com" {...field} />
              </FormControl>
              <FormDescription>
                Introduce tu dirección de correo electrónico.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-muted-foreground font-medium">
                Contraseña
              </FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormDescription>Introduce tu contraseña.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-muted-foreground font-medium">
                Confirmar Contraseña
              </FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormDescription>Repite tu contraseña.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-yinmn-blue to-air-superiority-blue hover:bg-blue-700 text-white rounded-xl"
        >
          Registrarse
        </Button>
      </form>
    </Form>
  );
}
