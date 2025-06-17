import { z } from 'zod';
import { createNameSchema, emailSchema } from './commonUserchemas';

const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=.]).{8,}$/;

const passwordSchema = z.string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(64, 'Password must be at most 64 characters')
    .regex(passwordRegex, 'Password must include an uppercase letter, a number, and a special character');

export const signUpSchema = z.object({
    name: createNameSchema("Name"),
    email: emailSchema,
    password: passwordSchema,
});

export const signInSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
    isRememberMe: z.boolean().optional()
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
export type SignInFormData = z.infer<typeof signInSchema>;