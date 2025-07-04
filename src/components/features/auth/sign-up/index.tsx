"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from 'sonner';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useI18n } from "@/locales/client";
import { useZodErrorMessage } from "@/hooks/zod";
import { SignUpFormData, signUpSchema } from "@/lib/schemas/authSchema";
import FormWrapper from "@/components/ui/Auth/FormWrapper";
import Input from "@/components/ui/Input";
import PasswordInput from "@/components/ui/Auth/PasswordInput";
import SubmitButton from "@/components/ui/SubmitButton";
import { Loader } from "@/components/ui/Loader";
import { wrapperStyles, inputStyles, errorMessageStyles } from "@/styles/classNames";

export default function SignUpForm() {

    const router = useRouter();
    const t = useI18n();
    const getZodErrorMessage = useZodErrorMessage();

    const [isLoading, setIsLoading] = useState(false);
    
    const { register, handleSubmit, formState: { errors }, setError, watch } = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
        mode: "onBlur",
        shouldFocusError: false,
    });

    const formValues = watch();

    const isValid = !!(
        formValues.name &&
        formValues.name.length >= 2 &&
        /^[a-zA-ZÀ-ÿ0-9]+([\- ][a-zA-ZÀ-ÿ0-9]+)*$/.test(formValues.name) &&
    
        formValues.email &&
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(formValues.email) &&
    
        formValues.password &&
        formValues.password.length >= 8 &&
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=.]).{8,}$/.test(formValues.password)
    );

    const onSubmit = async (data: SignUpFormData) => {
        setIsLoading(true); 
        try {
            const res = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const responseData = await res.json();

            if (!res.ok) {
                if (responseData.message === 'User already exists. Please use a different email.') {
                    setError('email', { type: 'manual', message: t("signUpErrorUserExists") });
                }
    
                throw new Error(responseData.message || 'Something went wrong');
            }

            toast.success(t("signUpSuccessToast"), { className: "sonner-toast" });
            router.push("/sign-in");

        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(t("signUpErrorToast"), { className: "sonner-toast" });
            } else {
                toast.error(t("signUpUnknownErrorToast"), { className: "sonner-toast" });
            }
            setIsLoading(false);
        }
    };

    return (
        <>
            {!isLoading ? ( 
                <FormWrapper title={t("signUp")} content={t("signUpPrompt")} href="/sign-in" link={t("signIn")}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input 
                            id="name" type="text" label={t("label.name")} placeholder={t("authPlaceholders.name")} autoComplete="name" errorMessage={getZodErrorMessage(errors.name)}
                            wrapperClassName={wrapperStyles} inputClassName={inputStyles} errorMessageClassName={errorMessageStyles}
                            {...register("name")}
                        />
                        <Input 
                            id="email" type="email" label={t("label.email")} placeholder={t("authPlaceholders.email")} autoComplete="email" errorMessage={getZodErrorMessage(errors.email)}
                            wrapperClassName={wrapperStyles} inputClassName={inputStyles} errorMessageClassName={errorMessageStyles}
                            {...register("email")}
                        />
                        <PasswordInput autoComplete="new-password" error={errors.password} register={register} />
                        <SubmitButton isFormValid={isValid} isLoading={isLoading} className="my-8">{t("signUp")}</SubmitButton>
                    </form>
                </FormWrapper>
            ) : (   
                <Loader />
            )}
        </>
    )
}