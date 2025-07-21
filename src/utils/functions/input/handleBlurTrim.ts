import { UseFormWatch, UseFormSetValue, FieldValues, Path } from "react-hook-form";

type HandleBlurTrimParams<T extends FieldValues> = {
    fieldName: Path<T>;
    watch: UseFormWatch<T>;
    setValue: UseFormSetValue<T>;
};

export const handleBlurTrim = <T extends FieldValues>({ fieldName, watch, setValue }: HandleBlurTrimParams<T>): (() => void) => {
    return () => {
        const currentValue = watch(fieldName);
        if (typeof currentValue === "string") {
            const trimmed = currentValue.trim();
            if (trimmed !== currentValue) {
                setValue(fieldName, trimmed, { shouldValidate: true });
            }
        }
    }
}