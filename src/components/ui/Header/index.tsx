"use client";
import { useNavigationItems } from "@/hooks/navigation";
import { useUserStore } from "@/stores/userStore";
import NavList from "./NavList";
import BurgerMenu from "./BurgerMenu";

export default function Header() {

    const { pathname, navList } = useNavigationItems();
    const user = useUserStore((state) => state.user);

    const navWidth = user ? "w-[374px]" : "w-[335px]";

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