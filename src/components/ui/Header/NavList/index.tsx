import Link from "next/link";
import { NavItems } from "@/types/nav";

type NavListProps = {
    navList: NavItems[];
    pathname: string;
    variant: "header" | "burger";
    onItemClick?: () => void;
}

export default function NavList({ navList, pathname, variant, onItemClick }: NavListProps) {

    const activeColor = "font-bold " + (variant === "header" ? "text-white" : "text-black");
    const inactiveColor = "text-blue-500";

    return (
        <>
            {navList.map(({ href, label, isActive, onClick }) => {
                const colorClass = isActive(pathname) ? activeColor : inactiveColor;

                const handleClick = () => {
                    onClick?.();
                    onItemClick?.();
                };

                if (!href && onClick) {
                    return (
                        <button key={label} onClick={handleClick} className={`flex items-start ${colorClass}`}>
                            {label}
                        </button>
                    );
                }

                return (
                    <Link key={label} onClick={handleClick} href={href} className={`${colorClass}`}>
                        {label}
                    </Link>
                )
            })}
        </>
    )
}