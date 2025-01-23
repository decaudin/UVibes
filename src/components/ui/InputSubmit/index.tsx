type InputSubmitProps = {
    value: string;
    isFormValid: boolean;
    className?: string;
};

export default function InputSubmit({ value, isFormValid, className = "" }: InputSubmitProps) {

    return (
        <input
            className={`flex mx-auto rounded-lg shadow py-1 px-4 cursor-pointer ${isFormValid ? "bg-blue-300 text-black" : "bg-gray-500 text-white"} ${className}`}
            type="submit"
            value={value}
        />
    );
};
  