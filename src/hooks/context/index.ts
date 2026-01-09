import { useContext } from 'react';
import { ThemeContext } from '@/contexts/themeContext';

export const useTheme = () => {

    const context = useContext(ThemeContext);

    if (!context) throw new Error("useTheme() must be called within a <ThemeProvider>.");

    const { theme, toggleTheme } = context;

    return { theme, toggleTheme };
}