import en from "@/locales/en/zod-errors";
import type { ZodErrorKey } from "@/types/zodErrorKey"; 

export const validZodKeys = Object.keys(en.error) as ZodErrorKey[];