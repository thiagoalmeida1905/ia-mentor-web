"use client"

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginSchema, schema } from "./schema";
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function Login() {
    const router = useRouter()

    const form = useForm<LoginSchema>({
        resolver: zodResolver(schema),
    })

    const isLoginButtonDisabled = form.watch("email") && form.watch("password");

    async function handleLogin(payload: LoginSchema) {
        const result = await signIn('credentials', {
            email: payload.email,
            password: payload.password,
            callbackUrl: '/teacher'
        })

        if(result?.error) {
            router.replace("/error")
        }
    }

    return (
        <section className="w-screen h-screen flex items-center justify-center">
            <div className="py-10 px-20 border rounded-md shadow">
                <p className="font-semibold text-center text-2xl tracking-tighter text-zinc-700 "> Ia Mentor </p>

                <Form {...form}>
                    <form className="w-full" onSubmit={form.handleSubmit(handleLogin)}>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field })=> (
                                <FormItem className="mb-4 ">
                                    <FormLabel className="traking-tighter font-bold text-zinc-700">E-mail</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="email"
                                            placeholder="E-mail"
                                            className="w-full min-w-[320px] border text-black rounded-xl"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-sm font-medium tracking-tighter"/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field })=> (
                                <FormItem className="mb-4">
                                    <FormLabel className="traking-tighter font-bold text-zinc-700">Senha</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="password"
                                            placeholder="Senha"
                                            className="w-full min-w-[320px] text-black rounded-xl"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-sm font-medium tracking-tighter text-red-500"/>
                                </FormItem>
                            )}
                        />

                        <Button className="w-full" disabled={!isLoginButtonDisabled}>
                            Entrar
                        </Button>
                    </form>
                </Form>
            </div>
        </section>
    )
}