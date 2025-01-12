import React, { useEffect } from 'react';
import MainLayout from '../Layouts/MainLayout';
import { Link } from '@inertiajs/react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Dashboard() {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true
        });
    }, []);

    const stats = [
        { label: 'Total Pengenalan', value: '0', change: '+0%', changeType: 'positive' },
        { label: 'Kata Terdeteksi', value: '0', change: '+0%', changeType: 'positive' },
        { label: 'Akurasi Rata-rata', value: '0%', change: '0%', changeType: 'neutral' },
        { label: 'Waktu Pengenalan', value: '0s', change: '-0s', changeType: 'positive' },
    ];

    const recentActivities = [
        {
            id: 1,
            type: 'recognition',
            result: 'Halo',
            accuracy: '95%',
            time: '5 menit yang lalu',
            status: 'success'
        },
        {
            id: 2,
            type: 'recognition',
            result: 'Terima Kasih',
            accuracy: '87%',
            time: '10 menit yang lalu',
            status: 'success'
        },
        {
            id: 3,
            type: 'recognition',
            result: 'Tidak Terdeteksi',
            accuracy: '45%',
            time: '15 menit yang lalu',
            status: 'error'
        }
    ];

    return (
        <MainLayout>
            <div className="space-y-6">
                {/* Welcome Section */}
                <div className="bg-white rounded-xl shadow-sm p-6" data-aos="fade-up">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-800">Selamat Datang Kembali!</h1>
                            <p className="text-gray-600 mt-1">
                                Berikut adalah ringkasan aktivitas Anda
                            </p>
                        </div>
                        <Link
                            href="/camera"
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Mulai Pengenalan
                        </Link>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-aos="fade-up" data-aos-delay="100">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                                    <p className="text-2xl font-semibold text-gray-900 mt-1">{stat.value}</p>
                                </div>
                                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${
                                    stat.changeType === 'positive' ? 'bg-green-100 text-green-800'
                                    : stat.changeType === 'negative' ? 'bg-red-100 text-red-800'
                                    : 'bg-gray-100 text-gray-800'
                                }`}>
                                    {stat.change}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Quick Actions */}
                    <div className="bg-white rounded-xl shadow-sm p-6" data-aos="fade-up" data-aos-delay="200">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Aksi Cepat</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <Link href="/camera" className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                                <svg className="w-8 h-8 text-blue-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                <span className="text-sm font-medium text-gray-900">Mulai Deteksi</span>
                            </Link>
                            <Link href="/riwayat" className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                                <svg className="w-8 h-8 text-green-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                <span className="text-sm font-medium text-gray-900">Lihat Riwayat</span>
                            </Link>
                            <Link href="/panduan" className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                                <svg className="w-8 h-8 text-purple-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                                <span className="text-sm font-medium text-gray-900">Buka Panduan</span>
                            </Link>
                            <Link href="#" className="flex flex-col items-center p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
                                <svg className="w-8 h-8 text-yellow-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="text-sm font-medium text-gray-900">Pengaturan</span>
                            </Link>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white rounded-xl shadow-sm p-6" data-aos="fade-up" data-aos-delay="300">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Aktivitas Terbaru</h2>
                        <div className="space-y-4">
                            {recentActivities.map((activity) => (
                                <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center space-x-4">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                            activity.status === 'success' ? 'bg-green-100' : 'bg-red-100'
                                        }`}>
                                            <svg className={`w-6 h-6 ${
                                                activity.status === 'success' ? 'text-green-600' : 'text-red-600'
                                            }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{activity.result}</p>
                                            <p className="text-sm text-gray-500">{activity.time}</p>
                                        </div>
                                    </div>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                        activity.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                        {activity.accuracy}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <Link href="/riwayat" className="mt-4 inline-flex items-center text-sm text-blue-600 hover:text-blue-700">
                            Lihat Semua Aktivitas
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
} 