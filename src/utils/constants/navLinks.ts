type NavLink = {
    label: string;
    href: string;
    isActive: (pathname: string) => boolean;
    className?: string;
};

export const navLinks: NavLink[] = [
    {
        label: "Home",
        href: "/",
        isActive: (pathname) => pathname === "/",
    },
    {
        label: "About",
        href: "/about",
        isActive: (pathname) => pathname === "/about",
        className: "mx-4 xxs:mx-5",
    },
    {
        label: "Uv-check",
        href: "/uv-check",
        isActive: (pathname) => pathname.startsWith("/uv-check"),
    },
    {
        label: "Contact",
        href: "/contact",
        isActive: (pathname) => pathname === "/contact",
        className: "mx-4 xxs:mx-5",
    },
    {
        label: "Sign In",
        href: "/sign-in",
        isActive: (pathname) => pathname === "/sign-in" || pathname === "/sign-up",
    },
]