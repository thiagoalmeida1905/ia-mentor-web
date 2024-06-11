export enum UserEnum {
    TEACHER = 'TEACHER',
    STUDENT = 'STUDENT'
}

export  type CreateUser = {
    name: string
    email: string
    password: string
    role?: 'TEACHER' | 'STUDENT'
}