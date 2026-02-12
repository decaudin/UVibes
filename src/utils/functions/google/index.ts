import { toast} from "sonner";

export const openGooglePopup = (url: string, t: (key: string) => string, state?: string) => {
    try {
        const width = 600;
        const height = 700;
        const left = (window.innerWidth - width) / 2;
        const top = (window.innerHeight - height) / 2;

        const popupUrl = new URL(url, window.location.origin);
        if (state) popupUrl.searchParams.set("state", state);

        const googleWindow = window.open(
            popupUrl.toString(),
            'Google OAuth',
            `width=${width},height=${height},top=${top},left=${left}`
        );

        if (!googleWindow) throw new Error();
    } catch {
        toast.error(t("signInGoogleErrorToast"));
    }
}