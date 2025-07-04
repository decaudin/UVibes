import { TFunction } from "@/types/i18n";
import { stripLocaleFromPath } from "@/utils/functions/nav/stripLocale";
import { baseNavLinks } from "@/utils/constants/baseNavLinks";

type GetNavListParams = {
    isLoggedIn: boolean;
    pathname: string;
    t: TFunction;
    onSignOut?: () => void;
};

export const getNavList = ({ isLoggedIn, pathname, t, onSignOut }: GetNavListParams) => {

    const cleanPath = stripLocaleFromPath(pathname);

    const mainLink = isLoggedIn 
        ?   {
                label: t("navDashboard", {}),
                href: "/dashboard",
                isActive: () => cleanPath === "/dashboard",
            }
        :   {
                label: t("navHome", {}),
                href: "/",
                isActive: () => cleanPath === "/",
            };

    const authLink = isLoggedIn 
        ?   {
                label: t("navSignOut", {}),
                href: "",
                isActive: () => false,
                onClick: onSignOut,
            }
        :   {
                label: t("navAccount", {}),
                href: "/sign-in",
                isActive: () => ["/sign-in", "/sign-up"].includes(cleanPath),
            };

    return [
        mainLink, 
        ...baseNavLinks(t).map((link) => ({ ...link, isActive: (p: string) => link.isActive(stripLocaleFromPath(p)) })),
        authLink,
    ]
}