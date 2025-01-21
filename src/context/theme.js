"use client";
import { useState, createContext, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {

    const [theme, setTheme] = useState('light');

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    };

    return (
        <ThemeContext value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext>
    )
}

// CODE TYPESCRIPT NON FONCTIONNEL

// "use client";
// import { useState, createContext, useEffect, ReactNode, JSX } from "react";

// interface ThemeContextType {
//     theme: 'light' | 'dark';
//     toggleTheme: () => void;
// }

// export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// interface ThemeProviderProps {
//     children: ReactNode;
// }

// export const ThemeProvider = ({ children }: ThemeProviderProps): JSX.Element => {

//     const [theme, setTheme] = useState<'light' | 'dark'>('light');

//     useEffect(() => {
//         if (theme === 'dark') {
//             document.documentElement.classList.add('dark');
//         } else {
//             document.documentElement.classList.remove('dark');
//         }
//     }, [theme]);

//     const toggleTheme = () => {
//         setTheme(theme === 'light' ? 'dark' : 'light');
//     };

//     return (
//         <ThemeContext value={{ theme, toggleTheme }}>
//             {children}
//         </ThemeContext>
//     );
// };

