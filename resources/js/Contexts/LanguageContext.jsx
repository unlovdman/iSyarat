import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
    en: {
        // Navigation
        dashboard: 'Dashboard',
        camera: 'Camera',
        guide: 'Guide',
        history: 'History',
        settings: 'Settings',
        logout: 'Logout',
        startUsing: 'Start Using',

        // About Page
        aboutTitle: 'About iSyarat',
        aboutDesc: 'iSyarat is an innovative web application designed to help users recognize and understand Indonesian Sign Language (BISINDO) through real-time camera recognition.',
        whyTitle: 'Why iSyarat?',
        whyPoints: [
            'Easy-to-use interface for real-time sign language recognition',
            'Comprehensive guide for learning basic sign language gestures',
            'Track your learning progress with detailed history',
            'Customizable settings for better user experience'
        ],
        howItWorksTitle: 'How It Works',
        howItWorksDesc: 'Simply enable your camera, perform sign language gestures, and our advanced recognition system will interpret them in real-time. Practice and improve your sign language skills with immediate feedback.',
        featuresTitle: 'Main Features',
        features: {
            camera: {
                title: 'Real-time Recognition',
                desc: 'Advanced camera recognition for instant sign language interpretation'
            },
            history: {
                title: 'Learning History',
                desc: 'Track your progress and review past recognition sessions'
            },
            guide: {
                title: 'Complete Guide',
                desc: 'Learn basic to advanced sign language gestures with our comprehensive guide'
            },
            settings: {
                title: 'Customization',
                desc: 'Personalize your experience with theme and language settings'
            }
        }
    },
    id: {
        // Navigation
        dashboard: 'Beranda',
        camera: 'Kamera',
        guide: 'Panduan',
        history: 'Riwayat',
        settings: 'Pengaturan',
        logout: 'Keluar',
        startUsing: 'Mulai Sekarang',

        // About Page
        aboutTitle: 'Tentang iSyarat',
        aboutDesc: 'iSyarat adalah aplikasi web inovatif yang dirancang untuk membantu pengguna mengenali dan memahami Bahasa Isyarat Indonesia (BISINDO) melalui pengenalan kamera secara real-time.',
        whyTitle: 'Mengapa iSyarat?',
        whyPoints: [
            'Antarmuka yang mudah digunakan untuk pengenalan bahasa isyarat secara real-time',
            'Panduan lengkap untuk mempelajari gerakan bahasa isyarat dasar',
            'Lacak kemajuan belajar Anda dengan riwayat detail',
            'Pengaturan yang dapat disesuaikan untuk pengalaman pengguna yang lebih baik'
        ],
        howItWorksTitle: 'Cara Kerja',
        howItWorksDesc: 'Cukup aktifkan kamera Anda, lakukan gerakan bahasa isyarat, dan sistem pengenalan canggih kami akan menginterpretasikannya secara real-time. Latih dan tingkatkan keterampilan bahasa isyarat Anda dengan umpan balik langsung.',
        featuresTitle: 'Fitur Utama',
        features: {
            camera: {
                title: 'Pengenalan Real-time',
                desc: 'Pengenalan kamera canggih untuk interpretasi bahasa isyarat secara instan'
            },
            history: {
                title: 'Riwayat Pembelajaran',
                desc: 'Pantau kemajuan dan tinjau sesi pengenalan sebelumnya'
            },
            guide: {
                title: 'Panduan Lengkap',
                desc: 'Pelajari gerakan bahasa isyarat dari dasar hingga mahir dengan panduan komprehensif kami'
            },
            settings: {
                title: 'Kustomisasi',
                desc: 'Personalisasi pengalaman Anda dengan pengaturan tema dan bahasa'
            }
        }
    }
};

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState(() => {
        const savedLanguage = localStorage.getItem('language');
        return savedLanguage || 'id';
    });

    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);

    const changeLanguage = (newLanguage) => {
        setLanguage(newLanguage);
    };

    const t = translations[language];

    return (
        <LanguageContext.Provider value={{ language, changeLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
} 