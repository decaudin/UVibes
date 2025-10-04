import { z } from "zod";
import { SkinTypeSchema } from "./skinTypeSchema";

const CoordSchema = z.object({
    mode: z.literal("coords"),
    latitude: z.coerce.number().min(-90, "latitudeTooLow").max(90, "latitudeTooHigh"),
    longitude: z.coerce.number().min(-180, "longitudeTooLow").max(180, "longitudeTooHigh"),
    altitude: z.coerce.number().min(0, "altitudeTooLow").max(10000, "altitudeTooHigh").optional(),
    // altitude: z
    //     .union([z.string().length(0), z.coerce.number().min(0, "altitudeTooLow").max(10000, "altitudeTooHigh")])
    //     .optional()
    //     .transform((val) => (val === "" ? undefined : val)),
    ...SkinTypeSchema.shape,
});

const CitySchema = z.object({
    mode: z.literal("city"),
    cityLatitude: z.coerce.number(),
    cityLongitude: z.coerce.number(),
    ...SkinTypeSchema.shape,
});

export const UvCheckSchema = z.discriminatedUnion("mode", [CoordSchema, CitySchema]);

export type FormData = z.infer<typeof UvCheckSchema>;
export type FormDataWithCity = FormData & { city?: string };