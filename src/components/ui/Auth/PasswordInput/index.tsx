import { UseFormRegister } from "react-hook-form";
import { FormData } from "@/app/(auth)/sign-up/page";
import { usePasswordToggle } from "@/hooks/passwordToggle";
import Input from "../../Input";
import EyeToggle from "@/components/ui/Auth/EyeToggle";

interface PasswordInputProps {
    autoComplete: string;
    register: UseFormRegister<FormData>;
    errorMessage?: string | null;
}

export default function PasswordInput({ autoComplete, errorMessage, register }: PasswordInputProps) {

    const { isPasswordVisible, togglePasswordVisibility } = usePasswordToggle();

    return (
        <div className="relative">
            <Input 
                id="password" type={isPasswordVisible ? "text" : "password"} label="Password :" 
                placeholder="Enter your password" autoComplete={autoComplete} errorMessage={errorMessage} 
                wrapperClassName="flex flex-col w-64 mb-10" inputClassName="h-8 rounded-lg shadow mt-1 pl-2" 
                {...register('password')}
            />
            <EyeToggle isVisible={isPasswordVisible} onToggle={togglePasswordVisibility} />
        </div>
    )
};