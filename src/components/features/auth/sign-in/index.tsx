"use client"
import type { SignInFormData } from "@/schemas/authSchema";
import type { Point } from "@/schemas/pointSchema";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslations } from 'next-intl';
import { useForm } from "react-hook-form";
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale } from "@/hooks/locales";
import { useZodErrorMessage } from "@/hooks/zod";
import { useUserStore } from '@/stores/userStore';
import { useSignInStore } from "@/stores/forms/signInStore";
import { useResetOnPageLeave } from "@/hooks/lifecycle";
import { signInSchema } from "@/schemas/authSchema";
import { createBlurHandlers } from "@/utils/functions/input/createBlurHandlers";
import { handleEmailTrimOnBlur } from "@/utils/functions/input/handleEmailTrimOnBlur";
import { openGooglePopup } from "@/utils/functions/google";
import FormWrapper from "@/components/ui/auth/FormWrapper";
import { Input } from "@/components/ui/Input";
import PasswordInput from "@/components/ui/auth/PasswordInput";
import SubmitButton from "@/components/ui/SubmitButton";
import GoogleLogo from "@/components/ui/auth/GoogleLogo";
import Loader from "@/components/ui/animations/Loader";
import { inputStyles, wrapperStyles, errorMessageStyles } from "@/styles/classNames";

export default function SignInForm() {

    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const t = useTranslations();

    const { locale } = useLocale();

    const getZodErrorMessage = useZodErrorMessage();

    const setUser = useUserStore(state => state.setUser);
    const clearPoints = useUserStore(state => state.clearPoints);
    const addPoints = useUserStore(state => state.addPoints);

    const { email, password, isRememberMe, setEmail, setPassword, setIsRememberMe, reset } = useSignInStore();
    useResetOnPageLeave(reset);
    
    const { register, setValue, handleSubmit, formState: { errors }, setError, watch } = useForm<SignInFormData>({
        resolver: zodResolver(signInSchema),
        mode: "onBlur",
        shouldFocusError: false,
        defaultValues: { email, password, isRememberMe }
    });

    const blurHandlers = createBlurHandlers<SignInFormData>({
        fieldNames: ["email", "password"],
        watch,
        setValue,
    });

    const formValues = watch();

    useEffect(() => {
            if (formValues.email !== email) setEmail(formValues.email ?? "");
            if (formValues.password !== password) setPassword(formValues.password ?? "");
            if (formValues.isRememberMe !== isRememberMe) setIsRememberMe(formValues.isRememberMe ?? false);
    }, [formValues.email, formValues.password, formValues.isRememberMe, email, password, isRememberMe, setEmail, setPassword, setIsRememberMe]);

    const isValid =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(formValues.email) &&
        
        formValues.password.length >= 8 &&
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=.]).{8,}$/.test(formValues.password);

    const handleUserAndPoints = useCallback(async () => {
        const userRes = await fetch("/api/user/me", { credentials: "include" });
        if (!userRes.ok) throw new Error("USER_ME_ERROR");
        const userData = await userRes.json();
        setUser(userData.user);

        const pointsRes = await fetch("/api/points", { credentials: "include" });
        if (!pointsRes.ok) throw new Error("POINTS_FETCH_ERROR");
        const pointsGPS: Point[] = await pointsRes.json();
        clearPoints();
        addPoints(pointsGPS);

        router.push("/dashboard");
    }, [router, setUser, clearPoints, addPoints]);

    const handleAuthErrors = useCallback((error: unknown) => {
        const errorMap: Record<string, string> = {
            SIGNIN_ERROR: t("signInErrorToast"),
            USER_ME_ERROR: t("userMeErrorToast"),
            POINTS_FETCH_ERROR: t("pointsFetchError"),
        };

        const message = error instanceof Error && error.message in errorMap ? errorMap[error.message] : t("signInUnknownErrorToast");

        toast.error(message, { className: "sonner-toast" })
    }, [t]);

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
                if (responseData.code === "INVALID_CREDENTIALS") {
                    setError("email", { type: "manual", message: t("signInError") });
                    setError("password", { type: "manual", message: t("signInError") });
                }
                throw new Error("SIGNIN_ERROR");
            }

            await handleUserAndPoints();
            toast.success(t("signInSuccessToast"), { className: "sonner-toast" });

        } catch (error) {
            setIsLoading(false);
            handleAuthErrors(error);
        }
    };

    const { ref: emailRef, onBlur: emailOnBlurRHF, ...emailRest } = register("email");

    const onEmailBlur = handleEmailTrimOnBlur({ setValue, onBlurRHF: emailOnBlurRHF, fieldName: "email" });

    useEffect(() => {
        const handleMessage = async (e: MessageEvent) => {
            if (e.origin !== process.env.NEXT_PUBLIC_BASE_URL) return;
            if (e.data?.type === "google-auth-success") {
                setIsLoading(true);
                try {
                    await handleUserAndPoints();
                    toast.success(t("signInSuccessToast"), { className: "sonner-toast" });
                } catch (error) {
                    setIsLoading(false);
                    handleAuthErrors(error)
                }
            }
        };

        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, [ t, handleUserAndPoints, handleAuthErrors]);

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
                        <PasswordInput
                            name="password" label={t("label.password")} placeholder={t("authPlaceholders.password")}
                            register={register} autoComplete="current-password"
                            error={errors.password} onBlur={blurHandlers.password} wrapperClassName="mb-4"
                        />
                        <Link className="block text-right mt-0 mb-8 text-sm text-red-500 hover:text-red-700" href={`/${locale}/reset-password`}>
                            {t("forgotPassword")}
                        </Link>
                        <Input
                            id="isRememberMe" type="checkbox" label={t("label.checkbox")}
                            wrapperClassName="flex justify-center flex-row-reverse" inputClassName="mr-1 cursor-pointer"
                            {...register("isRememberMe")}
                        />  
                        <SubmitButton isFormValid={isValid} isLoading={isLoading} className="my-8" >{t("signIn")}</SubmitButton>
                    </form>

                    <div className="flex items-center w-64">
                        <div className="border-gray-200 w-full border-t-2 border-solid"></div>
                        <span className="mx-4">{t("or")}</span>
                        <div className="border-gray-200 w-full border-t-2 border-solid"></div>
                    </div>

                    <button
                        onClick={() => openGooglePopup('/api/google', t)}
                        className="flex items-center justify-center gap-4 px-8 py-2 mt-8 rounded-md bg-white border border-gray-300 shadow-md hover:shadow-lg transition duration-200"
                    >
                        <GoogleLogo />
                        <span className="text-sm text-gray-700">{t("signInGoogle")}</span>
                    </button>
                </FormWrapper>
            ) : (
                <Loader />
            )}
        </>
    )
}