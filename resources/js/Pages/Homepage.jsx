import React, { useEffect } from 'react';
import { Link } from '@inertiajs/react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Homepage() {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true
        });
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Navigation */}
            <nav className="bg-white/80 backdrop-blur-md fixed w-full z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold">i</span>
                                </div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                                    iSyarat
                                </h1>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
                                About
                            </Link>
                            <Link href="/dashboard" className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 py-2 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300">
                                Masuk
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="pt-24 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center" data-aos="fade-up">
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold">
                            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                                Pengenalan
                            </span>
                            <br />
                            Bahasa Isyarat
                        </h1>
                        <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
                            Platform modern untuk pengenalan bahasa isyarat Indonesia menggunakan teknologi kamera dan kecerdasan buatan.
                        </p>
                        <div className="mt-8 flex justify-center gap-4">
                            <Link
                                href="/dashboard"
                                className="group relative inline-flex items-center justify-center px-8 py-3 font-medium text-white bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105"
                            >
                                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-blue-300 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                <span className="relative flex items-center">
                                    Mulai Sekarang
                                    <svg className="w-5 h-5 ml-2 -mr-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </span>
                            </Link>
                            <Link
                                href="/about"
                                className="inline-flex items-center justify-center px-8 py-3 font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                            >
                                Pelajari Lebih Lanjut
                            </Link>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8" data-aos="fade-up" data-aos-delay="200">
                        <div className="bg-white p-6 rounded-xl shadow-sm text-center transform hover:scale-105 transition-transform">
                            <div className="text-3xl font-bold text-blue-600">500+</div>
                            <div className="text-gray-600 mt-1">Pengguna Aktif</div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm text-center transform hover:scale-105 transition-transform">
                            <div className="text-3xl font-bold text-blue-600">1000+</div>
                            <div className="text-gray-600 mt-1">Kata Terdeteksi</div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm text-center transform hover:scale-105 transition-transform">
                            <div className="text-3xl font-bold text-blue-600">95%</div>
                            <div className="text-gray-600 mt-1">Akurasi</div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm text-center transform hover:scale-105 transition-transform">
                            <div className="text-3xl font-bold text-blue-600">24/7</div>
                            <div className="text-gray-600 mt-1">Dukungan</div>
                        </div>
                    </div>

                    {/* Feature Section */}
                    <div className="mt-24">
                        <h2 className="text-3xl font-bold text-center mb-12" data-aos="fade-up">Fitur Unggulan</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-white p-8 rounded-xl shadow-sm transform hover:scale-105 transition-all duration-300" data-aos="fade-up" data-aos-delay="100">
                                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Pengenalan Real-time</h3>
                                <p className="text-gray-600 mb-4">Deteksi bahasa isyarat secara langsung menggunakan kamera dengan teknologi AI terkini</p>
                                <Link href="/camera" className="text-blue-600 hover:text-blue-700 inline-flex items-center group">
                                    Coba Sekarang
                                    <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>

                            <div className="bg-white p-8 rounded-xl shadow-sm transform hover:scale-105 transition-all duration-300" data-aos="fade-up" data-aos-delay="200">
                                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Riwayat Lengkap</h3>
                                <p className="text-gray-600 mb-4">Simpan dan analisis hasil pengenalan bahasa isyarat Anda secara terperinci</p>
                                <Link href="/riwayat" className="text-green-600 hover:text-green-700 inline-flex items-center group">
                                    Lihat Riwayat
                                    <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>

                            <div className="bg-white p-8 rounded-xl shadow-sm transform hover:scale-105 transition-all duration-300" data-aos="fade-up" data-aos-delay="300">
                                <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Panduan Lengkap</h3>
                                <p className="text-gray-600 mb-4">Pelajari bahasa isyarat dengan panduan interaktif dan mudah dipahami</p>
                                <Link href="/panduan" className="text-purple-600 hover:text-purple-700 inline-flex items-center group">
                                    Mulai Belajar
                                    <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="mt-24 bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl p-8 md:p-12 text-white text-center" data-aos="fade-up">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Siap Untuk Memulai?</h2>
                        <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                            Bergabunglah dengan komunitas kami dan mulai pelajari bahasa isyarat dengan cara yang modern dan interaktif.
                        </p>
                        <Link
                            href="/dashboard"
                            className="inline-flex items-center justify-center px-8 py-3 text-blue-600 bg-white rounded-lg hover:bg-blue-50 transition-colors"
                        >
                            Mulai Gratis
                        </Link>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-white mt-24 border-t border-gray-100">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-4">Produk</h3>
                            <ul className="space-y-3">
                                <li><Link href="/camera" className="text-gray-600 hover:text-gray-900">Kamera</Link></li>
                                <li><Link href="/riwayat" className="text-gray-600 hover:text-gray-900">Riwayat</Link></li>
                                <li><Link href="/panduan" className="text-gray-600 hover:text-gray-900">Panduan</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-4">Perusahaan</h3>
                            <ul className="space-y-3">
                                <li><Link href="#" className="text-gray-600 hover:text-gray-900">Tentang Kami</Link></li>
                                <li><Link href="#" className="text-gray-600 hover:text-gray-900">Karir</Link></li>
                                <li><Link href="#" className="text-gray-600 hover:text-gray-900">Blog</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-4">Sumber Daya</h3>
                            <ul className="space-y-3">
                                <li><Link href="#" className="text-gray-600 hover:text-gray-900">Dokumentasi</Link></li>
                                <li><Link href="#" className="text-gray-600 hover:text-gray-900">FAQ</Link></li>
                                <li><Link href="#" className="text-gray-600 hover:text-gray-900">Bantuan</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-4">Kontak</h3>
                            <ul className="space-y-3">
                                <li><Link href="#" className="text-gray-600 hover:text-gray-900">Email</Link></li>
                                <li><Link href="#" className="text-gray-600 hover:text-gray-900">Twitter</Link></li>
                                <li><Link href="#" className="text-gray-600 hover:text-gray-900">Instagram</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-gray-100">
                        <p className="text-center text-gray-500">
                            © 2024 iSyarat. Hak Cipta Dilindungi.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
} 