"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useI18n } from "@/locales/client";
import { useZodErrorMessage } from "@/hooks/zod";
import { usePost } from "@/hooks/api/usePost";
import { ContactFormData, contactSchema } from "@/lib/schemas/contactSchema";
import Input from "@/components/ui/Input"
import SubmitButton from "@/components/ui/SubmitButton";

const wrapperContactStyles = "flex flex-col justify-center items-center my-4 h-16px w-[100%]";
const inputContactStyles = "h-10 pl-2 w-[90%] shadow xs:w-4/5 sm:w-[300px]";
const errorMessageContactStyles = "text-sm text-red-500 w-[90%] mt-2 xs:w-4/5 sm:w-[300px]";

export default function ContactForm() {

    const t = useI18n();

    const getZodErrorMessage = useZodErrorMessage();

    const { postData } = usePost();

    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        mode: "onBlur",
        shouldFocusError: false,
    });

    const [isLoading, setIsLoading] = useState(false);

    const formValues = watch();

    const validateName = (name: string) => typeof name === "string" && name.trim().length >= 2;

    const isValid = !!(
        validateName(formValues.firstName) &&
        validateName(formValues.lastName) &&

        formValues.email && 
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formValues.email) &&

        formValues.message &&
        formValues.message.trim().length >= 10 &&
        formValues.message.trim().length <= 1000
    );

    const onSubmit = async (formData: ContactFormData) => {
        setIsLoading(true);
        try {
            await postData("/api/contact", formData);
            toast.success(t("contactSuccessToast"), { className: "sonner-toast" });
            reset();
        } catch (error: unknown) {
            if (error instanceof Error) {
                const messageKey = typeof error.message === "string" ? error.message : "";
                const translatedMessage = messageKey && t(messageKey as keyof typeof t) ? t(messageKey as keyof typeof t) : t("contactUnknownError");
                toast.error(translatedMessage, { className: "sonner-toast" });
            } else {
                toast.error(t("contactUnknownError"), { className: "sonner-toast" });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {isLoading && <p className="text-blue-500 text-center mb-4">{t("sendingMessage")}</p>}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center mx-auto mb-16 py-8 w-full text-black bg-amber-100 bg-opacity-70 rounded-lg shadow xs:w-4/5 sm:w-3/5">
                <Input 
                    id="firstName" type="text" label="First Name" placeholder={t("contactPlaceholders.firstName")} autoComplete="given-name" errorMessage={getZodErrorMessage(errors.firstName)}
                    wrapperClassName={wrapperContactStyles} labelClassName="sr-only" inputClassName={inputContactStyles} errorMessageClassName={errorMessageContactStyles}
                    {...register('firstName')}  
                />
                <Input 
                    id="lastName" type="text" label="Last Name" placeholder={t("contactPlaceholders.lastName")} autoComplete="family-name" errorMessage={getZodErrorMessage(errors.lastName)}
                    wrapperClassName={wrapperContactStyles} labelClassName="sr-only" inputClassName={inputContactStyles} errorMessageClassName={errorMessageContactStyles}
                    {...register('lastName')}
                />
                <Input 
                    id="email" type="text" label="Email" placeholder={t("contactPlaceholders.email")} autoComplete="email" errorMessage={getZodErrorMessage(errors.email)}
                    wrapperClassName={wrapperContactStyles} labelClassName="sr-only" inputClassName={inputContactStyles} errorMessageClassName={errorMessageContactStyles}
                    {...register('email')}
                />
                <textarea 
                    id="message" placeholder={t("contactPlaceholders.message")} 
                    className={`h-48 mt-4 pl-2 pt-2 w-[90%] shadow xs:w-4/5 sm:w-[300px] ${errors.message && 'border-2 border-red-500'}`}
                    {...register('message')}
                />
                {errors.message && (<p className={errorMessageContactStyles}>{getZodErrorMessage(errors.message)}</p>)}
                <SubmitButton isFormValid={isValid} className="px-8 mt-8 mb-4">{isLoading ? t("contactButton.sending") : t("contactButton.send")}</SubmitButton>
            </form>
        </>
    )
}