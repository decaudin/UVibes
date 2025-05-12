import { z } from 'zod'

const nameRegex = /^[a-zA-ZÀ-ÿ0-9]+([\- ][a-zA-ZÀ-ÿ0-9]+)*$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=.]).{8,}$/;

const nameSchema = z.string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters')
    .regex(nameRegex, 'Only letters, numbers, single spaces or hyphens between words are allowed');
const emailSchema = z.string()
    .min(1, 'Email is required')
    .email('Invalid email address');
const passwordSchema = z.string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters')
    .regex(passwordRegex, 'Password must include an uppercase letter, a number, and a special character');

export const signUpSchema = z.object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
});

export const signInSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
export type SignInFormData = z.infer<typeof signInSchema>;