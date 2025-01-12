import React from 'react';
import { Link } from '@inertiajs/react';
import { useTheme } from '../Contexts/ThemeContext';
import { useLanguage } from '../Contexts/LanguageContext';

export default function About() {
    const { theme, themes } = useTheme();
    const { t } = useLanguage();

    return (
        <div className={`min-h-screen ${themes[theme].background}`}>
            {/* Navigation */}
            <nav className={`fixed top-0 w-full z-50 ${themes[theme].navbar} shadow-md`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link href="/" className="text-2xl font-bold text-blue-600">
                                iSyarat
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/dashboard"
                                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                            >
                                {t.startUsing}
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="pt-20 pb-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`${themes[theme].card} rounded-lg shadow-lg p-8 mb-8`}>
                        <h1 className={`text-3xl font-bold mb-6 ${themes[theme].text}`}>
                            {t.aboutTitle}
                        </h1>
                        
                        <div className={`space-y-8 ${themes[theme].text}`}>
                            <p className="text-lg">
                                {t.aboutDesc}
                            </p>

                            <div>
                                <h2 className="text-2xl font-semibold mb-4">{t.whyTitle}</h2>
                                <ul className="list-disc pl-6 space-y-2">
                                    {t.whyPoints.map((point, index) => (
                                        <li key={index}>{point}</li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-2xl font-semibold mb-4">{t.howItWorksTitle}</h2>
                                <p>{t.howItWorksDesc}</p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-semibold mb-4">{t.featuresTitle}</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className={`p-4 rounded-lg ${themes[theme].card} shadow-md`}>
                                        <h3 className="text-lg font-semibold mb-2">{t.features.camera.title}</h3>
                                        <p>{t.features.camera.desc}</p>
                                    </div>
                                    <div className={`p-4 rounded-lg ${themes[theme].card} shadow-md`}>
                                        <h3 className="text-lg font-semibold mb-2">{t.features.history.title}</h3>
                                        <p>{t.features.history.desc}</p>
                                    </div>
                                    <div className={`p-4 rounded-lg ${themes[theme].card} shadow-md`}>
                                        <h3 className="text-lg font-semibold mb-2">{t.features.guide.title}</h3>
                                        <p>{t.features.guide.desc}</p>
                                    </div>
                                    <div className={`p-4 rounded-lg ${themes[theme].card} shadow-md`}>
                                        <h3 className="text-lg font-semibold mb-2">{t.features.settings.title}</h3>
                                        <p>{t.features.settings.desc}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
} 