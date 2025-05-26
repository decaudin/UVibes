interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label: string;
    type: string;
    name: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    errorMessage?: string | null;
    wrapperClassName?: string;
    labelClassName?: string;
    inputClassName?: string;
}

export default function Input({ id, label, type, name, value, onChange, errorMessage, wrapperClassName = "", labelClassName = "", inputClassName = "", ...props }: InputProps) {
    
    return (
        <div className={wrapperClassName}>
            <label htmlFor={id} className={labelClassName}>
                {label}
            </label>
            <input id={id} name={name} type={type} value={value} onChange={onChange} className={`${inputClassName} ${errorMessage && 'border-2 border-red-500 focus:border-red-500'}`} {...props} />
            {errorMessage && <p className="text-sm text-red-500 w-64 mt-2">{errorMessage}</p>}
        </div>
    );
}