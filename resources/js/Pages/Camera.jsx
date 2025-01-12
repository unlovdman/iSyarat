import React, { useEffect, useRef, useState } from 'react';
import MainLayout from '../Layouts/MainLayout';

export default function Camera() {
    const videoRef = useRef(null);
    const [isStreaming, setIsStreaming] = useState(false);
    const [error, setError] = useState(null);
    const [detectedSign, setDetectedSign] = useState(null);
    const [isRecording, setIsRecording] = useState(false);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ 
                video: { 
                    width: { ideal: 640 },
                    height: { ideal: 480 },
                    facingMode: 'user'
                } 
            });
            
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                setIsStreaming(true);
                setError(null);
            }
        } catch (err) {
            setError('Gagal mengakses kamera. Pastikan Anda telah memberikan izin penggunaan kamera.');
            console.error('Error accessing camera:', err);
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach(track => track.stop());
            videoRef.current.srcObject = null;
            setIsStreaming(false);
            setIsRecording(false);
        }
    };

    const toggleRecording = () => {
        setIsRecording(!isRecording);
        if (!isRecording) {
            // Start recognition process
            setDetectedSign({
                text: "Sedang mendeteksi...",
                confidence: 0
            });
        } else {
            // Stop recognition process
            setDetectedSign(null);
        }
    };

    useEffect(() => {
        return () => {
            stopCamera();
        };
    }, []);

    return (
        <MainLayout>
            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold text-gray-800">Pengenalan Bahasa Isyarat</h1>
                    <div className="flex gap-2">
                        <button
                            onClick={isStreaming ? stopCamera : startCamera}
                            className={`px-4 py-2 rounded ${
                                isStreaming 
                                    ? 'bg-red-500 hover:bg-red-600' 
                                    : 'bg-blue-500 hover:bg-blue-600'
                            } text-white transition-colors`}
                        >
                            {isStreaming ? 'Matikan Kamera' : 'Nyalakan Kamera'}
                        </button>
                        {isStreaming && (
                            <button
                                onClick={toggleRecording}
                                className={`px-4 py-2 rounded ${
                                    isRecording
                                        ? 'bg-yellow-500 hover:bg-yellow-600'
                                        : 'bg-green-500 hover:bg-green-600'
                                } text-white transition-colors`}
                            >
                                {isRecording ? 'Hentikan Pengenalan' : 'Mulai Pengenalan'}
                            </button>
                        )}
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded mb-4">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                            <video
                                ref={videoRef}
                                autoPlay
                                playsInline
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            {!isStreaming && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <p className="text-gray-500">Kamera tidak aktif</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-gray-50 p-4 rounded h-full">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Hasil Pengenalan</h2>
                            {isRecording ? (
                                <div>
                                    <div className="animate-pulse mb-4">
                                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                        <div className="space-y-3 mt-4">
                                            <div className="h-4 bg-gray-200 rounded"></div>
                                            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600">Mendeteksi gerakan isyarat...</p>
                                </div>
                            ) : (
                                <p className="text-gray-600">
                                    {isStreaming 
                                        ? 'Klik "Mulai Pengenalan" untuk memulai deteksi bahasa isyarat'
                                        : 'Nyalakan kamera untuk memulai pengenalan'}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">Petunjuk Penggunaan</h2>
                    <div className="bg-blue-50 p-4 rounded">
                        <ul className="list-disc list-inside space-y-2 text-blue-600">
                            <li>Pastikan Anda berada di ruangan dengan pencahayaan yang baik</li>
                            <li>Posisikan diri Anda tepat di depan kamera</li>
                            <li>Pastikan gerakan isyarat terlihat jelas dalam frame kamera</li>
                            <li>Tunggu beberapa saat untuk hasil pengenalan yang akurat</li>
                        </ul>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
} 