import { z } from "zod";
import { GPSCoordinatesSchema } from "./GPSCoordinatesSchema";
import { SkinTypeSchema } from "./skinTypeSchema";

const CoordsSchema = GPSCoordinatesSchema.extend({
    mode: z.literal("coords"),
    ...SkinTypeSchema.shape,
});

const CitySchema = z.object({
    mode: z.literal("city"),
    cityLatitude: z.coerce.number(),
    cityLongitude: z.coerce.number(),
    ...SkinTypeSchema.shape,
});

export const UvCheckSchema = z.discriminatedUnion("mode", [CoordsSchema, CitySchema]);

export type FormData = z.infer<typeof UvCheckSchema>;
export type FormDataWithCity = FormData & { city?: string };