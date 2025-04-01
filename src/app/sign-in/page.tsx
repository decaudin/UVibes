"use client"
import { useState } from "react";
import Link from "next/link";
import { handleTextChange } from "@/utils/functions/input/handleTextChange";
import Form from "@/components/ui/Auth/Form";
import Input from "@/components/ui/Input";
import PasswordInput from "@/components/ui/Auth/PasswordInput";
import InputSubmit from "@/components/ui/InputSubmit";

export default function SignIn() {

    const [formData, setFormData] = useState({ email: '', password: '' })
    const [isRememberMe, setIsRememberMe] = useState(false)
    const isFormValid = !!(formData.email && formData.password);

    const handleSubmit = () => {
        console.log("test")
    }

    return (
        <Form title="Sign In" onSubmit={handleSubmit}>
            <Input wrapperClassName="flex flex-col w-64 mb-10" inputClassName="h-8 rounded-lg shadow mt-1 pl-2" id="email" label="Email :" placeholder="Enter your email" type="text" name="email" value={formData.email} onChange={handleTextChange(setFormData)}/>
            <PasswordInput value={formData.password} onChange={handleTextChange(setFormData)}/>
            <Input wrapperClassName="flex justify-end flex-row-reverse" inputClassName="mr-1 cursor-pointer" id="checkbox" label="Remember me" type="checkbox" name="checkbox" value="" checked={isRememberMe} onChange={(e) => setIsRememberMe(e.target.checked)}/>
            <InputSubmit className="my-8" value="Sign In" isFormValid={isFormValid}/>
            <p className="mb-8 text-center">Don’t have an account ? <Link className="text-red-500" href="/sign-up">Sign Up</Link></p>
        </Form>
    )
}