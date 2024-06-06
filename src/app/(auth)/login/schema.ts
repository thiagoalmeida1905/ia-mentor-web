import { z } from 'zod'

export const schema = z.object({
    email: z.string({
        required_error: 'Preencha o campo de email'
    }).email('Insira um email válido'),
    password: z.string({
        required_error: 'Preencha o campo de senha'
    })
})

export type LoginSchema = z.infer<typeof schema>