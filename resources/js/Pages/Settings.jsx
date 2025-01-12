import React, { useState, useEffect } from 'react';
import MainLayout from '../Layouts/MainLayout';

export default function Settings() {
    const [devices, setDevices] = useState([]);
    const [selectedDevice, setSelectedDevice] = useState(localStorage.getItem('selectedCamera') || '');
    const [error, setError] = useState(null);

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

    return (
        <MainLayout>
            <div className="max-w-5xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Pengaturan</h1>

                    <div className="space-y-6">
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Pengaturan Kamera</h2>
                            
                            {error ? (
                                <div className="bg-red-50 text-red-600 p-4 rounded mb-4">
                                    {error}
                                </div>
                            ) : null}

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Pilih Kamera
                                    </label>
                                    <select
                                        value={selectedDevice}
                                        onChange={(e) => handleDeviceChange(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        {devices.map((device) => (
                                            <option key={device.deviceId} value={device.deviceId}>
                                                {device.label || `Kamera ${devices.indexOf(device) + 1}`}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="bg-yellow-50 p-4 rounded">
                                    <h3 className="text-sm font-medium text-yellow-800 mb-2">Catatan:</h3>
                                    <ul className="list-disc list-inside text-sm text-yellow-700 space-y-1">
                                        <li>Pastikan browser memiliki izin untuk mengakses kamera</li>
                                        <li>Beberapa kamera mungkin memerlukan driver tambahan</li>
                                        <li>Perubahan kamera akan berlaku setelah memuat ulang halaman</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
} 