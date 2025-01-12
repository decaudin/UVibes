import React from "react";
import { FaSun, FaRegSadCry, FaRegSun } from "react-icons/fa";

const renderIcon = (IconComponent: React.ElementType, className: string) => {
    return React.createElement(IconComponent, { className });
};

export const getUvMessageAndIcon = (uvLevel: number) => {
    if (uvLevel >= 9) {
        return {
        message: "Extreme UV level, stay indoors if possible.",
        icon: renderIcon(FaRegSadCry, "text-red-500 text-4xl"),
        };
    } else if (uvLevel >= 7) {
        return {
        message: "Very high UV level, avoid being outside for long.",
        icon: renderIcon(FaSun, "text-yellow-500 text-4xl"),
        };
    } else if (uvLevel >= 5) {
        return {
        message: "High UV level, wear sunscreen and protective gear.",
        icon: renderIcon(FaRegSun, "text-orange-500 text-4xl"),
        };
    } else if (uvLevel >= 3) {
        return {
        message: "Moderate UV level, take precautions.",
        icon: renderIcon(FaRegSun, "text-yellow-300 text-4xl"),
        };
    } else {
        return {
        message: "Low UV level, safe to be outside.",
        icon: renderIcon(FaRegSun, "text-gray-300 text-4xl"),
        };
    }
};
