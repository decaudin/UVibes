import { z } from "zod";

export const SkinTypeSchema = z.object({
    skinType: z.coerce.number()
        .int("skinTypeInteger")
        .min(1, "skinTypeRange")
        .max(6, "skinTypeRange")
        .optional()
        .nullable(),
});

export type SkinTypeModalData = z.infer<typeof SkinTypeSchema>;