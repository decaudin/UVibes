import { TFunction } from "@/types/i18n";
import { stripLocaleFromPath } from "@/utils/functions/nav/stripLocale";
import { baseNavLinks } from "@/utils/constants/baseNavLinks";

type GetNavListParams = {
    isLoggedIn: boolean;
    pathname: string;
    t: TFunction;
    locale: string;
    onSignOut?: () => void;
};

export const getNavList = ({ isLoggedIn, pathname, t, locale, onSignOut }: GetNavListParams) => {

    const cleanPath = stripLocaleFromPath(pathname);

    const mainLink = isLoggedIn 
        ?   {
                label: t("navDashboard", {}),
                href: `/${locale}/dashboard`,
                isActive: () => cleanPath === "/dashboard",
            }
        :   {
                label: t("navHome", {}),
                href: `/${locale}/`,
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
                href: `/${locale}/sign-in`,
                isActive: () => ["/sign-in", "/sign-up"].includes(cleanPath),
            };

    return [
        mainLink, 
        ...baseNavLinks(t, locale).map((link) => ({ ...link, isActive: (p: string) => link.isActive(stripLocaleFromPath(p)) })),
        authLink,
    ]
}