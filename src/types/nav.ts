export type NavItems = {
    label: string;
    href: string;
    isActive: (pathname: string) => boolean;
    onClick?: () => void;
}