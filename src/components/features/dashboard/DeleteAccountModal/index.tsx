import type { DeleteAccountFormData } from "@/schemas/deleteAccountSchema";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { deleteAccountSchema } from "@/schemas/deleteAccountSchema";
import Modal from "@/components/ui/Modal";
import GoogleLogo from "@/components/ui/auth/GoogleLogo";
import PasswordInput from "@/components/ui/auth/PasswordInput";

interface DeleteAccountModalProps {
    isOpen: boolean;
    isLoading: boolean;
    onClose: () => void;
    hasPassword: boolean;
}

export default function DeleteAccountModal({ isOpen, isLoading, onClose, hasPassword }: DeleteAccountModalProps) {

    const t = useTranslations();

    const { register, handleSubmit, formState: { errors }, watch } = useForm<DeleteAccountFormData>({
        resolver: zodResolver(deleteAccountSchema),
        mode: "onBlur",
        shouldFocusError: false,
    });

    const formValues = watch();

    const isValid = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=.]).{8,}$/.test(formValues.password);

    const onSubmit = () => {
        console.log("in progress");
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}    
            title={"⚠️ " + t("deleteAccount")}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={hasPassword ? t("deleteWithPassword") : (
                <span className="inline-flex items-center gap-4">
                    <GoogleLogo />
                    {t("reconnectWithGoogle")}
                </span>
            )}
            isDisabled={isLoading || (hasPassword && !isValid)}
        >
            <p className="text-gray-700 mb-8">{t("deleteAccountWarning")}</p>
            <p className="text-gray-700 mb-12">{hasPassword ? t("deleteAccountPasswordRequired") : t("deleteAccountNoPasswordRequired")}</p>
            {hasPassword &&
                <PasswordInput
                    name="password" label={t("label.password")} placeholder={t("authPlaceholders.password")}
                    register={register} autoComplete="new-password" error={errors.password}
                    containerClassName= "w-64 xxs:w-80 mx-auto text-gray-700" wrapperClassName="mb-16"
                />
            }
        </Modal>
    )
}