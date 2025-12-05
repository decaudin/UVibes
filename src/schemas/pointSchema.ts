import { z } from "zod";
import { GPSCoordinatesSchema } from "./GPSCoordinatesSchema";

export const PointSchema = GPSCoordinatesSchema.extend({
    name: z.string().min(1, "nameRequired").max(50, "nameTooLong"),
});

export type PointFormData = z.infer<typeof PointSchema>;

export type PatchPointData = Partial<Omit<z.infer<typeof PointSchema>, "userId">>;

export interface Point extends PointFormData {
    id: string
}