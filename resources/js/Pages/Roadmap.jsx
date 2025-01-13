import React from 'react';
import MainLayout from '../Layouts/MainLayout';
import { useContext } from 'react';
import { ThemeContext } from '../Contexts/ThemeContext';

export default function Roadmap() {
    const { theme } = useContext(ThemeContext);

    const roadmapData = [
        {
            level: "Pemula",
            description: "Mengenal dasar-dasar bahasa isyarat dan gerakan sederhana",
            duration: "2-3 minggu",
            topics: [
                "Pengenalan Alfabet BISINDO",
                "Angka dan Bilangan",
                "Kata Ganti dan Sapaan",
                "Ekspresi Sehari-hari"
            ],
            skills: [
                "Mampu membentuk huruf dengan benar",
                "Mengenal angka 1-100",
                "Dapat melakukan sapaan dasar",
                "Mengungkapkan kebutuhan sederhana"
            ]
        },
        {
            level: "Menengah",
            description: "Memperdalam pemahaman dan meningkatkan kelancaran komunikasi",
            duration: "4-6 minggu",
            topics: [
                "Kalimat dan Struktur Bahasa",
                "Percakapan Sehari-hari",
                "Emosi dan Perasaan",
                "Waktu dan Cuaca"
            ],
            skills: [
                "Membuat kalimat sederhana",
                "Melakukan percakapan pendek",
                "Mengekspresikan perasaan",
                "Menjelaskan situasi"
            ]
        },
        {
            level: "Mahir",
            description: "Menguasai komunikasi kompleks dan pemahaman budaya Tuli",
            duration: "8-12 minggu",
            topics: [
                "Percakapan Kompleks",
                "Budaya Tuli",
                "Variasi Regional BISINDO",
                "Interpretasi dan Penerjemahan"
            ],
            skills: [
                "Berdiskusi topik kompleks",
                "Memahami konteks budaya",
                "Mengenali variasi isyarat",
                "Dapat menjadi interpreter dasar"
            ]
        }
    ];

    return (
        <MainLayout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 mb-8`}>
                    <h1 className={`text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
                        Roadmap Pembelajaran
                    </h1>
                    <p className={`text-lg mb-8 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-600'}`}>
                        Ikuti panduan belajar sistematis ini untuk menguasai bahasa isyarat dari tingkat pemula hingga mahir.
                    </p>

                    <div className="space-y-8">
                        {roadmapData.map((level, index) => (
                            <div
                                key={level.level}
                                className={`relative ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} rounded-lg p-6 shadow-md transition-transform hover:scale-[1.02]`}
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                            >
                                {/* Level Badge */}
                                <div className="absolute -top-4 left-6">
                                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                                        index === 0 ? 'bg-green-100 text-green-800' :
                                        index === 1 ? 'bg-blue-100 text-blue-800' :
                                        'bg-purple-100 text-purple-800'
                                    }`}>
                                        {level.level}
                                    </span>
                                </div>

                                {/* Duration Badge */}
                                <div className="absolute -top-4 right-6">
                                    <span className="px-4 py-2 rounded-full bg-gray-100 text-gray-800 text-sm font-medium">
                                        {level.duration}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="mt-6">
                                    <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-600'}`}>
                                        {level.description}
                                    </p>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        {/* Topics */}
                                        <div>
                                            <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
                                                Topik Pembelajaran
                                            </h3>
                                            <ul className="space-y-3">
                                                {level.topics.map((topic, i) => (
                                                    <li key={i} className="flex items-start">
                                                        <svg className="w-5 h-5 text-blue-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        <span className={`${theme === 'dark' ? 'text-gray-200' : 'text-gray-600'}`}>{topic}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Skills */}
                                        <div>
                                            <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
                                                Kemampuan yang Diperoleh
                                            </h3>
                                            <ul className="space-y-3">
                                                {level.skills.map((skill, i) => (
                                                    <li key={i} className="flex items-start">
                                                        <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        <span className={`${theme === 'dark' ? 'text-gray-200' : 'text-gray-600'}`}>{skill}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Progress Tracking */}
                <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
                    <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
                        Pantau Kemajuan Anda
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} rounded-lg p-6 shadow-md border ${theme === 'dark' ? 'border-green-800' : 'border-green-200'}`}>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>Pemula</h3>
                                <span className="text-green-600 text-sm font-medium">60% Selesai</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '60%' }}></div>
                            </div>
                        </div>
                        <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} rounded-lg p-6 shadow-md border ${theme === 'dark' ? 'border-blue-800' : 'border-blue-200'}`}>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>Menengah</h3>
                                <span className="text-blue-600 text-sm font-medium">30% Selesai</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '30%' }}></div>
                            </div>
                        </div>
                        <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} rounded-lg p-6 shadow-md border ${theme === 'dark' ? 'border-purple-800' : 'border-purple-200'}`}>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>Mahir</h3>
                                <span className="text-purple-600 text-sm font-medium">10% Selesai</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '10%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
} 