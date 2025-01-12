import React, { useState, useRef, useEffect } from 'react';
import MainLayout from '../Layouts/MainLayout';
import { Link } from '@inertiajs/react';

export default function LatihanPemula() {
    const [selectedLesson, setSelectedLesson] = useState(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [isSuccess, setIsSuccess] = useState(false);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const wsRef = useRef(null);
    const [isStreaming, setIsStreaming] = useState(false);
    const [error, setError] = useState(null);
    const [detectedGesture, setDetectedGesture] = useState(null);
    const [isCameraOn, setIsCameraOn] = useState(false);

    // Start camera
    const startCamera = async () => {
        try {
            const selectedDeviceId = localStorage.getItem('selectedCamera');
            const constraints = {
                video: {
                    width: { ideal: 640 },
                    height: { ideal: 480 },
                    facingMode: 'user',
                    deviceId: selectedDeviceId ? { exact: selectedDeviceId } : undefined
                }
            };
            
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                setIsStreaming(true);
                setIsCameraOn(true);
                setError(null);
                startWebSocket();
            }
        } catch (err) {
            setError('Gagal mengakses kamera. Pastikan Anda telah memberikan izin penggunaan kamera.');
            console.error('Error accessing camera:', err);
        }
    };

    // Stop camera
    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach(track => track.stop());
            videoRef.current.srcObject = null;
            setIsStreaming(false);
            setIsCameraOn(false);
            
            if (wsRef.current) {
                wsRef.current.close();
                wsRef.current = null;
            }
        }
    };

    // Toggle camera
    const toggleCamera = () => {
        if (isCameraOn) {
            stopCamera();
        } else {
            startCamera();
        }
    };

    // WebSocket connection
    const startWebSocket = () => {
        wsRef.current = new WebSocket('ws://localhost:8765');
        
        wsRef.current.onopen = () => {
            console.log('WebSocket Connected');
            sendFrames();
        };
        
        wsRef.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.gesture) {
                setDetectedGesture({
                    letter: data.gesture,
                    confidence: data.confidence
                });
                
                // Check if detected gesture matches current lesson
                if (selectedLesson && selectedLesson.targetGesture === data.gesture && data.confidence > 0.7) {
                    setIsSuccess(true);
                }
            }
        };
        
        wsRef.current.onerror = (error) => {
            console.error('WebSocket error:', error);
            setError('Gagal terhubung ke server pengenalan. Silakan coba lagi.');
        };
    };

    // Send frames to WebSocket
    const sendFrames = () => {
        if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
        
        const canvas = canvasRef.current;
        const video = videoRef.current;
        
        if (canvas && video && video.readyState === video.HAVE_ENOUGH_DATA) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0);
            
            // Send frame as base64
            const frame = canvas.toDataURL('image/jpeg');
            wsRef.current.send(frame);
            
            // Continue sending frames
            if (isStreaming) {
                requestAnimationFrame(sendFrames);
            }
        }
    };

    const lessons = [
        {
            id: 'huruf-a',
            title: 'Huruf A',
            targetGesture: 'A',
            steps: [
                {
                    instruction: "Kepalkan tangan Anda",
                    detail: "Pastikan semua jari menggenggam kecuali telunjuk",
                    image: "/images/bisindo/a-1.jpg"
                },
                {
                    instruction: "Angkat jari telunjuk",
                    detail: "Posisikan telunjuk tegak lurus ke atas",
                    image: "/images/bisindo/a-2.jpg"
                },
                {
                    instruction: "Arahkan ke kamera",
                    detail: "Pastikan tangan terlihat jelas di kamera",
                    image: "/images/bisindo/a-3.jpg"
                }
            ],
            tips: [
                "Jari telunjuk harus benar-benar tegak",
                "Jari lain harus terkepal rapat",
                "Tahan posisi selama 2-3 detik"
            ]
        },
        {
            id: 'kata-hai',
            title: 'Kata "HAI"',
            targetGesture: 'H',
            steps: [
                {
                    instruction: "Bentuk huruf H",
                    detail: "Tunjukkan dua jari (telunjuk dan tengah) sejajar",
                    image: "/images/bisindo/h-1.jpg"
                },
                {
                    instruction: "Bentuk huruf A",
                    detail: "Kepal tangan dengan telunjuk tegak",
                    image: "/images/bisindo/a-1.jpg"
                },
                {
                    instruction: "Bentuk huruf I",
                    detail: "Kepal tangan dengan kelingking tegak",
                    image: "/images/bisindo/i-1.jpg"
                }
            ],
            tips: [
                "Berikan jeda singkat antar huruf",
                "Pastikan setiap huruf terdeteksi",
                "Ulangi jika ada huruf yang tidak terdeteksi"
            ]
        }
    ];

    const startLesson = (lessonId) => {
        setSelectedLesson(lessons.find(l => l.id === lessonId));
        setCurrentStep(0);
        setIsSuccess(false);
    };

    const nextStep = () => {
        if (currentStep < selectedLesson.steps.length - 1) {
            setCurrentStep(currentStep + 1);
            setIsSuccess(false);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
            setIsSuccess(false);
        }
    };

    useEffect(() => {
        return () => {
            stopCamera();
        };
    }, []);

    return (
        <MainLayout>
            <div className="max-w-5xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-800">Latihan Terbimbing</h1>
                        {selectedLesson && (
                            <button
                                onClick={toggleCamera}
                                className={`px-4 py-2 rounded-lg flex items-center ${
                                    isCameraOn ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
                                } text-white transition-colors`}
                            >
                                {isCameraOn ? (
                                    <>
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        Matikan Kamera
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        Nyalakan Kamera
                                    </>
                                )}
                            </button>
                        )}
                    </div>

                    {!selectedLesson ? (
                        <div className="space-y-6">
                            <div className="bg-blue-50 p-6 rounded-lg">
                                <h2 className="text-xl font-semibold text-blue-800 mb-4">Pilih Latihan</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {lessons.map((lesson) => (
                                        <button
                                            key={lesson.id}
                                            onClick={() => startLesson(lesson.id)}
                                            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                                        >
                                            <h3 className="text-lg font-semibold text-gray-800 mb-2">{lesson.title}</h3>
                                            <p className="text-sm text-gray-600">{lesson.steps.length} langkah</p>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-yellow-50 p-6 rounded-lg">
                                <h2 className="text-xl font-semibold text-yellow-800 mb-4">Tips Sebelum Mulai</h2>
                                <ul className="space-y-2">
                                    <li className="flex items-center text-yellow-700">
                                        <span className="mr-2">💡</span>
                                        Pastikan pencahayaan ruangan cukup terang
                                    </li>
                                    <li className="flex items-center text-yellow-700">
                                        <span className="mr-2">💡</span>
                                        Posisikan diri tepat di depan kamera
                                    </li>
                                    <li className="flex items-center text-yellow-700">
                                        <span className="mr-2">💡</span>
                                        Ikuti setiap langkah dengan teliti
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <button
                                    onClick={() => {
                                        stopCamera();
                                        setSelectedLesson(null);
                                    }}
                                    className="text-blue-600 hover:text-blue-700 flex items-center"
                                >
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    Kembali ke Daftar
                                </button>
                                <div className="text-sm text-gray-600">
                                    Langkah {currentStep + 1} dari {selectedLesson.steps.length}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-6">
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                            {selectedLesson.steps[currentStep].instruction}
                                        </h3>
                                        <p className="text-gray-600 mb-4">
                                            {selectedLesson.steps[currentStep].detail}
                                        </p>
                                        <img
                                            src={selectedLesson.steps[currentStep].image}
                                            alt="Contoh gerakan"
                                            className="w-full rounded-lg"
                                        />
                                    </div>

                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <h4 className="font-semibold text-blue-800 mb-2">Tips:</h4>
                                        <ul className="space-y-2">
                                            {selectedLesson.tips.map((tip, index) => (
                                                <li key={index} className="flex items-center text-blue-700">
                                                    <span className="mr-2">👉</span>
                                                    {tip}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden relative">
                                        <video
                                            ref={videoRef}
                                            autoPlay
                                            playsInline
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                        <canvas ref={canvasRef} className="hidden" />
                                        
                                        {!isStreaming && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                                                <button
                                                    onClick={startCamera}
                                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                                                >
                                                    Nyalakan Kamera
                                                </button>
                                            </div>
                                        )}

                                        {detectedGesture && (
                                            <div className="absolute top-4 right-4 bg-white p-2 rounded shadow">
                                                <p className="text-sm font-semibold">
                                                    Terdeteksi: {detectedGesture.letter} 
                                                    ({(detectedGesture.confidence * 100).toFixed(1)}%)
                                                </p>
                                            </div>
                                        )}

                                        {isSuccess && (
                                            <div className="absolute inset-0 bg-green-500 bg-opacity-20 flex items-center justify-center">
                                                <div className="bg-white p-4 rounded-lg shadow-lg">
                                                    <h3 className="text-lg font-semibold text-green-600 mb-2">
                                                        Berhasil! 🎉
                                                    </h3>
                                                    <p className="text-gray-600">
                                                        Gerakan terdeteksi dengan benar
                                                    </p>
                                                    {currentStep < selectedLesson.steps.length - 1 && (
                                                        <button
                                                            onClick={nextStep}
                                                            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                                                        >
                                                            Lanjut ke Langkah Berikutnya
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {error && (
                                        <div className="bg-red-50 text-red-600 p-4 rounded">
                                            {error}
                                        </div>
                                    )}

                                    <div className="flex justify-between">
                                        <button
                                            onClick={prevStep}
                                            disabled={currentStep === 0}
                                            className={`px-4 py-2 rounded ${
                                                currentStep === 0
                                                    ? 'bg-gray-300 cursor-not-allowed'
                                                    : 'bg-blue-500 hover:bg-blue-600'
                                            } text-white transition-colors`}
                                        >
                                            Sebelumnya
                                        </button>
                                        <button
                                            onClick={nextStep}
                                            disabled={currentStep === selectedLesson.steps.length - 1 || !isSuccess}
                                            className={`px-4 py-2 rounded ${
                                                currentStep === selectedLesson.steps.length - 1 || !isSuccess
                                                    ? 'bg-gray-300 cursor-not-allowed'
                                                    : 'bg-blue-500 hover:bg-blue-600'
                                            } text-white transition-colors`}
                                        >
                                            Selanjutnya
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
} 