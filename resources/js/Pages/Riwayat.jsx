import React from 'react';
import MainLayout from '../Layouts/MainLayout';

export default function Riwayat() {
    // Sample data - replace with actual data from your backend
    const riwayatPengenalan = [
        {
            id: 1,
            tanggal: '12 Januari 2024',
            waktu: '14:30',
            hasil: 'Halo',
            akurasi: '95%',
            status: 'success'
        },
        {
            id: 2,
            tanggal: '12 Januari 2024',
            waktu: '14:35',
            hasil: 'Terima Kasih',
            akurasi: '87%',
            status: 'success'
        },
        {
            id: 3,
            tanggal: '12 Januari 2024',
            waktu: '14:40',
            hasil: 'Tidak Terdeteksi',
            akurasi: '45%',
            status: 'error'
        }
    ];

    return (
        <MainLayout>
            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800">Riwayat Pengenalan</h1>
                        <p className="text-gray-600 mt-1">
                            Daftar hasil pengenalan bahasa isyarat yang telah dilakukan
                        </p>
                    </div>
                    <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
                        Hapus Riwayat
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tanggal & Waktu
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Hasil Pengenalan
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tingkat Akurasi
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {riwayatPengenalan.map((item) => (
                                <tr key={item.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{item.tanggal}</div>
                                        <div className="text-sm text-gray-500">{item.waktu}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{item.hasil}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{item.akurasi}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            item.status === 'success'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                        }`}>
                                            {item.status === 'success' ? 'Berhasil' : 'Gagal'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-8 bg-gray-50 p-6 rounded-lg">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Ringkasan</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                            <p className="text-sm text-gray-600">Total Pengenalan</p>
                            <p className="text-2xl font-bold text-gray-800">3</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                            <p className="text-sm text-gray-600">Berhasil</p>
                            <p className="text-2xl font-bold text-green-600">2</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                            <p className="text-sm text-gray-600">Gagal</p>
                            <p className="text-2xl font-bold text-red-600">1</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                            <p className="text-sm text-gray-600">Rata-rata Akurasi</p>
                            <p className="text-2xl font-bold text-blue-600">76%</p>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
} 