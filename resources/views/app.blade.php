<!DOCTYPE html>
<html lang="id">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="theme-color" content="#3B82F6">
        <title>iSyarat</title>
        <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('logo.png') }}">
        <link rel="icon" type="image/png" sizes="16x16" href="{{ asset('logo.png') }}">
        <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('logo.png') }}">
        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.jsx'])
        @inertiaHead
        <style>
            html {
                text-size-adjust: 100%;
            }
        </style>
    </head>
    <body>
        @inertia
    </body>
</html> 