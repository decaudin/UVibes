"use client"
import type { SubmitHandler } from "react-hook-form";
import type { ResetPasswordSchema } from "@/schemas/resetPasswordSchema";
import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from 'sonner';
import { useZodErrorMessage } from "@/hooks/zod";
import { useResetPasswordStore } from "@/stores/forms/resetPasswordStore";
import { useResetOnPageLeave } from "@/hooks/lifecycle";
import { resetPasswordSchema } from "@/schemas/resetPasswordSchema";
import FormWrapper from "@/components/ui/auth/FormWrapper";
import { Input } from "@/components/ui/Input";
import SubmitButton from "@/components/ui/SubmitButton";
import ButtonSpinner from "@/components/ui/animations/ButtonSpinner";
import { wrapperStyles, inputStyles, errorMessageStyles } from "@/styles/classNames";

export default function ResetPasswordForm() {

    const [isLoading, setIsLoading] = useState(false);

    const t = useTranslations();

    const locale = useLocale();

    const getZodErrorMessage = useZodErrorMessage();

    const { email, setEmail, reset } = useResetPasswordStore();
    useResetOnPageLeave(reset);

    const { register, handleSubmit, formState: { errors }, watch } = useForm<ResetPasswordSchema>({
        resolver: zodResolver(resetPasswordSchema),
        mode: "onBlur",
        shouldFocusError: false,
        defaultValues: { email }
    });

    const formValues = watch();

    useEffect(() => {
        if (formValues.email !== email) setEmail(formValues.email ?? "");
    }, [formValues.email, email, setEmail]);

    const isValid = !!(formValues.email && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(formValues.email));

    const onSubmit: SubmitHandler<ResetPasswordSchema> = async (data) => {
        setIsLoading(true);

        try {
            const res = await fetch("/api/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (res.ok) {
                reset();
                toast.success(t(result.code), { className: "sonner-toast" });
            } else {
                toast.error(t("resetPassword.errorMessage"), { className: "sonner-toast" });
            }
        } catch {
            toast.error(t("resetPassword.errorMessage"), { className: "sonner-toast" });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <FormWrapper title={t("resetPassword.title")} content={t("resetPassword.sendResetLink")} className="!mb-16">
            <form onSubmit={handleSubmit(onSubmit)} className="my-8">
                <input type="hidden" value={locale} {...register("locale")} />
                <Input  
                    id="email" type="email" label={t("label.email")} placeholder={t("authPlaceholders.email")}
                    autoComplete="email" errorMessage={getZodErrorMessage(errors.email)}
                    wrapperClassName={wrapperStyles} labelClassName="sr-only" inputClassName={inputStyles} errorMessageClassName={errorMessageStyles}
                    {...register("email")}
                />
                <SubmitButton isFormValid={isValid} isLoading={isLoading} className="relative mt-16">
                    <span className={isLoading ? "opacity-0" : "opacity-100"}>{t("resetPassword.buttonText")}</span>
                    {isLoading && <span className="absolute inset-0 flex items-center justify-center"><ButtonSpinner /></span>}
                </SubmitButton>
            </form>
        </FormWrapper>
    )
}