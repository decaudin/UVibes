import { FieldValues, UseFormRegister, Path } from "react-hook-form";
import { usePasswordToggle } from "@/hooks/passwordToggle";
import Input from "../../Input";
import EyeToggle from "@/components/ui/Auth/EyeToggle";
import { wrapperStyles, inputStyles, errorMessageStyles } from "@/styles/classNames";

interface PasswordInputProps<T extends FieldValues> {
    autoComplete: string;
    register: UseFormRegister<T>;
    errorMessage?: string | null;
}

export default function PasswordInput<T extends FieldValues>({ autoComplete, errorMessage, register }: PasswordInputProps<T>) {

    const { isPasswordVisible, togglePasswordVisibility } = usePasswordToggle();

    return (
        <div className="relative">
            <Input 
                id="password" type={isPasswordVisible ? "text" : "password"} label="Password :" 
                placeholder="Enter your password" autoComplete={autoComplete} errorMessage={errorMessage} 
                wrapperClassName={wrapperStyles} inputClassName={inputStyles} errorMessageClassName={errorMessageStyles}
                {...register('password' as Path<T>)}
            />
            <EyeToggle isVisible={isPasswordVisible} onToggle={togglePasswordVisibility} />
        </div>
    )
};