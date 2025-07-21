import { FieldValues, Path, UseFormWatch, UseFormSetValue } from "react-hook-form";
import { handleBlurTrim } from "./handleBlurTrim";

type CreateBlurHandlersParams<T extends FieldValues> = {
    fieldNames: Path<T>[];
    watch: UseFormWatch<T>;
    setValue: UseFormSetValue<T>;
};

export const createBlurHandlers = <T extends FieldValues>(params: CreateBlurHandlersParams<T>): Record<Path<T>, () => void> => {
    const { fieldNames, watch, setValue } = params;
    return fieldNames.reduce((acc, fieldName) => {
        acc[fieldName] = handleBlurTrim({ fieldName, watch, setValue });
        return acc;
    }, {} as Record<Path<T>, () => void>);
}