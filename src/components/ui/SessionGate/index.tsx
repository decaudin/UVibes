"use client";
import { ReactNode, useState, useEffect } from "react";
import { useUserStore } from "@/stores/userStore";
import { useRouter, usePathname } from "next/navigation";
import Loader from "../animations/Loader";

type Props = {
    children: ReactNode;
};

export default function SessionGate({ children }: Props) {

    const { user, setUser, status, setStatus, justLoggedOut } = useUserStore();
    const router = useRouter();
    const pathname = usePathname();

    const [ready, setReady] = useState(false);

    const privatePaths = ["/dashboard"];
    const isPrivatePage = privatePaths.some((p) => pathname.startsWith(p));
    const isAuthBlockedPage = ["/", "/sign-in", "/sign-up"].includes(pathname);

    useEffect(() => {
        if (status !== "idle") return;

        if (!isPrivatePage) {
            setStatus("fetched");
            setReady(true);
            return;
        }

        const fetchUser = async () => {
            setStatus("loading");
            try {
                const res = await fetch("/api/user/me", { credentials: "include" });

                if (res.status === 401) {
                    setUser(null);
                    router.push("/sign-in");
                    return;
                }

                if (res.ok) {
                    const data = await res.json();
                    setUser(data.user);
                } else {
                    console.warn("Unexpected response:", res.status);
                    setUser(null);
                    router.push("/sign-in");
                    return;
                }
            } catch (error) {
                console.error("Network or parsing error while fetching /api/user/me:", error);
                setUser(null);
                router.push("/sign-in");
                return;
            } finally {
                setStatus("fetched");
            }
        };

        fetchUser();
    }, [status, user, setUser, setStatus, router, pathname, isPrivatePage]);

    useEffect(() => {
        if (status !== "fetched") return;

        if (user && isAuthBlockedPage) {
            router.push("/dashboard");
            return;
        }

        if (!user && isPrivatePage) {
            if (justLoggedOut) {
                router.push("/");
            } else {
                router.push("/sign-in");
            }
            return;
        }

        setReady(true);
    }, [status, user, pathname, router, isPrivatePage, justLoggedOut, isAuthBlockedPage]);

    if (status === "loading" || !ready || (user && (pathname === "/" || pathname === "/sign-up"))) {
        return (
            <div className="h-screen w-full flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    return <>{children}</>;
}