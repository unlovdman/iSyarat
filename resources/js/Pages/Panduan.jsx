import React from 'react';
import MainLayout from '../Layouts/MainLayout';
import { Link } from '@inertiajs/react';

export default function Panduan() {
    const sections = [
        {
            title: "Memulai Pengenalan BISINDO",
            content: [
                {
                    subtitle: "Persiapan",
                    items: [
                        "Pastikan ruangan memiliki pencahayaan yang cukup",
                        "Gunakan latar belakang polos (hindari latar yang terlalu ramai)",
                        "Posisikan kamera sejajar dengan bahu",
                        "Jaga jarak sekitar 50-70 cm dari kamera"
                    ]
                },
                {
                    subtitle: "Menggunakan Kamera",
                    items: [
                        "Klik tombol 'Nyalakan Kamera' untuk mengaktifkan kamera",
                        "Tunggu hingga preview kamera muncul",
                        "Klik 'Mulai Pengenalan' untuk memulai deteksi",
                        "Sistem akan mendeteksi gerakan tangan secara otomatis"
                    ]
                }
            ]
        },
        {
            title: "Panduan Gerakan BISINDO",
            content: [
                {
                    subtitle: "Tips Gerakan",
                    items: [
                        "Gerakan harus jelas dan tidak terlalu cepat",
                        "Tahan gerakan selama 1-2 detik",
                        "Pastikan tangan terlihat jelas dalam frame kamera",
                        "Jika confidence rendah, coba sesuaikan posisi atau pencahayaan"
                    ]
                },
                {
                    subtitle: "Membentuk Kata",
                    items: [
                        "Setiap huruf akan terdeteksi dan ditampilkan secara real-time",
                        "Sistem akan otomatis menggabungkan huruf menjadi kata",
                        "Jeda 2 detik akan dianggap sebagai spasi/kata baru",
                        "Tekan 'Spasi' untuk memaksa membuat kata baru"
                    ]
                }
            ]
        },
        {
            title: "Referensi Huruf BISINDO",
            content: [
                {
                    subtitle: "Huruf Dasar (A-J)",
                    items: [
                        "A: Kepal tangan, jari telunjuk tegak",
                        "B: Telapak tangan terbuka, jari rapat",
                        "C: Jari membentuk huruf C",
                        "D: Jari membentuk huruf D",
                        "E: Jari menggenggam",
                        "F: Jari telunjuk dan jempol membentuk F",
                        "G: Telapak tangan menghadap depan, jari G",
                        "H: Telunjuk dan jari tengah sejajar",
                        "I: Kepal tangan, jari kelingking tegak",
                        "J: Jari kelingking bergerak membentuk J"
                    ]
                },
                {
                    subtitle: "Huruf Lanjutan (K-T)",
                    items: [
                        "K: Telunjuk tegak, jari tengah miring",
                        "L: Telunjuk dan jempol membentuk L",
                        "M: Tiga jari membentuk M",
                        "N: Telunjuk dan jari tengah membentuk N",
                        "O: Jari membentuk lingkaran O",
                        "P: Telunjuk menunjuk ke bawah",
                        "Q: Jari membentuk angka 2 terbalik",
                        "R: Telunjuk dan tengah menyilang",
                        "S: Jari menggenggam membentuk S",
                        "T: Telunjuk menekuk seperti T"
                    ]
                },
                {
                    subtitle: "Huruf Akhir (U-Z)",
                    items: [
                        "U: Telunjuk dan jari tengah sejajar",
                        "V: Telunjuk dan jari tengah membentuk V",
                        "W: Tiga jari membentuk W",
                        "X: Telunjuk membengkok seperti X",
                        "Y: Jempol dan kelingking membuka",
                        "Z: Telunjuk menggambar Z di udara"
                    ]
                }
            ]
        },
        {
            title: "Statistik dan Riwayat",
            content: [
                {
                    subtitle: "Memahami Statistik",
                    items: [
                        "Total Deteksi: Jumlah huruf yang berhasil dideteksi",
                        "Confidence: Tingkat keyakinan sistem (minimal 70%)",
                        "Streak: Jumlah deteksi berturut-turut yang berhasil",
                        "Top Letters: Huruf yang paling sering terdeteksi",
                        "Session Duration: Lama waktu pengenalan aktif"
                    ]
                },
                {
                    subtitle: "Melihat Riwayat",
                    items: [
                        "Semua deteksi tersimpan otomatis",
                        "Kunjungi halaman Riwayat untuk melihat progress",
                        "Data tersimpan per sesi untuk analisis",
                        "Gunakan data untuk meningkatkan akurasi gerakan"
                    ]
                }
            ]
        },
        {
            title: "Materi Pembelajaran BISINDO",
            content: [
                {
                    subtitle: "Latihan Dasar",
                    items: [
                        "Mulai dengan huruf vokal (A, I, U, E, O)",
                        "Lanjut ke huruf yang mudah (B, C, L, O, V)",
                        "Latih huruf yang mirip bersama (H-U, K-P, W-M)",
                        "Praktikkan kombinasi dua huruf (BA, BE, BI, BO, BU)"
                    ]
                },
                {
                    subtitle: "Kata-kata Dasar",
                    items: [
                        "Nama: ABI, ADI, IDA, UDA, EKA",
                        "Sapaan: HAI, HALO, HEI",
                        "Kata Kerja: BACA, LIHAT, MAKAN",
                        "Kata Sifat: BAIK, SUKA, MALU"
                    ]
                }
            ]
        },
        {
            title: "Latihan Bertahap",
            content: [
                {
                    subtitle: "Level 1 - Pengenalan",
                    items: [
                        "Latihan 1: A, I, U, E, O (Vokal)",
                        "Latihan 2: B, C, D, L, M (Konsonan Mudah)",
                        "Latihan 3: BA-BI, CA-CI, DA-DI (Suku Kata)",
                        "Latihan 4: BACA, DADU, MADU (Kata Pendek)"
                    ]
                },
                {
                    subtitle: "Level 2 - Pengembangan",
                    items: [
                        "Latihan 1: F, G, H, J, K (Konsonan Menengah)",
                        "Latihan 2: GA-GI, HA-HI, KA-KI (Suku Kata)",
                        "Latihan 3: GAJI, HARI, KAKI (Kata Harian)",
                        "Latihan 4: SAYA SUKA MAKAN (Kalimat Pendek)"
                    ]
                },
                {
                    subtitle: "Level 3 - Lanjutan",
                    items: [
                        "Latihan 1: P, Q, R, S, T (Konsonan Kompleks)",
                        "Latihan 2: PA-PI, RA-RI, SA-SI (Suku Kata)",
                        "Latihan 3: PAGI, SORE, TADI (Kata Waktu)",
                        "Latihan 4: SELAMAT PAGI SEMUA (Kalimat Sapaan)"
                    ]
                }
            ]
        },
        {
            title: "Kosakata Tematik",
            content: [
                {
                    subtitle: "Tema: Keluarga",
                    items: [
                        "IBU, AYAH, KAKAK, ADIK",
                        "NENEK, KAKEK, PAMAN, BIBI",
                        "ANAK, CUCU, KELUARGA",
                        "RUMAH, SAYANG, BAHAGIA"
                    ]
                },
                {
                    subtitle: "Tema: Sehari-hari",
                    items: [
                        "PAGI, SIANG, SORE, MALAM",
                        "MAKAN, MINUM, TIDUR, MANDI",
                        "BELAJAR, KERJA, MAIN",
                        "SENANG, SEDIH, MARAH, LELAH"
                    ]
                },
                {
                    subtitle: "Tema: Pertanyaan",
                    items: [
                        "APA, SIAPA, DIMANA",
                        "KAPAN, MENGAPA, BAGAIMANA",
                        "BERAPA, YANG MANA",
                        "SUDAH, BELUM, BISA"
                    ]
                }
            ]
        },
        {
            title: "Tips Latihan",
            content: [
                {
                    subtitle: "Metode Belajar",
                    items: [
                        "Mulai dari kata-kata pendek (2-3 huruf)",
                        "Latih setiap huruf minimal 5-10 kali",
                        "Rekam dan evaluasi gerakan Anda",
                        "Praktik dengan teman atau keluarga"
                    ]
                },
                {
                    subtitle: "Jadwal Latihan",
                    items: [
                        "Latihan 15-30 menit setiap hari",
                        "Fokus pada 3-5 kata baru per sesi",
                        "Ulangi kata-kata sebelumnya",
                        "Buat catatan kemajuan harian"
                    ]
                }
            ]
        }
    ];

    return (
        <MainLayout>
            <div className="max-w-5xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Panduan Penggunaan iSyarat</h1>
                    
                    {/* Quick Start */}
                    <div className="bg-blue-50 p-6 rounded-lg mb-8">
                        <h2 className="text-xl font-semibold text-blue-800 mb-4">Quick Start</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white p-4 rounded shadow-sm">
                                <div className="text-blue-600 font-semibold mb-2">1. Persiapan</div>
                                <p className="text-sm text-gray-600">Pastikan pencahayaan baik dan posisi kamera tepat</p>
                            </div>
                            <div className="bg-white p-4 rounded shadow-sm">
                                <div className="text-blue-600 font-semibold mb-2">2. Mulai Deteksi</div>
                                <p className="text-sm text-gray-600">Nyalakan kamera dan klik Mulai Pengenalan</p>
                            </div>
                            <div className="bg-white p-4 rounded shadow-sm">
                                <div className="text-blue-600 font-semibold mb-2">3. Praktik</div>
                                <p className="text-sm text-gray-600">Ikuti panduan gerakan dan mulai berlatih</p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <Link
                                href="/camera"
                                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                            >
                                Mulai Sekarang
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="space-y-8">
                        {sections.map((section, idx) => (
                            <div key={idx} className="border-b border-gray-200 pb-8 last:border-0">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">{section.title}</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {section.content.map((subsection, subIdx) => (
                                        <div key={subIdx} className="bg-gray-50 p-4 rounded">
                                            <h3 className="text-lg font-semibold text-gray-700 mb-3">
                                                {subsection.subtitle}
                                            </h3>
                                            <ul className="space-y-2">
                                                {subsection.items.map((item, itemIdx) => (
                                                    <li key={itemIdx} className="flex items-start">
                                                        <span className="inline-block w-4 h-4 mt-1 mr-2 bg-green-500 rounded-full flex-shrink-0"></span>
                                                        <span className="text-gray-600">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Tips Box */}
                    <div className="mt-8 bg-yellow-50 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-yellow-800 mb-3">Tips Tambahan</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center text-yellow-700">
                                <span className="mr-2">💡</span>
                                Latih satu huruf hingga konsisten sebelum pindah ke huruf berikutnya
                            </li>
                            <li className="flex items-center text-yellow-700">
                                <span className="mr-2">💡</span>
                                Gunakan fitur statistik untuk melacak kemajuan
                            </li>
                            <li className="flex items-center text-yellow-700">
                                <span className="mr-2">💡</span>
                                Praktik secara teratur untuk hasil terbaik
                            </li>
                        </ul>
                    </div>

                    {/* Help Box */}
                    <div className="mt-8 bg-gray-50 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Butuh Bantuan?</h3>
                        <p className="text-gray-600 mb-4">
                            Jika Anda mengalami kesulitan atau memiliki pertanyaan, silakan hubungi tim support kami.
                        </p>
                        <div className="flex space-x-4">
                            <Link
                                href="/about"
                                className="text-blue-600 hover:text-blue-700 flex items-center"
                            >
                                <span>Tentang iSyarat</span>
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                            <Link
                                href="/settings"
                                className="text-blue-600 hover:text-blue-700 flex items-center"
                            >
                                <span>Pengaturan</span>
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
} 