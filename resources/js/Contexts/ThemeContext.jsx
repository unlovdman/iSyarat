import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = {
    light: {
        background: 'bg-gray-100',
        text: 'text-gray-700',
        card: 'bg-white',
        sidebar: 'bg-white',
        navbar: 'bg-white/80'
    },
    dark: {
        background: 'bg-gray-900',
        text: 'text-gray-200',
        card: 'bg-gray-800',
        sidebar: 'bg-gray-800',
        navbar: 'bg-gray-800/80'
    }
};

export const colorSchemes = {
    default: {
        primary: 'from-blue-600 to-blue-800',
        secondary: 'from-blue-400 to-blue-600',
        accent: 'text-blue-600'
    },
    galaxy: {
        primary: 'from-purple-600 to-indigo-800',
        secondary: 'from-purple-400 to-indigo-600',
        accent: 'text-purple-600'
    },
    ocean: {
        primary: 'from-cyan-600 to-blue-800',
        secondary: 'from-cyan-400 to-blue-600',
        accent: 'text-cyan-600'
    },
    sunset: {
        primary: 'from-orange-600 to-red-800',
        secondary: 'from-orange-400 to-red-600',
        accent: 'text-orange-600'
    },
    forest: {
        primary: 'from-green-600 to-emerald-800',
        secondary: 'from-green-400 to-emerald-600',
        accent: 'text-green-600'
    }
};

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme || 'light';
    });

    const [colorScheme, setColorScheme] = useState(() => {
        const savedColorScheme = localStorage.getItem('colorScheme');
        return savedColorScheme || 'default';
    });

    useEffect(() => {
        localStorage.setItem('theme', theme);
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    useEffect(() => {
        localStorage.setItem('colorScheme', colorScheme);
    }, [colorScheme]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    const changeColorScheme = (newScheme) => {
        setColorScheme(newScheme);
    };

    const value = {
        theme,
        colorScheme,
        toggleTheme,
        changeColorScheme,
        themes,
        colorSchemes
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
} 