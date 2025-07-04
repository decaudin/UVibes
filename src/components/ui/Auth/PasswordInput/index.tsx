"use client"
import { FieldValues, UseFormRegister, FieldError, Path } from "react-hook-form";
import { useI18n } from "@/locales/client";
import { useZodErrorMessage } from "@/hooks/zod";
import { usePasswordToggle } from "@/hooks/passwordToggle";
import Input from "../../Input";
import EyeToggle from "@/components/ui/Auth/EyeToggle";
import { wrapperStyles, inputStyles, errorMessageStyles } from "@/styles/classNames";

interface PasswordInputProps<T extends FieldValues> {
    autoComplete: string;
    register: UseFormRegister<T>;
    error?: FieldError
}

export default function PasswordInput<T extends FieldValues>({ autoComplete, register, error }: PasswordInputProps<T>) {

    const t = useI18n();

    const getErrorMessage = useZodErrorMessage();

    const { isPasswordVisible, togglePasswordVisibility } = usePasswordToggle();

    return (
        <div className="relative">
            <Input 
                id="password" type={isPasswordVisible ? "text" : "password"} label={t("label.password")} 
                placeholder={t("authPlaceholders.password")} autoComplete={autoComplete} errorMessage={getErrorMessage(error)} 
                wrapperClassName={wrapperStyles} inputClassName={inputStyles} errorMessageClassName={errorMessageStyles}
                {...register('password' as Path<T>)}
            />
            <EyeToggle isVisible={isPasswordVisible} onToggle={togglePasswordVisibility} />
        </div>
    )
};