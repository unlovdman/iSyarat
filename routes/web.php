<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Homepage');
})->name('home');

Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->name('dashboard');

Route::get('/camera', function () {
    return Inertia::render('Camera');
})->name('camera');

Route::get('/panduan', function () {
    return Inertia::render('Panduan');
})->name('panduan');

Route::get('/riwayat', function () {
    return Inertia::render('Riwayat');
})->name('riwayat');

Route::get('/settings', function () {
    return Inertia::render('Settings');
})->name('settings');

Route::get('/roadmap', function () {
    return Inertia::render('Roadmap');
})->name('roadmap');

// Add new route for beginner's practice
Route::get('/latihan-pemula', function () {
    return Inertia::render('LatihanPemula');
})->name('latihan-pemula');

// Add statistics routes
Route::get('/api/stats/current-session', function () {
    $sessionId = request()->query('session_id');
    $filename = storage_path("app/public/sessions/session_{$sessionId}.json");
    
    if (file_exists($filename)) {
        return response()->json(json_decode(file_get_contents($filename)));
    }
    
    return response()->json(['error' => 'Session not found'], 404);
});

Route::get('/api/stats/history', function () {
    $filename = storage_path('app/public/recognition_stats.json');
    
    if (file_exists($filename)) {
        return response()->json(json_decode(file_get_contents($filename)));
    }
    
    return response()->json(['error' => 'No history found'], 404);
});

Route::get('/api/words/history', function () {
    $filename = storage_path('app/public/detected_words.json');
    
    if (file_exists($filename)) {
        return response()->json(json_decode(file_get_contents($filename)));
    }
    
    return response()->json(['error' => 'No word history found'], 404);
});
