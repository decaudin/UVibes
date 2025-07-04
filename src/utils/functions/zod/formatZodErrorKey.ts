import type { ZodErrorKey } from "@/types/zodErrorKey";

export const formatZodErrorKey = (key: ZodErrorKey) => `error.${key}` as const;