import type { UseFormRegister, FieldErrors, UseFormWatch, UseFormHandleSubmit } from "react-hook-form";
import type { PointFormData } from "@/schemas/pointSchema";
import { useTranslations } from "next-intl";
import { useZodErrorMessage } from "@/hooks/zod";
import Modal from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import ButtonSpinner from "@/components/ui/animations/ButtonSpinner"; 
import { errorMessageStyles } from "@/styles/classNames";

interface PointModalProps {
    isOpen: boolean;
    isLoading: boolean;
    onClose: () => void;
    handleSubmit: ReturnType<UseFormHandleSubmit<PointFormData>>;
    register: UseFormRegister<PointFormData>;
    errors: FieldErrors<PointFormData>;
    watch: UseFormWatch<PointFormData>;
    title: string;
    actionLabel: React.ReactNode;
}

export default function PointModal({ isOpen, isLoading, onClose, handleSubmit, register, errors, watch, title, actionLabel }: PointModalProps) {

    const t = useTranslations();

    const getZodErrorMessage = useZodErrorMessage();

    const formValues = watch();

    const isValid =
        !!formValues.name?.trim()&&

        formValues.latitude && !isNaN(Number(formValues.latitude)) &&
        Number(formValues.latitude) >= -90 && Number(formValues.latitude) <= 90 &&

        formValues.longitude && !isNaN(Number(formValues.longitude)) &&
        Number(formValues.longitude) >= -180 && Number(formValues.longitude) <= 180;

    const fields: { id: "name" | "latitude" | "longitude" | "altitude" ; labelKey: string }[] = [
        { id: "name", labelKey: "namePlaceholder" },
        { id: "latitude", labelKey: "latitudePlaceholder" },
        { id: "longitude", labelKey: "longitudePlaceholder" },
        { id: "altitude", labelKey: "altitudePlaceholder" },
    ];

    return (
        <Modal
            isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}
            title={title} actionLabel={isLoading ? <ButtonSpinner /> : actionLabel}
            isDisabled={!isValid || isLoading} formClassName="flex flex-col gap-5"
        >
            {fields.map(({ id, labelKey }) => (
                <Input
                    key={id} id={id} type={id === "name" ? "text" : "number"} step={id === "name" ? undefined : "any"} 
                    label={t(labelKey)} placeholder={t(labelKey)} errorMessage={getZodErrorMessage(errors[id])}
                    labelClassName="sr-only" inputClassName="w-full border p-2 my-2 rounded" errorMessageClassName={errorMessageStyles}
                    {...register(id)}
                />
            ))}
        </Modal>
    )
}