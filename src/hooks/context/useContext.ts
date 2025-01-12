import { useContext } from 'react';
import { ThemeContext } from '@/context/theme';

// HOOK POUR CONSOMMER LE CONTEXT DU THEME

export const useTheme = () => {
    const { theme, toggleTheme } = useContext(ThemeContext)
    return { theme, toggleTheme }
}