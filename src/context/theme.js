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

// import { useState, createContext, ReactNode } from "react";

// interface ThemeContextType {
//     theme: 'light' | 'dark'; 
//     toggleTheme: () => void;
// }

// export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// interface ThemeProviderProps {
//     children: ReactNode;
// }

// export const ThemeProvider = ({ children }: ThemeProviderProps) => {
//     const [theme, setTheme] = useState<'light' | 'dark'>('light')
//     const toggleTheme = () => {
//         setTheme(theme === 'light' ? 'dark' : 'light')
//     }

//     return (
//         <ThemeContext.Provider value={{ theme, toggleTheme }}>
//             {children}
//         </ThemeContext.Provider>
//     )
// }
