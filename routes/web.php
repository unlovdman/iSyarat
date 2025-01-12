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
