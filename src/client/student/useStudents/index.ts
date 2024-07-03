import { api } from "@/client";
import { useQuery } from "react-query";
import { Student } from "../types";


//busca os alunos
async function getStudents() {
    return api.get<Student[]>(`/students`).then(res => res.data)
}

export function useStudents() {
    const { data: students, ...rest } = useQuery({
        queryFn: () => getStudents(),
        queryKey: ['students']
    })

    return {
        students,
        ...rest
    }
}
