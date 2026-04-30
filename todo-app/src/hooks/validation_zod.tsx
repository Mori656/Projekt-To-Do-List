import { z } from 'zod';

export const loginSchema = z.object({
  login: z.string().min(2, 'Imię musi mieć co najmniej 2 znaki'),
  password: z
    .string()
    .min(8, 'Hasło musi mieć co najmniej 8 znaków')
    .regex(/[A-Z]/, 'Hasło musi zawierać wielką literę')
    .regex(/[0-9]/, 'Hasło musi zawierać cyfrę'),
});

export const registerStep1Schema = z.object({
  login: z.string().min(2, 'Login musi mieć co najmniej 2 znaki'),
});

export const registerStep2Schema = z.object({
  password: z
    .string()
    .min(8, 'Hasło musi mieć co najmniej 8 znaków')
    .regex(/[A-Z]/, 'Hasło musi zawierać wielką literę')
    .regex(/[0-9]/, 'Hasło musi zawierać cyfrę'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Hasła muszą być identyczne',
  path: ['confirmPassword'],
});

export const registerStep3Schema = z.object({
  email: z.string().email('Nieprawidłowy adres email'),
});

export const registerSchema = loginSchema
  .extend({
    confirmPassword: z.string(),
    email: z.string().email('Nieprawidłowy adres email').optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Hasła muszą być identyczne',
    path: ['confirmPassword'],
  });

export type Step1Data = z.infer<typeof loginSchema> | z.infer<typeof registerSchema>;
export type RegisterStep1Data = z.infer<typeof registerStep1Schema>;
export type RegisterStep2Data = z.infer<typeof registerStep2Schema>;
export type RegisterStep3Data = z.infer<typeof registerStep3Schema>;