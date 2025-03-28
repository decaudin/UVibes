import { usePasswordToggle } from "@/hooks/passwordToggle";
import Input from "../Input";
import EyeToggle from "@/components/ui/EyeToggle";

interface PasswordInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PasswordInput({ value, onChange }: PasswordInputProps) {

    const { isPasswordVisible, togglePasswordVisibility } = usePasswordToggle();

    return (
        <div className="relative">
            <Input wrapperClassName="flex flex-col w-64 mb-10" inputClassName="h-8 rounded-lg shadow mt-1 pl-2" id="password" label="Password" placeholder="Enter your password" type={isPasswordVisible ? "text" : "password"} name="password" value={value} onChange={onChange} />
            <EyeToggle isVisible={isPasswordVisible} onToggle={togglePasswordVisibility} />
        </div>
    )
}