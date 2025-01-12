import React from "react";
import MainLayout from "../Layouts/MainLayout";
import { useTheme } from "../Contexts/ThemeContext";
import { useLanguage } from "../Contexts/LanguageContext";

export default function Settings() {
    const { theme, colorScheme, toggleTheme, changeColorScheme, themes, colorSchemes } = useTheme();
    const { language, changeLanguage, t } = useLanguage();

    const themeColors = {
        default: t.blue,
        galaxy: t.galaxy,
        ocean: t.ocean,
        sunset: t.sunset,
        forest: t.forest
    };

    const languages = {
        en: 'English',
        id: 'Bahasa Indonesia'
    };

    return (
        <MainLayout>
            <div className={`${themes[theme].card} rounded-lg shadow-lg p-6 max-w-2xl mx-auto`}>
                <h1 className={`text-2xl font-bold mb-6 ${themes[theme].text}`}>{t.settings}</h1>

                {/* Language Settings */}
                <div className="mb-8">
                    <h2 className={`text-xl font-semibold mb-4 ${themes[theme].text}`}>{t.language}</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {Object.entries(languages).map(([code, name]) => (
                            <button
                                key={code}
                                onClick={() => changeLanguage(code)}
                                className={`p-4 rounded-lg border-2 transition-all ${
                                    language === code
                                        ? `${colorSchemes[colorScheme].accent} border-current`
                                        : 'border-gray-200 dark:border-gray-700'
                                } ${themes[theme].text} ${themes[theme].card}`}
                            >
                                {name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Appearance Settings */}
                <div className="mb-8">
                    <h2 className={`text-xl font-semibold mb-4 ${themes[theme].text}`}>{t.appearance}</h2>
                    
                    {/* Mode Toggle */}
                    <div className="mb-6">
                        <h3 className={`text-lg font-medium mb-3 ${themes[theme].text}`}>{t.mode}</h3>
                        <button
                            onClick={toggleTheme}
                            className={`w-full p-4 rounded-lg border-2 transition-all ${themes[theme].text} ${themes[theme].card} ${
                                theme === 'dark' ? `${colorSchemes[colorScheme].accent} border-current` : 'border-gray-200'
                            }`}
                        >
                            <div className="flex items-center justify-between">
                                <span>{theme === 'light' ? t.light : t.dark}</span>
                                {theme === 'light' ? (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                ) : (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                    </svg>
                                )}
                            </div>
                        </button>
                    </div>

                    {/* Theme Selection */}
                    <div>
                        <h3 className={`text-lg font-medium mb-3 ${themes[theme].text}`}>{t.theme}</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {Object.entries(themeColors).map(([key, label]) => (
                                <button
                                    key={key}
                                    onClick={() => changeColorScheme(key)}
                                    className={`p-4 rounded-lg border-2 transition-all ${
                                        colorScheme === key
                                            ? `${colorSchemes[colorScheme].accent} border-current`
                                            : 'border-gray-200 dark:border-gray-700'
                                    } ${themes[theme].text} ${themes[theme].card}`}
                                >
                                    <div className={`h-2 rounded bg-gradient-to-r ${colorSchemes[key].primary} mb-2`} />
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
} 