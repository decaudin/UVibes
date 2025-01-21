interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  wrapperClassName?: string;
  inputClassName?: string;
}

export default function Input({ id, label, type, name, value, onChange, wrapperClassName = "", inputClassName = "", ...props }: InputProps) {
    
    return (
        <div className={wrapperClassName}>
          <label htmlFor={id}>
            {label}
          </label>
          <input type={type} id={id} name={name} value={value} onChange={onChange} className={inputClassName} {...props} />
        </div>
    );
}

  