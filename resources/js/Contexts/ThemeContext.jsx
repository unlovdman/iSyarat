import React, { createContext, useState, useEffect, useCallback } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [themeColor, setThemeColor] = useState(localStorage.getItem('themeColor') || 'blue');
    
    const getThemeGradients = useCallback((color) => {
        const gradients = {
            blue: {
                start: '#1E40AF',
                end: '#3B82F6',
                solid: '#2563EB'
            },
            green: {
                start: '#047857',
                end: '#10B981',
                solid: '#059669'
            },
            purple: {
                start: '#6D28D9',
                end: '#8B5CF6',
                solid: '#7C3AED'
            },
            red: {
                start: '#B91C1C',
                end: '#EF4444',
                solid: '#DC2626'
            }
        };
        return gradients[color] || gradients.blue;
    }, []);

    const applyTheme = useCallback((newTheme, newColor) => {
        // Handle dark/light theme
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light');
        } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
        }

        // Handle theme color
        const gradients = getThemeGradients(newColor);
        document.documentElement.style.setProperty('--gradient-start', gradients.start);
        document.documentElement.style.setProperty('--gradient-end', gradients.end);
        document.documentElement.style.setProperty('--theme-color', gradients.solid);
    }, [getThemeGradients]);

    // Initial theme application
    useEffect(() => {
        applyTheme(theme, themeColor);
    }, []);

    const handleThemeChange = useCallback((newTheme) => {
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme, themeColor);
    }, [themeColor, applyTheme]);

    const handleColorChange = useCallback((newColor) => {
        setThemeColor(newColor);
        localStorage.setItem('themeColor', newColor);
        applyTheme(theme, newColor);
    }, [theme, applyTheme]);

    return (
        <ThemeContext.Provider value={{ 
            theme, 
            themeColor, 
            setTheme: handleThemeChange,
            setThemeColor: handleColorChange
        }}>
            {children}
        </ThemeContext.Provider>
    );
}; 