"use client";
import { useState } from "react"
import { handleTextChange } from "@/utils/functions/input/handleTextChange";
import { usePost } from "@/hooks/api/usePost";
import Input from "@/components/ui/Input"
import SubmitButton from "@/components/ui/SubmitButton";

export default function ContactForm() {

    const wrapperStyles = "flex justify-center my-4 h-16px w-[100%]";
    const inputStyles = "h-10 pl-2 w-[90%] shadow xs:w-4/5 sm:w-[300px]  ";

    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', message: '' });
    const isFormValid = !!(formData.firstName && formData.lastName && formData.email && formData.message);

    const { isLoading, error, data, postData } = usePost();

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        await postData("/api/contact", formData);
    
        if (!error) {
          setFormData({ firstName: "", lastName: "", email: "", message: "" });
          alert("Message envoyé avec succès !");
        }
    };

    return (
        <>
            {isLoading && <p className="text-blue-500 text-center mb-4">Sending your message, please wait...</p>}
            <form onSubmit={handleSubmit} className="flex flex-col items-center mx-auto mb-16 py-8 w-full text-black bg-amber-100 bg-opacity-70 rounded-lg shadow xs:w-4/5 sm:w-3/5">
                <Input wrapperClassName={wrapperStyles} inputClassName={inputStyles} labelClassName="sr-only" id="firstName" label="First Name" placeholder="First Name" type="text" name="firstName" value={formData.firstName} onChange={handleTextChange(setFormData)} />
                <Input wrapperClassName={wrapperStyles} inputClassName={inputStyles} labelClassName="sr-only" id="lastName" label="Last Name" placeholder="Last Name" type="text" name="lastName" value={formData.lastName} onChange={handleTextChange(setFormData)} />
                <Input wrapperClassName={wrapperStyles} inputClassName={inputStyles} labelClassName="sr-only" id="email" label="Email" placeholder="E-mail" type="text" name="email" value={formData.email} onChange={handleTextChange(setFormData)} />
                <textarea className="h-48 my-4 pl-2 pt-2 w-[90%] shadow xs:w-4/5 sm:w-[300px]" id="message" placeholder="Enter your message here ..." name="message" value={formData.message} onChange={handleTextChange(setFormData)} />
                <SubmitButton isFormValid={isFormValid} className="px-8 my-4">{isLoading ? "Sending..." : "Send"}</SubmitButton>
            </form>
            {error && <p className="text-red-500 text-center font-bold">Error: {error}</p>}
            {data && <p className="text-green-500 text-center">Message sent successfully!</p>}
        </>
    )
}