'use client'

import { Button } from '@/components/ui/button'
import { ArrowLeftSquareIcon} from 'lucide-react'
import { signOut } from "next-auth/react";
import { UserForm } from './compenents/UserForm';

export default function Teacher() {
    return (
        <section className="flex-1 py-6 px-8">
            <header className="w-full flex flex-row items-center justify-between">
                <p className="font-semibold">Alunos</p>
                

                <UserForm trigger={<Button className='rounded-xl text-white bg-black'>Criar novo aluno</Button>} />
                <Button 
                    className='bg-white shadow border px-2'
                    onClick={()=> signOut()}
                >
                    <ArrowLeftSquareIcon className='text-black h-6 w-6'/>
                </Button>
            </header>
        </section>
    )
}