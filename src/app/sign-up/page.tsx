"use client"
import { useState } from "react";
import { handleTextChange } from "@/utils/functions/input/handleTextChange";
import Form from "@/components/ui/Auth/Form";
import Input from "@/components/ui/Input";
import InputSubmit from "@/components/ui/InputSubmit";
import PasswordInput from "@/components/ui/Auth/PasswordInput";

export default function SignUp() {

    const [formData, setFormData] = useState({ name: '', email: '', password: '' })
    const isFormValid = !!(formData.name && formData.email && formData.password);

    const handleSubmit = () => {
        console.log("test")
    }

    return (
        <Form title="Sign Up" onSubmit={handleSubmit}>
            <Input wrapperClassName="flex flex-col w-64 mb-10" inputClassName="h-8 rounded-lg shadow mt-1 pl-2" id="name" label="Name :" placeholder="Enter your name" type="text" name="name" value={formData.name} onChange={handleTextChange(setFormData)}/>
            <Input wrapperClassName="flex flex-col w-64 mb-10" inputClassName="h-8 rounded-lg shadow mt-1 pl-2" id="email" label="Email :" placeholder="Enter your email" type="text" name="email" value={formData.email} onChange={handleTextChange(setFormData)}/>
            <PasswordInput value={formData.password} onChange={handleTextChange(setFormData)}/>
            <InputSubmit className="my-8" value="Sign Up" isFormValid={isFormValid}/>
        </Form>
    )
}