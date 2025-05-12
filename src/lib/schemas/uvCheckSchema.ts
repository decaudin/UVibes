import { z } from "zod";

export const UvCheckSchema = z.object({
    latitude: z.coerce.number()
        .min(-90, { message: "Latitude must be ≥ -90" })
        .max(90, { message: "Latitude must be ≤ 90" }),

    longitude: z.coerce.number()
        .min(-180, { message: "Longitude must be ≥ -180" })
        .max(180, { message: "Longitude must be ≤ 180" }),

    altitude: z.coerce.number()
        .min(0, { message: "Altitude must be ≥ 0" })
        .max(10000, { message: "Altitude must be ≤ 10,000" })
        .optional(),

    skinType: z.coerce.number()
        .int()
        .min(1, { message: "Skin type must be between 1 and 6" })
        .max(6, { message: "Skin type must be between 1 and 6" })
        .optional()
        .nullable(),
});  

export type FormData = z.infer<typeof UvCheckSchema>;