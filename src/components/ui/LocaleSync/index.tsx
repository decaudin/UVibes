"use client";
import { useEffect } from "react";

type Props = { locale: "fr" | "en" };

export default function LocaleSync({ locale }: Props) {

    useEffect(() => {
        localStorage.setItem("locale", locale);
    }, [locale]);

    return null
}