"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UserSchema, schema } from "./schema";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormItem, FormLabel, FormField, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserEnum, useRegister } from "@/client/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface UserFormProps {
  trigger: React.ReactNode;
}

export function UserForm({ trigger }: UserFormProps) {

  const { createUser, isLoading} = useRegister()

  const form = useForm<UserSchema>({
    resolver: zodResolver(schema),
  });

  function resetForm(){
    form.reset({
      name: undefined,
      email: undefined,
      password: undefined,
      role: undefined
    })
  }

  function handleCreateUser(payload: UserSchema) {
    createUser(payload, {
      onSuccess: () => {
        toast.success("Usuário criado com sucesso");

        document.getElementById("close-dialog")?.click();

        resetForm();
      },
      onError: () => {
        toast.error("Usuário não foi criado");
      }
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild onClick={resetForm}>{trigger}</DialogTrigger>
      <DialogContent className="bg-white">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreateUser)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome completo</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Nome completo" />
                  </FormControl>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="E-mail" />
                  </FormControl>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Senha" type="password" />
                  </FormControl>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cargo</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o cargo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(UserEnum).map((role) => (
                        <SelectItem value={role} key={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />

            <Button className="w-full mt-4 bg-black text-white " disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="animate-spin"/>
              ) : (
                "Criar usuário"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
