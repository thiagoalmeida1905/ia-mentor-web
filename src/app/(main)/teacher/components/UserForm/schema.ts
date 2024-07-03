import { UserEnum } from '@/client/auth';
import { z } from 'zod';

export const schema = z.object({
    name: z.string({
        required_error: 'Insira o nome do usuário'
    }),
    email: z.string({
        required_error: 'Insira o email do usuário'
    }).email('Insira um email válido'),
    password: z.string({
        required_error: 'Insira uma senha para o usuário'
    }),
    role: z.nativeEnum( UserEnum, {
        required_error: 'Insira o cargo do usuário'
    })
})

export type UserSchema = z.infer<typeof schema>