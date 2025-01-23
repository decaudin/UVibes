interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label: string;
    type: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    wrapperClassName?: string;
    labelClassName?: string;
    inputClassName?: string;
}

export default function Input({ id, label, type, name, value, onChange, wrapperClassName = "", labelClassName = "", inputClassName = "", ...props }: InputProps) {
    
    return (
        <div className={wrapperClassName}>
            <label htmlFor={id} className={labelClassName}>
                {label}
            </label>
            <input type={type} id={id} name={name} value={value} onChange={onChange} className={inputClassName} {...props} />
        </div>
    );
}

  