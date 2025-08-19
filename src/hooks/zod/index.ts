"use client"
import type { FieldError } from "react-hook-form";
import type { ZodErrorKey } from "@/types/zodErrorKey";
import { useTranslations } from "next-intl";
import { formatZodErrorKey } from "@/utils/functions/zod/formatZodErrorKey";
import { validZodKeys } from "@/utils/functions/zod/validZodKey";

const isZodKey = (key: string): key is ZodErrorKey => validZodKeys.includes(key as ZodErrorKey);

export const useZodErrorMessage = () => {

    const t = useTranslations();

    return (error?: FieldError) => {
        if (!error?.message) return undefined;

        if (typeof error.message === "string" && isZodKey(error.message)) {
            return t(formatZodErrorKey(error.message));
        }
    
        return error.message;
    };
}