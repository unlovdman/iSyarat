# iSyarat - BISINDO Recognition System

<div align="center">

[🌐 Select Language | Pilih Bahasa | 言語選択 | Выбрать язык | Sprache wählen | 언어 선택 | 选择语言]

<details>
<summary>🇮🇩 Bahasa Indonesia</summary>

# iSyarat - Sistem Pengenalan BISINDO

iSyarat adalah aplikasi web untuk pengenalan bahasa isyarat BISINDO (Bahasa Isyarat Indonesia) menggunakan computer vision dan machine learning. Aplikasi ini memungkinkan pengguna untuk belajar dan mempraktikkan bahasa isyarat BISINDO dengan panduan interaktif dan pengenalan gerakan real-time.

## Fitur Utama

- Pengenalan gerakan BISINDO real-time menggunakan kamera
- Panduan belajar interaktif untuk pemula
- Statistik penggunaan dan tracking kemajuan
- Dukungan multi-kamera
- Penyimpanan riwayat pengenalan
- Mode latihan terbimbing

## Teknologi yang Digunakan

### Backend
- Python 3.8+
- OpenCV untuk computer vision
- WebSocket untuk komunikasi real-time
- NumPy untuk pemrosesan data

### Frontend
- Laravel 10
- React.js dengan Inertia.js
- Tailwind CSS untuk styling

## Persyaratan Sistem

- PHP 8.1 atau lebih tinggi
- Python 3.8 atau lebih tinggi
- Node.js 14 atau lebih tinggi
- Composer
- pip (Python package manager)
- Kamera web

## Instalasi

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/iSyarat.git
cd iSyarat
```

### 2. Setup Laravel

Instalasi dependencies PHP:
```bash
composer install
cp .env.example .env
php artisan key:generate
```

Instalasi dependencies Node.js:
```bash
npm install
npm run dev
```

### 3. Setup Python

Persiapan environment Python:
```bash
python -m venv venv

# Untuk Windows
.\venv\Scripts\activate
# Untuk Linux/Mac
source venv/bin/activate
```

Instalasi dependencies Python:
```bash
pip install -r requirements.txt
```

### 4. Konfigurasi Storage

Setup direktori penyimpanan:
```bash
php artisan storage:link
mkdir -p storage/app/public/sessions
```

### 5. Jalankan Aplikasi

Terminal 1 - Server Laravel:
```bash
php artisan serve
```

Terminal 2 - Server WebSocket Python:
```bash
python python/websocket_server.py
```

Terminal 3 - Vite Development Server:
```bash
npm run dev
```

Akses aplikasi melalui browser:
```
http://localhost:8000
```

## Penggunaan

1. Buka halaman utama aplikasi
2. Pilih mode yang diinginkan (Latihan Pemula atau Pengenalan BISINDO)
3. Izinkan akses kamera ketika diminta
4. Ikuti panduan yang tersedia di aplikasi

## Kontribusi

Proyek ini terbuka untuk kontribusi. Jika Anda menemukan bug atau memiliki saran untuk peningkatan:

1. Fork repository
2. Buat branch baru (`git checkout -b fitur-baru`)
3. Commit perubahan (`git commit -am 'Menambahkan fitur baru'`)
4. Push ke branch (`git push origin fitur-baru`)
5. Buat Pull Request

## Troubleshooting

### Masalah Umum

1. **Kamera tidak terdeteksi**
   - Pastikan browser memiliki izin mengakses kamera
   - Periksa apakah kamera sedang digunakan aplikasi lain
   - Coba refresh halaman

2. **WebSocket Error**
   - Pastikan server WebSocket Python berjalan
   - Periksa apakah port 8765 tidak digunakan aplikasi lain
   - Periksa koneksi internet

3. **Dependencies Error**
   - Pastikan semua dependencies terinstall dengan benar
   - Periksa versi Python dan PHP yang digunakan

## Lisensi

Proyek ini dilisensikan di bawah MIT License - lihat file [LICENSE](LICENSE) untuk detail.

## Kontak

Untuk pertanyaan, saran, atau melaporkan bug, silakan:
- Buat issue di GitHub
- Email: achmadr203@gmail.com

</details>

<details>
<summary>🇬🇧 English</summary>

# iSyarat - BISINDO Recognition System

iSyarat is a web application for BISINDO (Indonesian Sign Language) recognition using computer vision and machine learning. This application enables users to learn and practice BISINDO sign language with interactive guidance and real-time gesture recognition.

## Key Features

- Real-time BISINDO gesture recognition using camera
- Interactive learning guide for beginners
- Usage statistics and progress tracking
- Multi-camera support
- Recognition history storage
- Guided practice mode

## Technology Stack

### Backend
- Python 3.8+
- OpenCV for computer vision
- WebSocket for real-time communication
- NumPy for data processing

### Frontend
- Laravel 10
- React.js with Inertia.js
- Tailwind CSS for styling

## System Requirements

- PHP 8.1 or higher
- Python 3.8 or higher
- Node.js 14 or higher
- Composer
- pip (Python package manager)
- Webcam

## Installation

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/iSyarat.git
cd iSyarat
```

### 2. Laravel Setup

Install PHP dependencies:
```bash
composer install
cp .env.example .env
php artisan key:generate
```

Install Node.js dependencies:
```bash
npm install
npm run dev
```

### 3. Python Setup

Prepare Python environment:
```bash
python -m venv venv

# For Windows
.\venv\Scripts\activate
# For Linux/Mac
source venv/bin/activate
```

Install Python dependencies:
```bash
pip install -r requirements.txt
```

### 4. Storage Configuration

