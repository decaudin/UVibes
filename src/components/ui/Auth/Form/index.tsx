interface FormProps {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    title: string;
    children: React.ReactNode;
}

export default function Form({ onSubmit, title, children }: FormProps) {

    return (
        <form onSubmit={onSubmit} className="flex flex-col items-center w-full xs:w-3/5 mx-auto border-2 border-gray-400 my-12 rounded-lg shadow-md">
            <h1 className="text-4xl my-12 font-bold">{title}</h1>
            {children}
        </form>
    );
}