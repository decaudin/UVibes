"use client"
interface ToggleButtonsProps<T extends string> {
    options: { key: T; label: string; icon?: string }[];
    selected: T;
    onSelect: (value: T) => void;
}

export default function ToggleButtons<T extends string>({ options, selected, onSelect }: ToggleButtonsProps<T>) {
    
    const getButtonClass = (key: T) =>
        `flex-1 text-center h-10 rounded-full font-medium transition-colors ${
        selected === key ? "bg-sky-700 text-white shadow-md" : "text-gray-700 hover:bg-gray-300"
        }`;

    return (
        <div className="flex gap-2 bg-gray-200 rounded-full p-1 mb-16 w-full max-w-[90%] xxs:max-w-xs">
            {options.map(({ key, label, icon }) => (
                <button
                    key={key}
                    type="button"
                    onClick={() => onSelect(key)}
                    className={`${getButtonClass(key)} text-sm xxs:text-base`}
                >
                    {icon} {label}
                </button>
            ))}
        </div>
    )
}