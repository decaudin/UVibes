"use client"
import { FieldValues, UseFormRegister, FieldError, Path } from "react-hook-form";
import { useI18n } from "@/locales/client";
import { useZodErrorMessage } from "@/hooks/zod";
import { usePasswordToggle } from "@/hooks/passwordToggle";
import { Input } from "../../Input";
import EyeToggle from "@/components/ui/Auth/EyeToggle";
import { wrapperStyles, inputStyles, errorMessageStyles } from "@/styles/classNames";

interface PasswordInputProps<T extends FieldValues> {
    autoComplete: string;
    register: UseFormRegister<T>;
    error?: FieldError;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

export default function PasswordInput<T extends FieldValues>({ autoComplete, register, error, onBlur }: PasswordInputProps<T>) {

    const t = useI18n();

    const getErrorMessage = useZodErrorMessage();

    const { isPasswordVisible, togglePasswordVisibility } = usePasswordToggle();

    const { ref, onBlur: onBlurRHF, ...rest } = register('password' as Path<T>);

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (onBlur) onBlur(e);
        onBlurRHF(e);
    };

    return (
        <div className="relative">
            <Input 
                id="password" type={isPasswordVisible ? "text" : "password"} label={t("label.password")} 
                placeholder={t("authPlaceholders.password")} autoComplete={autoComplete} errorMessage={getErrorMessage(error)} 
                wrapperClassName={wrapperStyles} inputClassName={inputStyles} errorMessageClassName={errorMessageStyles}
                ref={ref} {...rest} onBlur={handleBlur}
            />
            <EyeToggle isVisible={isPasswordVisible} onToggle={togglePasswordVisibility} />
        </div>
    )
};