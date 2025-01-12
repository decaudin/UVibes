interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
    id: string;
    label: string;
    type: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ id, label, type, name, value, onChange, ...props }: InputProps ){

    return (
        <div className="flex flex-col w-36 mb-10 mx-auto">
            <label htmlFor={id}>{label}</label>
            <input className="h-8 rounded-lg shadow mt-2" type={type} id={id} name={name} value={value} onChange={onChange} {...props}/>
        </div>
    )
};