Setup storage directories:
```bash
php artisan storage:link
mkdir -p storage/app/public/sessions
```

### 5. Run Application

Terminal 1 - Laravel Server:
```bash
php artisan serve
```

Terminal 2 - Python WebSocket Server:
```bash
python python/websocket_server.py
```

Terminal 3 - Vite Development Server:
```bash
npm run dev
```

Access the application in browser:
```
http://localhost:8000
```

## Usage

1. Open application main page
2. Choose desired mode (Beginner Practice or BISINDO Recognition)
3. Allow camera access when prompted
4. Follow the in-app guidance

## Contributing

This project is open for contributions. If you find bugs or have suggestions for improvements:

1. Fork repository
2. Create new branch (`git checkout -b new-feature`)
3. Commit changes (`git commit -am 'Add new feature'`)
4. Push to branch (`git push origin new-feature`)
5. Create Pull Request

## Troubleshooting

### Common Issues

1. **Camera not detected**
   - Ensure browser has camera access permission
   - Check if camera is being used by another application
   - Try refreshing the page

2. **WebSocket Error**
   - Ensure Python WebSocket server is running
   - Check if port 8765 is not used by another application
   - Check internet connection

3. **Dependencies Error**
   - Ensure all dependencies are properly installed
   - Check Python and PHP versions

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions, suggestions, or bug reports, please:
- Create an issue on GitHub
- Email: achmadr203@gmail.com

</details>

<details>
<summary>🇯🇵 日本語</summary>

# iSyarat - BISINDO認識システム

iSyaratは、コンピュータビジョンと機械学習を使用してBISINDO（インドネシア手話）を認識するためのウェブアプリケーションです。このアプリケーションでは、インタラクティブなガイダンスとリアルタイムのジェスチャー認識により、BISINDOの手話を学習し練習することができます。

## 主な機能

- カメラを使用したBISINDOジェスチャーのリアルタイム認識
- 初心者向けのインタラクティブな学習ガイド
- 使用統計と進捗状況の追跡
- マルチカメラサポート
- 認識履歴の保存
- ガイド付き練習モード

## 使用技術

### バックエンド
- Python 3.8+
- コンピュータビジョン用OpenCV
- リアルタイム通信用WebSocket
- データ処理用NumPy

### フロントエンド
- Laravel 10
- React.js（Inertia.js使用）
- スタイリング用Tailwind CSS

## システム要件

- PHP 8.1以上
- Python 3.8以上
- Node.js 14以上
- Composer
- pip（Pythonパッケージマネージャー）
- ウェブカメラ

[その他の日本語コンテンツ...]

</details>

<details>
<summary>🇷🇺 Русский</summary>

# iSyarat - Система распознавания BISINDO

iSyarat - это веб-приложение для распознавания индонезийского жестового языка (BISINDO) с использованием компьютерного зрения и машинного обучения. Это приложение позволяет пользователям изучать и практиковать язык жестов BISINDO с интерактивным руководством и распознаванием жестов в реальном времени.

## Основные функции

- Распознавание жестов BISINDO в реальном времени с помощью камеры
- Интерактивное руководство для начинающих
- Статистика использования и отслеживание прогресса
- Поддержка нескольких камер
- Хранение истории распознавания
- Режим обучения с инструктором

[Остальной контент на русском...]

</details>

<details>
<summary>🇩🇪 Deutsch</summary>

# iSyarat - BISINDO-Erkennungssystem

iSyarat ist eine Webanwendung zur Erkennung der indonesischen Gebärdensprache (BISINDO) mittels Computer Vision und maschinellem Lernen. Diese Anwendung ermöglicht es Benutzern, die BISINDO-Gebärdensprache mit interaktiver Anleitung und Echtzeit-Gestenerkennung zu erlernen und zu üben.

## Hauptfunktionen

- Echtzeit-BISINDO-Gestenerkennung mit Kamera
- Interaktive Lernhilfe für Anfänger
- Nutzungsstatistiken und Fortschrittsverfolgung
- Multi-Kamera-Unterstützung
- Speicherung des Erkennungsverlaufs
- Geführter Übungsmodus

[Weiterer Inhalt auf Deutsch...]

</details>

<details>
<summary>🇰🇷 한국어</summary>

# iSyarat - BISINDO 인식 시스템

iSyarat는 컴퓨터 비전과 머신 러닝을 사용하여 BISINDO(인도네시아 수화)를 인식하는 웹 애플리케이션입니다. 이 애플리케이션은 사용자가 대화형 가이드와 실시간 제스처 인식을 통해 BISINDO 수화를 배우고 연습할 수 있게 해줍니다.

## 주요 기능

- 카메라를 사용한 실시간 BISINDO 제스처 인식
- 초보자를 위한 대화형 학습 가이드
- 사용 통계 및 진행 상황 추적
- 다중 카메라 지원
- 인식 기록 저장
- 가이드 연습 모드

[한국어 콘텐츠 계속...]

</details>

<details>
<summary>🇨🇳 中文</summary>

# iSyarat - BISINDO识别系统

iSyarat 是一个使用计算机视觉和机器学习进行 BISINDO（印度尼西亚手语）识别的网络应用程序。该应用程序通过交互式指导和实时手势识别，使用户能够学习和练习 BISINDO 手语。

## 主要功能

- 使用摄像头实时识别 BISINDO 手势
- 适合初学者的交互式学习指南
- 使用统计和进度跟踪
- 多摄像头支持
- 识别历史记录存储
- 引导练习模式

[更多中文内容...]

</details>

</div>

---

<div align="center">

**Note**: This project is under active development. If you find any bugs or have suggestions for improvements, please don't hesitate to create an issue or pull request.

</div>
