"use client";
import { useParams } from "next/navigation";
import { useNavigationItems } from "@/hooks/navigation";
import { useUserStore } from "@/stores/userStore";
import NavList from "./NavList";
import BurgerMenu from "./BurgerMenu";

export default function Header() {

    const params = useParams();
    const locale = params.locale || "en";

    const { pathname, navList } = useNavigationItems();
    const user = useUserStore((state) => state.user);

    const navWidth = user ? locale === "fr" ? "w-[399px]" : "w-[379px]" : locale === "fr" ? "w-[357px]" : "w-[340px]";

    return (
        <header className="bg-black h-16 flex justify-center items-center">
            <nav className={`hidden md:flex gap-4 justify-between ${navWidth}`}>
                <NavList navList={navList} pathname={pathname} variant="header" />
            </nav>
            <div className="md:hidden">
                <BurgerMenu />
            </div>
        </header>
    )
}