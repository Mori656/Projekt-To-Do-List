import { z } from 'zod';


export const step1Schema = z

.object({

    login: z.string().min(2, 'Imie musi miec co najmniej 2 znaki'),

    password: z.string()

    .min(8, 'Haslo musi miec co najmniej 8 znakow')

    .regex(/[A-Z]/, 'Haslo musi zawierac wielka litere')

    .regex(/[0-9]/, 'Haslo musi zawierac cyfre'),

    confirmPassword: z.string(),

})

.refine(

    (data) => data.password === data.confirmPassword,

    { message: 'Hasla musza byc identyczne', path: ['confirmPassword'] }

);


export type Step1Data = z.infer<typeof step1Schema>;