import React, { useState, useEffect, useContext } from 'react';
import MainLayout from '../Layouts/MainLayout';
import { ThemeContext } from '../Contexts/ThemeContext';

export default function Settings() {
    const [devices, setDevices] = useState([]);
    const [selectedDevice, setSelectedDevice] = useState(localStorage.getItem('selectedCamera') || '');
    const [error, setError] = useState(null);
    const [language, setLanguage] = useState(localStorage.getItem('language') || 'id');
    const { theme, setTheme, themeColor, setThemeColor } = useContext(ThemeContext);

    useEffect(() => {
        // Initialize settings from localStorage with defaults
        const savedLanguage = localStorage.getItem('language') || 'id';
        const savedTheme = localStorage.getItem('theme') || 'light';
        const savedThemeColor = localStorage.getItem('themeColor') || 'blue';
        
        setLanguage(savedLanguage);
        setTheme(savedTheme);
        setThemeColor(savedThemeColor);
    }, []);

    useEffect(() => {
        // Get list of video input devices
        const getDevices = async () => {
            try {
                const devices = await navigator.mediaDevices.enumerateDevices();
                const videoDevices = devices.filter(device => device.kind === 'videoinput');
                setDevices(videoDevices);
                
                // If no camera is selected, select the first one
                if (!selectedDevice && videoDevices.length > 0) {
                    setSelectedDevice(videoDevices[0].deviceId);
                    localStorage.setItem('selectedCamera', videoDevices[0].deviceId);
                }
            } catch (err) {
                setError('Gagal mendapatkan daftar kamera. ' + err.message);
            }
        };

        getDevices();
    }, []);

    const handleDeviceChange = (deviceId) => {
        setSelectedDevice(deviceId);
        localStorage.setItem('selectedCamera', deviceId);
    };

    const handleLanguageChange = (lang) => {
        setLanguage(lang);
        localStorage.setItem('language', lang);
    };

    const handleThemeChange = (newTheme) => {
        setTheme(newTheme);
    };

    const handleThemeColorChange = (color) => {
        setThemeColor(color);
    };

    return (
        <MainLayout>
            <div className={`max-w-5xl mx-auto ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-6`}>
                    <h1 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
                        Pengaturan
                    </h1>

                    <div className="space-y-6">
                        <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} p-6 rounded-lg`}>
                            <h2 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
                                Pengaturan Kamera
                            </h2>
                            
                            {error && (
                                <div className="bg-red-50 text-red-600 p-4 rounded mb-4">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-4">
                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                                        Pilih Kamera
                                    </label>
                                    <select
                                        value={selectedDevice}
                                        onChange={(e) => handleDeviceChange(e.target.value)}
                                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                                            ${theme === 'dark' ? 'bg-gray-600 border-gray-500 text-gray-100' : 'bg-white border-gray-300 text-gray-900'}`}
                                    >
                                        {devices.map((device) => (
                                            <option key={device.deviceId} value={device.deviceId}>
                                                {device.label || `Kamera ${devices.indexOf(device) + 1}`}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className={`${theme === 'dark' ? 'bg-yellow-900/30' : 'bg-yellow-50'} p-4 rounded`}>
                                    <h3 className={`text-sm font-medium mb-2 ${theme === 'dark' ? 'text-yellow-200' : 'text-yellow-800'}`}>
                                        Catatan:
                                    </h3>
                                    <ul className={`list-disc list-inside text-sm space-y-1 ${theme === 'dark' ? 'text-yellow-200' : 'text-yellow-700'}`}>
                                        <li>Pastikan browser memiliki izin untuk mengakses kamera</li>
                                        <li>Beberapa kamera mungkin memerlukan driver tambahan</li>
                                        <li>Perubahan kamera akan berlaku setelah memuat ulang halaman</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} p-6 rounded-lg`}>
                            <h2 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
                                Pengaturan Bahasa
                            </h2>
                            <div>
                                <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                                    Pilih Bahasa
                                </label>
                                <select
                                    value={language}
                                    onChange={(e) => handleLanguageChange(e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                                        ${theme === 'dark' ? 'bg-gray-600 border-gray-500 text-gray-100' : 'bg-white border-gray-300 text-gray-900'}`}
                                >
                                    <option value="id">Bahasa Indonesia</option>
                                    <option value="en">English</option>
                                </select>
                            </div>
                        </div>

                        <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} p-6 rounded-lg`}>
                            <h2 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
                                Pengaturan Tema
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                                        Mode Tema
                                    </label>
                                    <div className="flex space-x-4">
                                        <button
                                            onClick={() => handleThemeChange('light')}
                                            className={`
                                                px-4 py-2 
                                                rounded-md 
                                                transition-all 
                                                duration-200 
                                                ${theme === 'light' 
                                                    ? 'bg-theme-gradient text-white shadow-md' 
                                                    : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500'
                                                }
                                            `}
                                        >
                                            Mode Terang
                                        </button>
                                        <button
                                            onClick={() => handleThemeChange('dark')}
                                            className={`
                                                px-4 py-2 
                                                rounded-md 
                                                transition-all 
                                                duration-200 
                                                ${theme === 'dark' 
                                                    ? 'bg-theme-gradient text-white shadow-md' 
                                                    : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500'
                                                }
                                            `}
                                        >
                                            Mode Gelap
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                                        Warna Tema
                                    </label>
                                    <div className="flex space-x-2">
                                        {[
                                            { id: 'blue', name: 'Biru', gradient: 'from-blue-700 to-blue-500' },
                                            { id: 'green', name: 'Hijau', gradient: 'from-emerald-700 to-emerald-500' },
                                            { id: 'purple', name: 'Ungu', gradient: 'from-violet-700 to-violet-500' },
                                            { id: 'red', name: 'Merah', gradient: 'from-red-700 to-red-500' }
                                        ].map((color) => (
                                            <button
                                                key={color.id}
                                                onClick={() => handleThemeColorChange(color.id)}
                                                className={`
                                                    w-10 h-10 
                                                    rounded-full 
                                                    bg-gradient-to-r ${color.gradient}
                                                    transition-all duration-200
                                                    ${themeColor === color.id 
                                                        ? 'ring-2 ring-offset-2 ring-offset-gray-100 dark:ring-offset-gray-800 ring-white scale-110' 
                                                        : 'hover:ring-2 hover:ring-offset-2 hover:ring-offset-gray-100 dark:hover:ring-offset-gray-800 hover:ring-white/50 hover:scale-105'
                                                    }
                                                    shadow-lg
                                                `}
                                                title={color.name}
                                                aria-label={`Warna tema ${color.name}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
} 