import { z } from "zod";
import { passwordSchema } from "@/schemas/commonUserSchemas";

export const resetPasswordFormSchema = z.object({
    password: passwordSchema,
    confirmPassword: passwordSchema,
    token: z.string().min(1, "tokenRequired"),
    }).refine(data => data.password === data.confirmPassword, {
    message: "passwordsDontMatch",
    path: ["confirmPassword"]
});

export type ResetPasswordFormSchema = z.infer<typeof resetPasswordFormSchema>