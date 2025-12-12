import { z } from "zod";
import { emailSchema } from "./commonUserchemas"; 

export const resetPasswordSchema = z.object({
    email: emailSchema,
    locale: z.enum(["fr", "en"])
});

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>