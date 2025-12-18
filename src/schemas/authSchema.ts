import { z } from 'zod';
import { createIdentitySchema, emailSchema, passwordSchema } from './commonUserSchemas';

export const signUpSchema = z.object({
    name: createIdentitySchema("name"),
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