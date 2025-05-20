import { useState } from "react";
import { X, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/utils/constants/navLinks";

export default function BurgerMenu() {
    
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const iconClass = "w-6 h-6 text-black"

    const toggleMenu = () => setIsOpen(prev => !prev);
    const closeMenu = () => setIsOpen(false);

    return (
        <>
            <button
                onClick={toggleMenu}
                className="fixed -translate-y-1/2 right-4 z-[100] p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition"
                aria-label="Toggle menu"
            >
                {isOpen ? <X className={iconClass} /> : <Menu className={iconClass} />}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            onClick={closeMenu}
                            className="fixed inset-0 bg-black bg-opacity-40 z-40"                        
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        />

                        <motion.div
                            className="fixed top-0 right-0 w-56 h-full bg-white shadow-lg z-50 p-6 xs:w-64"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "tween" }}
                        >

                            <h2 className="sr-only">Menu</h2>
                            <ul className="space-y-4 mt-12">
                                {navLinks.map(({ href, label, isActive }) => (
                                    <li key={href}>
                                        <Link
                                            href={href}
                                            onClick={closeMenu}
                                            className={`block text-base ${isActive(pathname) ? "text-black font-bold" : "text-blue-500"}`}
                                        >
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}