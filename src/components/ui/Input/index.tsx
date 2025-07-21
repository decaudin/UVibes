import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label: string;
    type: string;
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    errorMessage?: string | null;
    wrapperClassName?: string;
    labelClassName?: string;
    inputClassName?: string;
    errorMessageClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ id, label, type, value, onChange, onBlur, errorMessage, wrapperClassName = "", labelClassName = "", inputClassName = "", errorMessageClassName = "", ...props }, ref) {

    return (
        <div className={wrapperClassName}>
            <label htmlFor={id} className={labelClassName}>
                {label}
            </label>
            <input 
                id={id} type={type} value={value} onChange={onChange} onBlur={onBlur} 
                className={`${inputClassName} ${errorMessage ? 'border-2 border-red-500' : ''}`}
                ref={ref} {...props}
            />
            {errorMessage && <p className={errorMessageClassName}>{errorMessage}</p>}
        </div>
    )
})