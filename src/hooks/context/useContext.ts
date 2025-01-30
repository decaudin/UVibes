import { useContext } from 'react';
import { ThemeContext } from '@/context/theme';

export const useTheme = () => {
    const { theme, toggleTheme } = useContext(ThemeContext)
    return { theme, toggleTheme }
}