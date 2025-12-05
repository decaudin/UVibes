import { z } from "zod";

export const GPSCoordinatesSchema = z.object({
    latitude: z.coerce.number().min(-90, "latitudeTooLow").max(90, "latitudeTooHigh"),
    longitude: z.coerce.number().min(-180, "longitudeTooLow").max(180, "longitudeTooHigh"),
    altitude: z.coerce.number().min(0, "altitudeTooLow").max(10000, "altitudeTooHigh").optional(),
    // altitude: z
    //     .union([z.string().length(0), z.coerce.number().min(0, "altitudeTooLow").max(10000, "altitudeTooHigh")])
    //     .optional()
    //     .transform((val) => (val === "" ? undefined : val)),
})