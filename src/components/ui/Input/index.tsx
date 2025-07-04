interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label: string;
    type: string;
    name: string;
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    errorMessage?: string | null;
    wrapperClassName?: string;
    labelClassName?: string;
    inputClassName?: string;
    errorMessageClassName?: string;
}

export default function Input({ id, label, type, name, value, onChange, errorMessage, wrapperClassName = "", labelClassName = "", inputClassName = "", errorMessageClassName = "", ...props }: InputProps) {
    
    return (
        <div className={wrapperClassName}>
            <label htmlFor={id} className={labelClassName}>
                {label}
            </label>
            <input id={id} name={name} type={type} value={value} onChange={onChange} className={`${inputClassName} ${errorMessage && 'border-2 border-red-500'}`} {...props} />
            {errorMessage && <p className={errorMessageClassName}>{errorMessage}</p>}
        </div>
    );
}