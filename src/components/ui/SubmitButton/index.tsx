type SubmitButtonProps = {
    children: React.ReactNode;
    isFormValid: boolean;
    isLoading?: boolean;
    className?: string;
};

export default function SubmitButton({ children, isFormValid, isLoading, className = "" }: SubmitButtonProps) {

    return (
        <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className={`flex mx-auto rounded-lg shadow py-1 px-4 ${isFormValid ? "bg-blue-300 text-black cursor-pointer hover:bg-blue-400" : "bg-gray-500 text-white cursor-not-allowed"} ${isLoading && "cursor-not-allowed"} ${className}`}
        >
            {children}
        </button>
    );
}