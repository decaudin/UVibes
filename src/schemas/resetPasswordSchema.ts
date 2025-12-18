import { z } from "zod";
import { emailSchema } from "./commonUserSchemas"; 

export const resetPasswordSchema = z.object({
    email: emailSchema,
    locale: z.enum(["fr", "en"])
});

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>