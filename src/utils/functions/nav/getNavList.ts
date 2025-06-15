import { baseNavLinks } from "@/utils/constants/navLinksBase";

type GetNavListParams = {
    isLoggedIn: boolean;
    onSignOut?: () => void;
}

export const getNavList = ({ isLoggedIn, onSignOut }: GetNavListParams) => {
    const mainLink = isLoggedIn ? { label: "Dashboard", href: "/dashboard", isActive: (p:string) => p === "/dashboard" } : { label: "Home", href: "/", isActive: (p:string) => p === "/" };

    const authLink = isLoggedIn ? { label: "Sign Out", href: "", isActive: () => false, onClick: onSignOut } : { label: "Account", href: "/sign-in", isActive: (p: string) => p === "/sign-in" || p === "/sign-up" };

    return [mainLink, ...baseNavLinks, authLink];
}