"use client"
import type { FieldValues, UseFormRegister, FieldError, Path } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useZodErrorMessage } from "@/hooks/zod";
import { usePasswordToggle } from "@/hooks/passwordToggle";
import { Input } from "../../Input";
import EyeToggle from "@/components/ui/auth/EyeToggle";
import { wrapperBaseStyles, inputStyles, errorMessageStyles } from "@/styles/classNames";

interface PasswordInputProps<T extends FieldValues> {
    autoComplete: string;
    register: UseFormRegister<T>;
    error?: FieldError;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    wrapperClassName: string;
}

export default function PasswordInput<T extends FieldValues>({ autoComplete, register, error, onBlur, wrapperClassName }: PasswordInputProps<T>) {

    const t = useTranslations();

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
                wrapperClassName={`${wrapperBaseStyles} ${wrapperClassName}`} inputClassName={inputStyles} errorMessageClassName={errorMessageStyles}
                ref={ref} {...rest} onBlur={handleBlur}
            />
            <EyeToggle isVisible={isPasswordVisible} onToggle={togglePasswordVisibility} />
        </div>
    )
}