"use client";
import type { FieldError } from "react-hook-form";
import { useI18n } from "@/locales/client";
import { formatZodErrorKey } from "@/utils/functions/zod/formatZodErrorKey";
import type { ZodErrorKey } from "@/types/zodErrorKey";
import { validZodKeys } from "@/utils/functions/zod/validZodKey";

const isZodKey = (key: string): key is ZodErrorKey => validZodKeys.includes(key as ZodErrorKey);

export const useZodErrorMessage = () => {
    const t = useI18n();

    return (error?: FieldError) => {
        if (!error?.message) return undefined;

        if (typeof error.message === "string" && isZodKey(error.message)) {
            return t(formatZodErrorKey(error.message));
        }
    
        return error.message;
    };
}