"use client"
import type { FieldValues, UseFormRegister, FieldError, Path } from "react-hook-form";
import { useZodErrorMessage } from "@/hooks/zod";
import { usePasswordToggle } from "@/hooks/passwordToggle";
import { Input } from "../../Input";
import EyeToggle from "@/components/ui/auth/EyeToggle";
import { wrapperBaseStyles, inputStyles, errorMessageStyles } from "@/styles/classNames";

interface PasswordInputProps<T extends FieldValues> {
    name: Path<T>;
    label: string;
    placeholder: string;
    autoComplete: string;
    register: UseFormRegister<T>;
    error?: FieldError;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    containerClassName?: string;
    wrapperClassName?: string;
}

export default function PasswordInput<T extends FieldValues>({ name, label, placeholder, autoComplete, register, error, onBlur, containerClassName, wrapperClassName }: PasswordInputProps<T>) {
    
    const getErrorMessage = useZodErrorMessage();

    const { isPasswordVisible, togglePasswordVisibility } = usePasswordToggle();

    const { ref, onBlur: onBlurRHF, ...rest } = register(name);

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (onBlur) onBlur(e);
        onBlurRHF(e);
    };

    return (
        <div className={`relative ${containerClassName}`}>
            <Input 
                id={name} type={isPasswordVisible ? "text" : "password"} label={label}
                placeholder={placeholder} autoComplete={autoComplete} errorMessage={getErrorMessage(error)} 
                wrapperClassName={`${wrapperBaseStyles} ${wrapperClassName}`} inputClassName={inputStyles} errorMessageClassName={errorMessageStyles}
                ref={ref} {...rest} onBlur={handleBlur}
            />
            <EyeToggle isVisible={isPasswordVisible} onToggle={togglePasswordVisibility} />
        </div>
    )
}