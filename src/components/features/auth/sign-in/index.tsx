"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
// import { signIn } from 'next-auth/react';
import { useI18n } from "@/locales/client";
import { useLocale } from "@/hooks/locales/urlLocale";
import { useUserStore } from '@/stores/userStore';
import { useZodErrorMessage } from "@/hooks/zod";
import { SignInFormData, signInSchema } from "@/lib/schemas/authSchema";
import { createBlurHandlers } from "@/utils/functions/input/createBlurHandlers";
import { handleEmailTrimOnBlur } from "@/utils/functions/input/handleEmailTrimOnBlur";
import FormWrapper from "@/components/ui/Auth/FormWrapper";
import { Input } from "@/components/ui/Input";
import PasswordInput from "@/components/ui/Auth/PasswordInput";
import SubmitButton from "@/components/ui/SubmitButton";
import { Loader } from "@/components/ui/Loader";
import { inputStyles, wrapperStyles, errorMessageStyles } from "@/styles/classNames";

export default function SignInForm() {

    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const t = useI18n();

    const { locale } = useLocale();
    const setUser = useUserStore(state => state.setUser);

    const getZodErrorMessage = useZodErrorMessage();
    
    const { register, setValue, handleSubmit, formState: { errors }, setError, watch } = useForm<SignInFormData>({
        resolver: zodResolver(signInSchema),
        mode: "onBlur",
        shouldFocusError: false,
    });

    const blurHandlers = createBlurHandlers<SignInFormData>({
        fieldNames: ["email", "password"],
        watch,
        setValue,
    });

    const formValues = watch();

    const isValid = !!(
        formValues.email &&
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(formValues.email) &&
    
        formValues.password &&
        formValues.password.length >= 8 &&
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=.]).{8,}$/.test(formValues.password)
    );

    const onSubmit = async (data: SignInFormData) => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const responseData = await res.json();
                if (responseData.message === "Invalid credentials") {
                    setError("email", { type: "manual", message: t("signInError") });
                    setError("password", { type: "manual", message: t("signInError") });
                }
                throw new Error(responseData.message || 'Something went wrong');
            }

            const userRes = await fetch("/api/user/me", { credentials: "include" });
            if (!userRes.ok) throw new Error("Error while retrieving the user");

            const userData = await userRes.json();

            setUser(userData.user);
            toast.success(t("signInSuccessToast"), { className: "sonner-toast" });
            router.push("/dashboard");

        } catch (error: unknown) {
            setIsLoading(false);
            if (error instanceof Error) {
                toast.error(t("signInErrorToast"), { className: "sonner-toast" });
                console.error(error.message);
            } else {
                toast.error(t("signInUnknownErrorToast"), { className: "sonner-toast" });
            }
        }
    };

    const { ref: emailRef, onBlur: emailOnBlurRHF, ...emailRest } = register("email");

    const onEmailBlur = handleEmailTrimOnBlur({ setValue, onBlurRHF: emailOnBlurRHF, fieldName: "email" });

    return (
        <>
            {!isLoading ? (
                <FormWrapper title={t("signIn")} content={t("signInPrompt")} href={`/${locale}/sign-up`} link={t("signUp")}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input  
                            id="email" type="email" label={t("label.email")} placeholder={t("authPlaceholders.email")} autoComplete="email"
                            onBlur={onEmailBlur} errorMessage={getZodErrorMessage(errors.email)}
                            wrapperClassName={wrapperStyles} inputClassName={inputStyles} errorMessageClassName={errorMessageStyles}
                            ref={emailRef} {...emailRest}
                        />
                        <PasswordInput autoComplete="current-password" error={errors.password} register={register} onBlur={blurHandlers.password} />
                        <Input
                            id="isRememberMe" type="checkbox" label={t("label.checkbox")}
                            wrapperClassName="flex justify-center flex-row-reverse" inputClassName="mr-1 cursor-pointer"
                            {...register("isRememberMe")}
                        />  
                        <SubmitButton isFormValid={isValid} isLoading={isLoading} className="my-8" >{t("signIn")}</SubmitButton>
                    </form>

                    <div className="flex items-center w-64 mt-2">
                        <div className="border-gray-200 w-full border-t-2 border-solid"></div>
                        <span className="mx-4">{t("or")}</span>
                        <div className="border-gray-200 w-full border-t-2 border-solid"></div>
                    </div>

                    <button
                        // onClick={() => signIn('google')}
                        onClick={() => alert('This feature is under development and will be available soon.')}
                        className="flex items-center justify-center gap-3 px-6 py-2 mt-8 mb-12 rounded-md bg-white border border-gray-300 shadow-md hover:shadow-lg transition duration-200"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-6 h-6">
                            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                            <path fill="none" d="M0 0h48v48H0z" />
                        </svg>
                        <span className="text-sm text-gray-700">{t("signInGoogle")}</span>
                    </button>
                </FormWrapper>
            ) : (
                <Loader />
            )}
        </>
    )
}