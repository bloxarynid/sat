[![SAT - Scroll Animation Tool](https://via.placeholder.com/800x200/667eea/ffffff?text=SAT+-+Scroll+Animation+Tool)](https://bloxaryid.github.io/sat)

[![NPM version](https://img.shields.io/badge/version-1.1.0-blue)](https://github.com/BloxaryID/sat)
[![License](https://img.shields.io/badge/license-MIT-green)](https://github.com/BloxaryID/sat/blob/main/LICENSE)

---

## 🚀 [Demo & Contoh](https://bloxarynid.github.io/sat/)

### 🌟 Fitur Utama
- **60+ Animasi** siap pakai
- **Pure CSS** tanpa dependensi berat
- **Responsif** untuk semua perangkat
- **Customizable** dengan class sederhana
- **Optimized** untuk performa terbaik

---

## ⚙️ Instalasi

### Instalasi Dasar

Tambahkan stylesheet di `<head>`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/bloxarynid/sat@main/sat/sat.css">
```

Tambahkan script sebelum penutup </body>:

```html
<script src="https://cdn.jsdelivr.net/gh/bloxarynid/sat@main/script/script.js"></script>
```

---

🤔 Cara Penggunaan

1. Inisialisasi (Opsional):

```javascript
// Opsional: Inisialisasi dengan pengaturan khusus
SAT.init({
  // Pengaturan global:
  disable: false, // menonaktifkan di perangkat tertentu: 'phone', 'tablet', 'mobile'
  startEvent: 'DOMContentLoaded', // event untuk inisialisasi
  once: false, // animasi hanya sekali saat scroll
  mirror: false, // animasi keluar saat scroll lewat
  offset: 100, // offset dari trigger point
  delay: 0, // delay animasi (0-3000ms)
  duration: 500, // durasi animasi (0-3000ms)
  easing: 'ease', // easing function default
  throttleDelay: 99, // throttle delay untuk scroll
});
```

2. Gunakan class SAT pada elemen:

```html
<div class="sat-fade-up">
  Elemen dengan animasi fade up
</div>
```

3. Kontrol animasi dengan class tambahan:

```html
<div 
  class="sat-zoom-in sat-duration-800 sat-delay-200 sat-easing-ease-out-back"
>
  Animasi zoom in dengan durasi 800ms, delay 200ms, easing ease-out-back
</div>
```

---

🎨 Animasi Tersedia

Animasi Fade

· sat-fade-up - Muncul dari bawah

· sat-fade-down - Muncul dari atas

· sat-fade-left - Muncul dari kanan

· sat-fade-right - Muncul dari kiri

· sat-fade-up-left - Muncul dari kanan bawah

· sat-fade-up-right - Muncul dari kiri bawah

· sat-fade-down-left - Muncul dari kanan atas

· sat-fade-down-right - Muncul dari kiri atas


Animasi Zoom

· sat-zoom-in - Zoom masuk dari kecil

· sat-zoom-out - Zoom keluar dari besar

· sat-zoom-in-up - Zoom masuk dari bawah

· sat-zoom-in-down - Zoom masuk dari atas

· sat-zoom-in-left - Zoom masuk dari kanan

· sat-zoom-in-right - Zoom masuk dari kiri

· sat-zoom-out-up - Zoom keluar ke atas

· sat-zoom-out-down - Zoom keluar ke bawah

· sat-zoom-out-left - Zoom keluar ke kiri

· sat-zoom-out-right - Zoom keluar ke kanan


Animasi Slide

· sat-slide-up - Geser dari bawah

· sat-slide-down - Geser dari atas

· sat-slide-left - Geser dari kanan

· sat-slide-right - Geser dari kiri


Animasi Flip

· sat-flip-left - Flip dari kiri

· sat-flip-right - Flip dari kanan

· sat-flip-up - Flip dari atas

· sat-flip-down - Flip dari bawah


Animasi Blur

· sat-blur - Blur sederhana

· sat-blur-up - Blur dari bawah

· sat-blur-down - Blur dari atas

· sat-blur-left - Blur dari kanan

· sat-blur-right - Blur dari kiri

· sat-blur-zoom-in - Blur + zoom in

· sat-blur-zoom-out - Blur + zoom out

· sat-blur-glass - Efek glassmorphism

---


⚙️ Kontrol Animasi

Durasi (50ms - 3000ms)

```html
<div class="sat-fade-up sat-duration-300">Cepat (300ms)</div>
<div class="sat-fade-up sat-duration-1000">Sedang (1000ms)</div>
<div class="sat-fade-up sat-duration-2000">Lambat (2000ms)</div>
```

Delay (0ms - 3000ms)

```html
<div class="sat-fade-up sat-delay-500">Delay 500ms</div>
<div class="sat-fade-up sat-delay-1000">Delay 1000ms</div>
<div class="sat-fade-up sat-delay-2000">Delay 2000ms</div>
```

Easing Functions

```html
<div class="sat-fade-up sat-easing-linear">Linear</div>
<div class="sat-fade-up sat-easing-ease-in">Ease In</div>
<div class="sat-fade-up sat-easing-ease-out">Ease Out</div>
<div class="sat-fade-up sat-easing-ease-in-out">Ease In-Out</div>
<div class="sat-fade-up sat-easing-ease-in-back">Ease In Back</div>
<div class="sat-fade-up sat-easing-ease-out-back">Ease Out Back</div>
```

Fitur Khusus

· sat-optimize - Optimasi performa dengan will-change
· sat-mobile-disable - Nonaktifkan animasi di mobile

---

📱 Responsif

SAT otomatis responsif untuk semua ukuran layar. Gunakan class sat-mobile-disable untuk menonaktifkan animasi di mobile:

```html
<div class="sat-fade-up sat-mobile-disable">
  Animasi dinonaktifkan di perangkat mobile
</div>
```

---

🔧 API

Metode yang Tersedia

```javascript
// Inisialisasi SAT
SAT.init(settings);

// Refresh offset dan posisi elemen
SAT.refresh();

// Refresh hard (reinisialisasi semua elemen)
SAT.refreshHard();

// Toggle semua animasi
SAT.toggle();

// Reset semua animasi
SAT.reset();
```

Events

```javascript
document.addEventListener('sat:in', ({ detail }) => {
  console.log('Elemen animasi masuk:', detail);
});

document.addEventListener('sat:out', ({ detail }) => {
  console.log('Elemen animasi keluar:', detail);
});
```

---

🎯 Contoh Lengkap

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contoh SAT</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/BloxaryID/sat@main/sat/sat.css">
</head>
<body>
  <!-- Hero Section -->
  <section class="hero sat-fade-down sat-duration-1000">
    <h1>Selamat Datang di SAT</h1>
    <p class="sat-fade-up sat-delay-300">Scroll Animation Tool oleh Bloxaryn.id</p>
  </section>

  <!-- Fitur -->
  <section class="features">
    <div class="feature sat-zoom-in sat-duration-800">
      <h3>🎨 60+ Animasi</h3>
      <p>Banyak pilihan animasi siap pakai</p>
    </div>
    <div class="feature sat-zoom-in sat-duration-800 sat-delay-200">
      <h3>⚡ Pure CSS</h3>
      <p>Tanpa dependensi JavaScript berat</p>
    </div>
  </section>

  <!-- Script -->
  <script src="https://cdn.jsdelivr.net/gh/BloxaryID/sat@main/script/script.js"></script>
  <script>
    SAT.init({
      once: true,
      duration: 800,
      offset: 100
    });
  </script>
</body>
</html>
```

---

🛠️ Custom Animasi

Tambahkan Animasi Custom

```css
.custom-animation {
  opacity: 0;
  transform: rotate(-180deg);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.custom-animation.sat-animate {
  opacity: 1;
  transform: rotate(0deg);
}
```

Gunakan di HTML

```html
<div class="custom-animation sat-duration-1000">
  Animasi custom rotation
</div>
```

---

📝 Catatan Penting

Durasi dan Delay

Durasi dan delay mendukung nilai dari 50ms hingga 3000ms dengan step 50ms.

Performa

Gunakan class sat-optimize untuk elemen yang memerlukan performa tinggi:

```html
<div class="sat-fade-up sat-optimize">Optimized untuk performa</div>
```

Browser Support

SAT mendukung semua browser modern termasuk:

· Chrome 50+
· Firefox 45+
· Safari 10+
· Edge 15+
· Opera 40+

---

🤝 Kontribusi

Kontribusi sangat diterima! Silakan:

1. Fork repository
2. Buat branch fitur (git checkout -b fitur-baru)
3. Commit perubahan (git commit -m 'Menambahkan fitur baru')
4. Push ke branch (git push origin fitur-baru)
5. Buat Pull Request

---

📄 Lisensi

MIT License © 2026 Bloxaryn.id

---

👨‍💻 Author

Bloxaryn.id

· GitHub: @BloxarynID
· TikTok: @bloxaryid
· Website: bloxarynid.github.io

---

🙏 Credits

Terinspirasi oleh AOS oleh Michał Sajnóg

---

**Versi: 1.0.0**  
**By Bloxaryn.id** - 2026
