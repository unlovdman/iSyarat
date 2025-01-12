import React, { useState, useRef, useEffect } from 'react';
import MainLayout from '../Layouts/MainLayout';

export default function Camera() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const wsRef = useRef(null);
    const [isRecording, setIsRecording] = useState(false);
    const [error, setError] = useState(null);
    const [detectedSign, setDetectedSign] = useState(null);
    const [currentWord, setCurrentWord] = useState('');
    const [isCameraOn, setIsCameraOn] = useState(false);

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
                setIsCameraOn(true);
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
            setIsCameraOn(false);
            
            // Stop recording if it's active
            if (isRecording) {
                stopRecording();
            }
        }
    };

    const toggleCamera = () => {
        if (isCameraOn) {
            stopCamera();
        } else {
            startCamera();
        }
    };

    const startRecording = () => {
        if (!isCameraOn) {
            setError('Silakan nyalakan kamera terlebih dahulu');
            return;
        }
        startWebSocket();
        setIsRecording(true);
    };

    const stopRecording = () => {
        if (wsRef.current) {
            wsRef.current.close();
            wsRef.current = null;
        }
        setIsRecording(false);
        setDetectedSign(null);
        setCurrentWord('');
    };

    const toggleRecording = () => {
        if (!isRecording) {
            startRecording();
        } else {
            stopRecording();
        }
    };

    const startWebSocket = () => {
        wsRef.current = new WebSocket('ws://localhost:8765');
        
        wsRef.current.onopen = () => {
            console.log('WebSocket Connected');
            sendFrames();
        };
        
        wsRef.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.gesture) {
                setDetectedSign({
                    letter: data.gesture,
                    confidence: data.confidence
                });
            }
            if (data.word) {
                setCurrentWord(data.word);
            }
        };
        
        wsRef.current.onerror = (error) => {
            console.error('WebSocket error:', error);
            setError('Gagal terhubung ke server pengenalan. Silakan coba lagi.');
        };
    };

    const sendFrames = () => {
        if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
        
        const canvas = canvasRef.current;
        const video = videoRef.current;
        
        if (canvas && video && video.readyState === video.HAVE_ENOUGH_DATA) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0);
            
            const frame = canvas.toDataURL('image/jpeg');
            wsRef.current.send(frame);
            
            if (isRecording) {
                requestAnimationFrame(sendFrames);
            }
        }
    };

    useEffect(() => {
        return () => {
            stopCamera();
            if (wsRef.current) {
                wsRef.current.close();
            }
        };
    }, []);

    return (
        <MainLayout>
            <div className="max-w-5xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-800">Pengenalan BISINDO</h1>
                        <div className="flex gap-2">
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
                            {isCameraOn && (
                                <button
                                    onClick={toggleRecording}
                                    className={`px-4 py-2 rounded-lg flex items-center ${
                                        isRecording ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'
                                    } text-white transition-colors`}
                                >
                                    {isRecording ? (
                                        <>
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                                            </svg>
                                            Berhenti
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Mulai
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden relative">
                                <video
                                    ref={videoRef}
                                    autoPlay
                                    playsInline
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                <canvas ref={canvasRef} className="hidden" />

                                {!isCameraOn && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                                        <p className="text-white text-lg">Kamera tidak aktif</p>
                                    </div>
                                )}

                                {detectedSign && isRecording && (
                                    <div className="absolute top-4 right-4 bg-white p-2 rounded shadow">
                                        <p className="text-sm font-semibold">
                                            Terdeteksi: {detectedSign.letter}
                                            ({(detectedSign.confidence * 100).toFixed(1)}%)
                                        </p>
                                    </div>
                                )}
                            </div>

                            {error && (
                                <div className="bg-red-50 text-red-600 p-4 rounded">
                                    {error}
                                </div>
                            )}
                        </div>

                        <div className="space-y-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">Kata yang Terbentuk</h2>
                                <div className="bg-white p-4 rounded border border-gray-200 min-h-[100px]">
                                    <p className="text-2xl font-bold text-gray-700">
                                        {currentWord || '-'}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h2 className="text-xl font-semibold text-blue-800 mb-4">Petunjuk</h2>
                                <ul className="space-y-2">
                                    <li className="flex items-center text-blue-700">
                                        <span className="mr-2">👉</span>
                                        Posisikan tangan dalam jarak optimal dari kamera
                                    </li>
                                    <li className="flex items-center text-blue-700">
                                        <span className="mr-2">👉</span>
                                        Pastikan pencahayaan cukup terang
                                    </li>
                                    <li className="flex items-center text-blue-700">
                                        <span className="mr-2">👉</span>
                                        Tahan posisi tangan selama 2-3 detik
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
} 