"use client"
import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";

interface PointModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    actionLabel: string;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    isDisabled: boolean;
    formClassName?: string;
}

export default function Modal({ isOpen, onClose, title, children, actionLabel, onSubmit, isDisabled, formClassName }: PointModalProps) {

    const t = useTranslations();

    const closeButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto"
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            closeButtonRef.current?.focus();
        }
    }, [isOpen]);


    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        }
            if (isOpen) {
                window.addEventListener("keydown", handleKeyDown)
        }
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            aria-modal="true"
            role="dialog"
            onClick={onClose}
            className="fixed inset-0 flex items-center justify-center z-[9999] p-4 bg-black bg-opacity-50 transition-opacity duration-300"
        >
            <div
                role="document"
                onClick={(e) => e.stopPropagation()}
                className="relative bg-white rounded-lg p-6 w-full max-w-md md:max-w-lg transform transition-transform duration-300 scale-95 opacity-0 animate-scale-in"
            >

                <button
                    aria-label="Close modal"
                    ref={closeButtonRef}
                    type="button"
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                    <X className="h-5 w-5" aria-hidden="true" />
                </button>

                <h2 className="text-2xl text-black mb-6">{title}</h2>

                <form onSubmit={onSubmit} className={formClassName}>
                    {children}

                    <div className="flex justify-end gap-3 mt-6">
                            <button
                                type="button"
                                className="min-w-[100px] px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300"
                                onClick={onClose}
                            >
                                {t("cancelModal")}
                            </button>
                            <button
                                type="submit"
                                disabled={isDisabled}
                                className={`min-w-[100px] px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                                {actionLabel}
                            </button>
                        </div>
                </form>
            </div>
        </div>
    )
}