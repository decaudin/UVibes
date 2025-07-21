import type { FieldValues, UseFormSetValue, Path, PathValue } from "react-hook-form";

export interface HandleEmailTrimOnBlurParams<T extends FieldValues> {
    setValue: UseFormSetValue<T>;
    onBlurRHF: (e: React.FocusEvent<HTMLInputElement>) => void;
    fieldName: Path<T>;
}

export const handleEmailTrimOnBlur = <T extends FieldValues>({ setValue, onBlurRHF, fieldName }: HandleEmailTrimOnBlurParams<T>) => {
    return (e: React.FocusEvent<HTMLInputElement>) => {
        const trimmed = e.target.value.trim();
        setValue(fieldName, trimmed as PathValue<T, typeof fieldName>, { shouldValidate: true, shouldDirty: true });
        e.target.value = trimmed;
        onBlurRHF(e);
    }
}