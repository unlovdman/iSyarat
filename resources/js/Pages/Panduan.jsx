import React from 'react';
import MainLayout from '../Layouts/MainLayout';

export default function Panduan() {
    const panduan = [
        {
            judul: 'Memulai Pengenalan Isyarat',
            langkah: [
                'Buka halaman Kamera dari menu navigasi',
                'Klik tombol "Nyalakan Kamera" untuk mengaktifkan kamera',
                'Posisikan diri Anda dengan baik di depan kamera',
                'Klik "Mulai Pengenalan" untuk memulai deteksi'
            ]
        },
        {
            judul: 'Tips Penggunaan Kamera',
            langkah: [
                'Pastikan ruangan memiliki pencahayaan yang cukup',
                'Hindari background yang terlalu ramai',
                'Jaga jarak sekitar 1-1.5 meter dari kamera',
                'Pastikan seluruh gerakan tangan terlihat dalam frame'
            ]
        },
        {
            judul: 'Kamus Isyarat Dasar',
            langkah: [
                'Halo - Lambaikan tangan dengan telapak menghadap ke depan',
                'Terima Kasih - Sentuh dagu dengan telapak tangan',
                'Ya - Kepalkan tangan dan gerakkan naik turun',
                'Tidak - Gerakkan telapak tangan kanan ke kiri dan kanan'
            ]
        }
    ];

    return (
        <MainLayout>
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">Panduan Penggunaan</h1>
                <p className="text-gray-600 mb-8">
                    Pelajari cara menggunakan aplikasi iSyarat untuk pengenalan bahasa isyarat yang optimal
                </p>

                <div className="space-y-8">
                    {panduan.map((section, index) => (
                        <div key={index} className="bg-gray-50 p-6 rounded-lg">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">{section.judul}</h2>
                            <ul className="space-y-3">
                                {section.langkah.map((step, stepIndex) => (
                                    <li key={stepIndex} className="flex items-start">
                                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mr-3 mt-0.5">
                                            {stepIndex + 1}
                                        </span>
                                        <span className="text-gray-600">{step}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-8 bg-yellow-50 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold text-yellow-800 mb-4">Catatan Penting</h2>
                    <ul className="list-disc list-inside space-y-2 text-yellow-700">
                        <li>Aplikasi masih dalam tahap pengembangan</li>
                        <li>Beberapa gerakan mungkin belum dapat dikenali dengan akurat</li>
                        <li>Hasil pengenalan dapat bervariasi tergantung kondisi pencahayaan</li>
                        <li>Selalu perbarui aplikasi untuk mendapatkan fitur terbaru</li>
                    </ul>
                </div>
            </div>
        </MainLayout>
    );
} 