"use client"
import type { ResetPasswordSchema } from "@/schemas/resetPasswordSchema";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useZodErrorMessage } from "@/hooks/zod";
import { resetPasswordSchema } from "@/schemas/resetPasswordSchema";
import FormWrapper from "@/components/ui/auth/FormWrapper";
import { Input } from "@/components/ui/Input";
import SubmitButton from "@/components/ui/SubmitButton";
import { wrapperStyles, inputStyles, errorMessageStyles } from "@/styles/classNames";

export default function ResetPasswordForm() {

    const t = useTranslations();
    const [isLoading, setIsLoading] = useState(false);
    const getZodErrorMessage = useZodErrorMessage();

    const { register, handleSubmit, formState: { errors }, watch } = useForm<ResetPasswordSchema>({
        resolver: zodResolver(resetPasswordSchema),
        mode: "onBlur",
        shouldFocusError: false,
    });

    const formValues = watch();

    const isValid = !!(formValues.email && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(formValues.email));

    const onSubmit = async () => {
        setIsLoading(true);

        await new Promise((res) => setTimeout(res, 1000));

        setIsLoading(false);
    };

    return (
        <FormWrapper title={t("resetPassword.title")} content={t("resetPassword.sendResetLink")}>
            <form onSubmit={handleSubmit(onSubmit)} className="my-8">
                <Input  
                    id="email" type="email" label={t("label.email")} placeholder={t("authPlaceholders.email")}
                    autoComplete="email" errorMessage={getZodErrorMessage(errors.email)}
                    wrapperClassName={wrapperStyles} labelClassName="sr-only" inputClassName={inputStyles} errorMessageClassName={errorMessageStyles}
                    {...register("email")}
                />
                <SubmitButton isFormValid={isValid} isLoading={isLoading} className="mt-16">{t("signIn")}</SubmitButton>
            </form>
        </FormWrapper>
    )
}