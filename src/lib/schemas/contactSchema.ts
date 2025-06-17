import { z } from "zod";
import { createNameSchema, emailSchema } from "./commonUserchemas";

export const contactSchema = z.object({
    firstName: createNameSchema("First Name"),
    lastName: createNameSchema("Last Name"),
    email: emailSchema,
    message: z.string()
        .min(10, "Message must be at least 10 characters")
        .max(1000, "Message is too long"),
});

export type ContactFormData = z.infer<typeof contactSchema>;