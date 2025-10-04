import { useTranslations } from "next-intl";
import Modal from "@/components/ui/Modal";

interface PointModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function PointModal({ isOpen, onClose }: PointModalProps) {

    const t = useTranslations();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("add point successfully");
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={t("addPoint")} actionLabel={t("addModal")} onSubmit={handleSubmit} isDisabled={true} formClassName="flex flex-col gap-5">
                <input id="name" type="text" placeholder={t("pointName")} className="border p-2 rounded" />
                <input id= "latitude" type="text" placeholder="Latitude" className="border p-2 rounded" />
                <input id="longitude" type="text" placeholder="Longitude" className="border p-2 rounded" />
                <input id="altitude" type="text" placeholder="Altitude" className="border p-2 rounded" />
        </Modal>
    )
}