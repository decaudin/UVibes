import { z } from "zod";
import { createIdentitySchema, emailSchema } from "./commonUserchemas";

export const contactSchema = z.object({
    firstName: createIdentitySchema("firstName"),
    lastName: createIdentitySchema("lastName"),
    email: emailSchema,
    message: z.string()
        .trim()
        .min(10, "messageTooShort")
        .max(1000, "messageTooLong"),
});

export type ContactFormData = z.infer<typeof contactSchema>;