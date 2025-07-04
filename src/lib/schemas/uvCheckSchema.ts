import { z } from "zod";

export const UvCheckSchema = z.object({
    latitude: z.coerce.number()
        .min(-90, "latitudeTooLow")
        .max(90, "latitudeTooHigh"),

    longitude: z.coerce.number()
        .min(-180, "longitudeTooLow")
        .max(180, "longitudeTooHigh"),

    altitude: z.coerce.number()
        .min(0, "altitudeTooLow")
        .max(10000, "altitudeTooHigh")
        .optional(),

    skinType: z.coerce.number()
        .int("skinTypeInteger")
        .min(1, "skinTypeRange")
        .max(6, "skinTypeRange")
        .optional()
        .nullable(),
});

export type FormData = z.infer<typeof UvCheckSchema>;