export interface Student {
    id: string
    name: string
    email: string
    role: 'TEACHER' | 'STUDENT'
    createdAt: Date
    updatedAt: Date
}