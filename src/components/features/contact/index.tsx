"use client"
import type { ContactFormData } from "@/schemas/contactSchema";
import { useState, useEffect } from "react";
import { useTranslations } from 'next-intl';
import { useForm } from "react-hook-form";
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useZodErrorMessage } from "@/hooks/zod";
import { usePost } from "@/hooks/api/usePost";
import { useContactStore } from "@/stores/forms/contactStore";
import { useResetOnPageLeave } from "@/hooks/lifecycle";
import { contactSchema } from "@/schemas/contactSchema";
import { createBlurHandlers } from "@/utils/functions/input/createBlurHandlers";
import { handleEmailTrimOnBlur } from "@/utils/functions/input/handleEmailTrimOnBlur";
import { Input } from "@/components/ui/Input"
import SubmitButton from "@/components/ui/SubmitButton";

const wrapperContactStyles = "flex flex-col justify-center items-center my-4 h-16px w-[100%]";
const inputContactStyles = "h-10 pl-2 w-[90%] shadow xs:w-4/5 sm:w-[300px]";
const errorMessageContactStyles = "text-sm text-red-500 w-[90%] mt-2 xs:w-4/5 sm:w-[300px]";

export default function ContactForm() {

    const [isLoading, setIsLoading] = useState(false);

    const t = useTranslations();

    const getZodErrorMessage = useZodErrorMessage();

    const { postData } = usePost();

    const { firstName, lastName, email, message, setFirstName, setLastName, setEmail, setMessage, reset: resetStore } = useContactStore();
    useResetOnPageLeave(resetStore);

    const { register, setValue, handleSubmit, formState: { errors }, watch, reset } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        mode: "onBlur",
        shouldFocusError: false,
        defaultValues: { firstName, lastName, email, message }
    });

    const blurHandlers = createBlurHandlers<ContactFormData>({
        fieldNames: ["firstName", "lastName", "email", "message"],
        watch,
        setValue,
    });

    const formValues = watch();

    useEffect(() => {
        if (formValues.firstName !== firstName) setFirstName(formValues.firstName ?? "");
        if (formValues.lastName !== lastName) setLastName(formValues.lastName ?? "");
        if (formValues.email !== email) setEmail(formValues.email ?? "");
        if (formValues.message !== message) setMessage(formValues.message ?? "");
    }, [formValues.firstName, formValues.lastName, formValues.email, formValues.message, firstName, lastName, email, message, setFirstName, setLastName, setEmail, setMessage]);

    const validateName = (name: string) => typeof name === "string" && name.trim().length >= 2;

    const isValid =
        validateName(formValues.firstName) &&
        validateName(formValues.lastName) &&

        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formValues.email) &&

        formValues.message.trim().length >= 10 &&
        formValues.message.trim().length <= 1000;

    const onSubmit = async (formData: ContactFormData) => {
        setIsLoading(true);
        try {
            await postData("/api/contact", formData);
            toast.success(t("MESSAGE_SENT_SUCCESSFULLY"), { className: "sonner-toast" });
            reset({ firstName: "", lastName: "", email: "", message: "" });
            resetStore();
        } catch (error: unknown) {
            if (error instanceof Error) {
                const messageKey = typeof error.message === "string" ? error.message : "";
                const translatedMessage = messageKey ? t(messageKey) : t("contactErrorToast");
                toast.error(translatedMessage, { className: "sonner-toast" });
            } else {
                toast.error(t("contactErrorToast"), { className: "sonner-toast" });
            }
        } finally {
            setIsLoading(false);
        }
    };

    const { ref: firstNameRef, onBlur: firstNameOnBlurRHF, ...firstNameRest } = register("firstName");
    const { ref: lastNameRef, onBlur: lastNameOnBlurRHF, ...lastNameRest } = register("lastName");
    const { ref: emailRef, onBlur: emailOnBlurRHF, ...emailRest } = register("email");
    const { ref: messageRef, onBlur: messageOnBlurRHF, ...messageRest } = register("message");

    const onEmailBlur = handleEmailTrimOnBlur({ setValue, onBlurRHF: emailOnBlurRHF, fieldName: "email" });

    return (
        <>
            {isLoading && <p className="text-blue-500 text-center mb-4">{t("sendingMessage")}</p>}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center mx-auto mb-16 py-8 w-full text-black bg-amber-100 bg-opacity-70 rounded-lg shadow xs:w-4/5 sm:w-3/5">
                <Input 
                    id="firstName" type="text" label={t("contact.firstName")} placeholder={t("contact.firstName")} autoComplete="given-name" 
                    ref={firstNameRef} onBlur={(e) => { blurHandlers.firstName(); firstNameOnBlurRHF(e) }} errorMessage={getZodErrorMessage(errors.firstName)}
                    wrapperClassName={wrapperContactStyles} labelClassName="sr-only" inputClassName={inputContactStyles} errorMessageClassName={errorMessageContactStyles}
                    {...firstNameRest}
                />
                <Input 
                    id="lastName" type="text" label={t("contact.lastName")} placeholder={t("contact.lastName")} autoComplete="family-name" 
                    ref={lastNameRef} onBlur={(e) => { blurHandlers.lastName(); lastNameOnBlurRHF(e) }} errorMessage={getZodErrorMessage(errors.lastName)}
                    wrapperClassName={wrapperContactStyles} labelClassName="sr-only" inputClassName={inputContactStyles} errorMessageClassName={errorMessageContactStyles}
                    {...lastNameRest}
                />
                <Input 
                    id="email" type="email" label={t("contact.email")} placeholder={t("contact.email")} autoComplete="email"
                    ref={emailRef} onBlur={onEmailBlur} errorMessage={getZodErrorMessage(errors.email)}
                    wrapperClassName={wrapperContactStyles} labelClassName="sr-only" inputClassName={inputContactStyles} errorMessageClassName={errorMessageContactStyles}
                    {...emailRest}
                />
                <label htmlFor="message" className="sr-only">{t("contact.labelMessage")}</label>
                <textarea 
                    id="message" placeholder={t("contact.message")} ref={messageRef} onBlur={(e) => { blurHandlers.message(); messageOnBlurRHF(e) }}
                    className={`h-48 mt-4 pl-2 pt-2 w-[90%] shadow xs:w-4/5 sm:w-[300px] ${errors.message && 'border-2 border-red-500'}`}
                    {...messageRest} 
                />
                {errors.message && (<p className={errorMessageContactStyles}>{getZodErrorMessage(errors.message)}</p>)}
                <SubmitButton isFormValid={isValid} className="px-8 mt-8 mb-4">{isLoading ? t("contactButton.sending") : t("contactButton.send")}</SubmitButton>
            </form>
        </>
    )
}