"use client";
import { useState } from "react"
import Input from "@/components/ui/Input"
import InputSubmit from "@/components/ui/InputSubmit";
import { handleChange } from "@/utils/function/handleChange";

export default function Contact() {

    const wrapperStyles = "flex justify-center my-4 h-16px w-[100%]";
    const inputStyles = "h-10 pl-2 w-[90%] shadow xs:w-4/5 sm:w-[300px]  ";

    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', message: '' });
    const isFormValid = !!(formData.firstName && formData.lastName && formData.email && formData.message);

    return (
        <div>
            <h1 className="text-center my-16 text-lg">Got questions, suggestions, or feedback? Contact us easily here!</h1>
            <form className="flex flex-col items-center mx-auto mb-16 py-8 w-full text-black bg-amber-100 bg-opacity-70 rounded-lg shadow xs:w-4/5 sm:w-3/5">
                <Input wrapperClassName={wrapperStyles} inputClassName={inputStyles} labelClassName="sr-only" id="firstName" label="First Name" placeholder="First Name" type="text" name="firstName" value={formData.firstName} onChange={handleChange(setFormData)} />
                <Input wrapperClassName={wrapperStyles} inputClassName={inputStyles} labelClassName="sr-only" id="lastName" label="Last Name" placeholder="Last Name" type="text" name="lastName" value={formData.lastName} onChange={handleChange(setFormData)} />
                <Input wrapperClassName={wrapperStyles} inputClassName={inputStyles} labelClassName="sr-only" id="email" label="Email" placeholder="E-mail" type="text" name="email" value={formData.email} onChange={handleChange(setFormData)} />
                <textarea className="h-48 my-4 pl-2 pt-2 w-[90%] shadow xs:w-4/5 sm:w-[300px]" id="message" placeholder="Enter your message here ..." name="message" value={formData.message} onChange={handleChange(setFormData)} />
                <InputSubmit value="Send" isFormValid={isFormValid} className="px-8 my-4"/>
            </form>
        </div>
    )
}