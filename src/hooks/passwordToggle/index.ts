"use client";
import { useState } from 'react';

export const usePasswordToggle = () => {

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prev) => !prev);
    };

    return { isPasswordVisible, togglePasswordVisibility };
}