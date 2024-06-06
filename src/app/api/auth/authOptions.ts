import { api } from '@/client'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const nextAuthOptions:NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: {label: 'email', type: 'email'},
                password: {label: 'password', type: 'password'}
            },
            async authorize(credentials) {
                const { email, password } = credentials as {
                    email: string
                    password: string
                }

                try {
                    const user = await api.post('/auth/login', {email, password})
                    .then((res)=> res.data)

                    if (user) {
                        return user
                    }

                } catch(error) {
                    return null
                }

                return null
            }
        })
    ],
    pages: {
        signIn: '/login'
    }
}