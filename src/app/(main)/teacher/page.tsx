'use client'

import { Button } from '@/components/ui/button'
import { ArrowLeftSquareIcon, Loader2} from 'lucide-react'
import { signOut } from "next-auth/react";
import { UserForm } from './components/UserForm';
import { useStudents } from '@/client/student';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from "date-fns";

export default function Teacher() {

    const { students = [], isLoading } = useStudents();


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


            {isLoading && (
                <div className='w-full flex items-center justify-center py-6'>
                    <Loader2 className='text-blue-500 animate-spin h-12 w-12'/>

                </div>
            )}

            {!isLoading && (
                <div className='py-20'>
                    <h2 className='text-center font-bold text-2xl mb-8'>Alunos cadastrados</h2>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nome</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Data de criação</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {students.map(student => (
                                <TableRow key={student.id}>
                                    <TableCell>{student.name}</TableCell>
                                    <TableCell>{student.email}</TableCell>
                                    <TableCell>{format(new Date(student.createdAt), 'dd/MM/yyyy')}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}


        </section>
    )
}