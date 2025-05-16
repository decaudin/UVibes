"use client"
import { useState } from "react";
import Link from "next/link";
import { handleTextChange } from "@/utils/functions/input/handleTextChange";
import Form from "@/components/ui/Auth/Form";
import Input from "@/components/ui/Input";
// import PasswordInput from "@/components/ui/Auth/PasswordInput";
import SubmitButton from "@/components/ui/SubmitButton";

export default function SignInForm() {

    const [formData, setFormData] = useState({ email: '', password: '' })
    const [isRememberMe, setIsRememberMe] = useState(false)
    const isFormValid = !!(formData.email && formData.password);

    const handleSubmit = async () => {
        console.log("test")
    }

    return (
        <Form title="Sign In" onSubmit={handleSubmit}>
            <Input wrapperClassName="flex flex-col w-64 mb-10" inputClassName="h-8 rounded-lg shadow mt-1 pl-2" id="email" label="Email :" placeholder="Enter your email" type="text" name="email" value={formData.email} onChange={handleTextChange(setFormData)}/>
            {/* <PasswordInput autoComplete="current-password" value={formData.password} onChange={handleTextChange(setFormData)}/> */}
            <Input wrapperClassName="flex justify-end flex-row-reverse" inputClassName="mr-1 cursor-pointer" id="checkbox" label="Remember me" type="checkbox" name="checkbox" value="" checked={isRememberMe} onChange={(e) => setIsRememberMe(e.target.checked)}/>
            <SubmitButton className="my-8" isFormValid={isFormValid}>Sign In</SubmitButton>
            <p className="mb-8 text-center">Don’t have an account ? <Link className="text-red-500" href="/sign-up">Sign Up</Link></p>
        </Form>
    )
}