import { z } from 'zod';
import { passwordSchema } from './commonUserSchemas';

export const deleteAccountSchema = z.object({
    password: passwordSchema,
});

export type DeleteAccountFormData = z.infer<typeof deleteAccountSchema>;