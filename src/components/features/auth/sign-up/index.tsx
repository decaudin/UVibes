"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale } from "@/hooks/locales";
import { useZodErrorMessage } from "@/hooks/zod";
import { useSignUpStore } from "@/stores/forms/signUpStore";
import { useResetOnPageLeave } from "@/hooks/lifecycle";
import { SignUpFormData, signUpSchema } from "@/schemas/authSchema";
import { createBlurHandlers } from "@/utils/functions/input/createBlurHandlers";
import { handleEmailTrimOnBlur } from "@/utils/functions/input/handleEmailTrimOnBlur";
import FormWrapper from "@/components/ui/auth/FormWrapper";
import { Input } from "@/components/ui/Input";
import PasswordInput from "@/components/ui/auth/PasswordInput";
import SubmitButton from "@/components/ui/SubmitButton";
import Loader from "@/components/ui/animations/Loader";
import { wrapperStyles, inputStyles, errorMessageStyles } from "@/styles/classNames";

export default function SignUpForm() {

    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const t = useTranslations();

    const { locale } = useLocale();
    
    const getZodErrorMessage = useZodErrorMessage();

    const { name, email, password, setName, setEmail, setPassword, reset } = useSignUpStore();
    useResetOnPageLeave(reset);
    
    const { register, setValue, handleSubmit, formState: { errors }, setError, watch } = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
        mode: "onBlur",
        shouldFocusError: false,
        defaultValues: { name, email, password }
    });

    const blurHandlers = createBlurHandlers<SignUpFormData>({
        fieldNames: ["name", "email", "password"],
        watch,
        setValue,
    });

    const formValues = watch();

    useEffect(() => {
        if (formValues.name !== name) setName(formValues.name ?? "");
        if (formValues.email !== email) setEmail(formValues.email ?? "");
        if (formValues.password !== password) setPassword(formValues.password ?? "");
    }, [formValues.name, formValues.email, formValues.password, name, email, password, setName, setEmail, setPassword]);

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
                if (responseData.code === "USER_ALREADY_EXISTS") {
                    setError('email', { type: 'manual', message: t("signUpErrorUserExists") });
                }
    
                throw new Error(responseData.code || "UNKNOWN_ERROR");
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

    const { ref: nameRef, onBlur: nameOnBlurRHF, ...nameRest } = register("name");
    const { ref: emailRef, onBlur: emailOnBlurRHF, ...emailRest } = register("email");

    const onEmailBlur = handleEmailTrimOnBlur({ setValue, onBlurRHF: emailOnBlurRHF, fieldName: "email" });

    return (
        <>
            {!isLoading ? ( 
                <FormWrapper title={t("signUp")} content={t("signUpPrompt")} href={`/${locale}/sign-in`} link={t("signIn")}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input 
                            id="name" type="text" label={t("label.name")} placeholder={t("authPlaceholders.name")} autoComplete="name"
                            onBlur={(e) => { blurHandlers.name(); nameOnBlurRHF(e) }} errorMessage={getZodErrorMessage(errors.name)}
                            wrapperClassName={wrapperStyles} inputClassName={inputStyles} errorMessageClassName={errorMessageStyles}
                            ref={nameRef} {...nameRest}
                        />
                        <Input 
                            id="email" type="email" label={t("label.email")} placeholder={t("authPlaceholders.email")} autoComplete="email"
                            onBlur={onEmailBlur} errorMessage={getZodErrorMessage(errors.email)}
                            wrapperClassName={wrapperStyles} inputClassName={inputStyles} errorMessageClassName={errorMessageStyles}
                            ref={emailRef} {...emailRest}
                        />
                        <PasswordInput
                            name="password" label={t("label.password")} placeholder={t("authPlaceholders.password")}
                            register={register} autoComplete="new-password"
                            error={errors.password}  onBlur={blurHandlers.password} wrapperClassName="mb-12"
                        />
                        <SubmitButton isFormValid={isValid} isLoading={isLoading}>{t("signUp")}</SubmitButton>
                    </form>
                </FormWrapper>
            ) : (   
                <Loader />
            )}
        </>
    )
}