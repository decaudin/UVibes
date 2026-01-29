import type { DeleteAccountFormData } from "@/schemas/deleteAccountSchema";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { deleteAccountSchema } from "@/schemas/deleteAccountSchema";
import { useUserStore } from "@/stores/userStore";
import Modal from "@/components/ui/Modal";
import ButtonSpinner from "@/components/ui/animations/ButtonSpinner";
import GoogleLogo from "@/components/ui/auth/GoogleLogo";
import PasswordInput from "@/components/ui/auth/PasswordInput";

interface DeleteAccountModalProps {
    isOpen: boolean;
    isLoading: boolean;
    setIsLoading: (value: boolean) => void;
    onClose: () => void;
    hasPassword: boolean;
}

export default function DeleteAccountModal({ isOpen, isLoading, setIsLoading, onClose, hasPassword }: DeleteAccountModalProps) {

    const router = useRouter();

    const t = useTranslations();

    const { register, handleSubmit, formState: { errors }, watch } = useForm<DeleteAccountFormData>({
        resolver: zodResolver(deleteAccountSchema),
        mode: "onBlur",
        shouldFocusError: false,
    });

    const formValues = watch();

    const isValid = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=.]).{8,}$/.test(formValues.password);

    const deleteWithPassword = async (data: DeleteAccountFormData) => {
        setIsLoading(true);

        try {
            const res = await fetch("/api/delete-account", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const { code } = await res.json();
                const fallbackMsg = t("deleteAccountError");
                const translatedMsg = code ? t(code) : fallbackMsg;

                if (code === "INVALID_TOKEN" || code === "UNAUTHORIZED") {
                    useUserStore.getState().clearUser();
                    toast.error(t(code), { className: "sonner-toast" });
                    router.push("/sign-in");
                    return false;
                }
                throw new Error(translatedMsg);
            }

            toast.success(t("deleteAccountSuccess"), { className: "sonner-toast" });

            onClose();
            useUserStore.getState().clearUser();
            router.push("/sign-in");

        } catch (error) {
            const message = error instanceof Error ? error.message : t("unknownError");

            toast.error(message, { className: "sonner-toast" });
        } finally {
            setIsLoading(false);
        }
    };

    const deleteWithGoogle = async () => {
        console.log("in progress")
    };

    const onSubmit = async (data: DeleteAccountFormData) => {

        if (!hasPassword) {
            await deleteWithGoogle();
            return;
        }

        await deleteWithPassword(data);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}    
            title={"⚠️ " + t("deleteAccount")}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={isLoading ? <ButtonSpinner /> : hasPassword ? t("deleteWithPassword") :
                <span className="inline-flex items-center gap-4">
                    <GoogleLogo />
                    {t("reconnectWithGoogle")}
                </span>
            }
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