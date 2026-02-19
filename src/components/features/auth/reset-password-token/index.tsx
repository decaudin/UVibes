"use client"
import type { ResetPasswordFormSchema } from "@/schemas/resetPasswordFormSchema";    
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from 'sonner';
import { useResetPasswordTokenStore } from "@/stores/forms/resetPasswordTokenStore";
import { useResetOnPageLeave } from "@/hooks/lifecycle";
import { resetPasswordFormSchema } from "@/schemas/resetPasswordFormSchema";
import FormWrapper from "@/components/ui/auth/FormWrapper";
import PasswordInput from "@/components/ui/auth/PasswordInput";
import SubmitButton from "@/components/ui/SubmitButton";
import ButtonSpinner from "@/components/ui/animations/ButtonSpinner";
import Loader from "@/components/ui/animations/Loader";

export default function ResetPasswordTokenForm() {

    const [isLoading, setIsLoading] = useState(true);

    const router = useRouter();
    const t = useTranslations();
    const params = useParams();
    const token = params.token;

    const { password, confirmPassword, setPassword, setConfirmPassword, reset } = useResetPasswordTokenStore();
    useResetOnPageLeave(reset);

    const { register, handleSubmit, formState: { errors }, watch } = useForm<ResetPasswordFormSchema>({
        resolver: zodResolver(resetPasswordFormSchema),
        mode: "onBlur",
        shouldFocusError: false,
        defaultValues: { password, confirmPassword }
    });

    const formValues = watch();

    useEffect(() => {
        if (formValues.password !== password) setPassword(formValues.password ?? "");
        if (formValues.confirmPassword !== confirmPassword) setConfirmPassword(formValues.confirmPassword ?? "");
    }, [formValues.password, formValues.confirmPassword, password, confirmPassword, setPassword, setConfirmPassword]);

    useEffect(() => {
        const checkToken = async () => {
            if (!token) {
                toast.error(t("MISSING_TOKEN"), { className: "sonner-toast" });
                router.replace("/reset-password");
                return;
            }
            try {
                const res = await fetch("/api/check-reset-token", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ token })
                });
                const result = await res.json();
                if (result.code !== "TOKEN_VALID") {
                    toast.error(t(result.code), { className: "sonner-toast" });
                    router.replace("/reset-password");
                    return;
                }
                setIsLoading(false);
            } catch {
                toast.error(t("CHECK_RESET_TOKEN_ERROR"), { className: "sonner-toast" });
                router.replace("/reset-password");
            }
        };

        checkToken();
    }, [token, router, t]);
    
    const isValid =
        formValues.password === formValues.confirmPassword &&
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=.]).{8,}$/.test(formValues.password);

    const onSubmit = async (data: ResetPasswordFormSchema) => {
        setIsLoading(true);

        const payload = { password: data.password, confirmPassword: data.confirmPassword, token };

        try {
            const res = await fetch("/api/reset-password-token", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const result = await res.json();

            if (res.ok) {
                toast.success(t(result.code), { className: "sonner-toast" });
                router.push("/sign-in");
            } else {
                toast.error(t(result.code), { className: "sonner-toast" });
                setIsLoading(false);
            }
        } catch {
            toast.error(t("resetPasswordToken.errorMessage"), { className: "sonner-toast" });
            setIsLoading(false);
        }
    };

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <FormWrapper title={t("resetPasswordToken.title")} className="mb-0">
                    <form onSubmit={handleSubmit(onSubmit)} className="my-8">
                        <input type="hidden" value={token} {...register("token")} />
                        <PasswordInput
                            name="password" label={t("label.password")} placeholder={t("authPlaceholders.password")}
                            register={register} autoComplete="new-password"
                            error={errors.password} wrapperClassName="mb-12"
                        />
                        <PasswordInput
                            name="confirmPassword" label={t("label.confirmPassword")} placeholder={t("authPlaceholders.confirmPassword")}
                            register={register} autoComplete="new-password"
                            error={errors.confirmPassword} wrapperClassName="mb-4"
                        />
                        <SubmitButton isFormValid={isValid} isLoading={isLoading} className="relative mt-16">
                            <span className={isLoading ? "opacity-0" : "opacity-100"}>{t("resetPasswordToken.submit")}</span>
                            {isLoading && <span className="absolute inset-0 flex items-center justify-center"><ButtonSpinner /></span>}
                        </SubmitButton>
                    </form>
                </FormWrapper>
            )}
        </>
    )
}