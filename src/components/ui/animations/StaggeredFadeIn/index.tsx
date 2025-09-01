"use client"
import React, { JSX } from "react";
import { motion, Transition } from "framer-motion";

type StaggeredFadeInProps<T extends keyof JSX.IntrinsicElements = "div"> = {
    children: React.ReactNode;
    className?: string;
    as?: T;
};

const container = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.2 } as Transition,
    },
};

const item = {
    hidden: { opacity: 0, y: -20 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.65, 0, 0.35, 1],
        } as Transition,
    },
};

export default function StaggeredFadeIn<T extends keyof JSX.IntrinsicElements = "div">({ children, className, as }: StaggeredFadeInProps<T>) {

    const tag = as || "div";

    const MotionTag = motion.create(tag) as unknown as typeof motion.div;

    const finalClassName = tag === "ul" ? `space-y-2 ${className ?? ""}` : className;

    return (
        <MotionTag
            variants={container}
            initial="hidden"
            animate="show"
            className={finalClassName}
        >
            {React.Children.map(children, (child, i) => {
                const MotionChild = tag === "ul" ? motion.li : motion.div;

                return (
                    <MotionChild key={i} variants={item}>
                        {child}
                    </MotionChild>
                )
            })}
        </MotionTag>
    )
}