import { z } from "zod";

const skinTypeSchema = {
    skinType: z.coerce.number()
        .int("skinTypeInteger")
        .min(1, "skinTypeRange")
        .max(6, "skinTypeRange")
        .optional()
        .nullable(),
};

const CoordSchema = z.object({
    mode: z.literal("coords"),
    latitude: z.coerce.number().min(-90, "latitudeTooLow").max(90, "latitudeTooHigh"),
    longitude: z.coerce.number().min(-180, "longitudeTooLow").max(180, "longitudeTooHigh"),
    altitude: z.coerce.number().min(0, "altitudeTooLow").max(10000, "altitudeTooHigh").optional(),
    // altitude: z
    //     .union([z.string().length(0), z.coerce.number().min(0, "altitudeTooLow").max(10000, "altitudeTooHigh")])
    //     .optional()
    //     .transform((val) => (val === "" ? undefined : val)),
    ...skinTypeSchema,
});

const CitySchema = z.object({
    mode: z.literal("city"),
    cityLatitude: z.coerce.number(),
    cityLongitude: z.coerce.number(),
    ...skinTypeSchema,
});

export const UvCheckSchema = z.discriminatedUnion("mode", [CoordSchema, CitySchema]);

export type FormData = z.infer<typeof UvCheckSchema>;

export type CoordsFormData = Extract<FormData, { mode: "coords" }>;

export type CityFormData = Extract<FormData, { mode: "city" }>;

export const CitySchemaFront = z.object({ city: z.string().nonempty("cityEmpty") });

export type CityFormDataFront = z.infer<typeof CitySchemaFront>;

export type FormDataWithCity = FormData & { city?: string };