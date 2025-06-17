"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { usePost } from "@/hooks/api/usePost";
import { ContactFormData, contactSchema } from "@/lib/schemas/contactSchema";
import Input from "@/components/ui/Input"
import SubmitButton from "@/components/ui/SubmitButton";

export default function ContactForm() {

    const [isLoading, setIsLoading] = useState(false);

    const wrapperContactStyles = "flex flex-col justify-center items-center my-4 h-16px w-[100%]";
    const inputContactStyles = "h-10 pl-2 w-[90%] shadow xs:w-4/5 sm:w-[300px]";
    const errorMessageContactStyles = "text-sm text-red-500 w-[90%] mt-2 xs:w-4/5 sm:w-[300px]";

    const { postData } = usePost();

    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        mode: "onBlur",
        shouldFocusError: false,
    });

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
            toast.success("Message sent successfully!", { className: "sonner-toast" });
            reset();
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message, { className: "sonner-toast" });
            } else {
                toast.error("An unknown error occurred", { className: "sonner-toast" });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {isLoading && <p className="text-blue-500 text-center mb-4">Sending your message, please wait...</p>}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center mx-auto mb-16 py-8 w-full text-black bg-amber-100 bg-opacity-70 rounded-lg shadow xs:w-4/5 sm:w-3/5">
                <Input 
                    id="firstName" type="text" label="First Name" placeholder="First Name" autoComplete="given-name" errorMessage={errors.firstName?.message}
                    wrapperClassName={wrapperContactStyles} labelClassName="sr-only" inputClassName={inputContactStyles} errorMessageClassName={errorMessageContactStyles}
                    {...register('firstName')}  
                />
                <Input 
                    id="lastName" type="text" label="Last Name" placeholder="Last Name" autoComplete="family-name" errorMessage={errors.lastName?.message}
                    wrapperClassName={wrapperContactStyles} labelClassName="sr-only" inputClassName={inputContactStyles} errorMessageClassName={errorMessageContactStyles}
                    {...register('lastName')}
                />
                <Input 
                    id="email" type="text" label="Email" placeholder="E-mail" autoComplete="email" errorMessage={errors.email?.message}
                    wrapperClassName={wrapperContactStyles} labelClassName="sr-only" inputClassName={inputContactStyles} errorMessageClassName={errorMessageContactStyles}
                    {...register('email')}
                />
                <textarea 
                    id="message" placeholder="Enter your message here ..." 
                    className={`h-48 mt-4 pl-2 pt-2 w-[90%] shadow xs:w-4/5 sm:w-[300px] ${errors.message && 'border-2 border-red-500'}`}
                    {...register('message')}
                />
                {errors.message && (<p className={errorMessageContactStyles}>{errors.message.message}</p>)}
                <SubmitButton isFormValid={isValid} className="px-8 mt-8 mb-4">{isLoading ? "Sending..." : "Send"}</SubmitButton>
            </form>
        </>
    )
}