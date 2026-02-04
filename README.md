# SAT - Scroll Animation Tool 🚀

[![SAT Banner](https://via.placeholder.com/800x200/4e65ff/ffffff?text=SAT+-+Scroll+Animation+Tool+v2.0.0)](https://bloxarynid.github.io/sat)
[![Version](https://img.shields.io/badge/version-2.0.0-blue)](https://github.com/BloxaryID/sat)
[![License](https://img.shields.io/badge/license-MIT-green)](https://github.com/BloxaryID/sat/blob/main/LICENSE)

> **SAT (Scroll Animation Tool)** - Library animasi scroll yang ringan, powerful, dan mudah digunakan dengan sistem **Dual Animation** (Transition & Keyframe).

## ✨ Live Demo
🌐 **[Lihat Demo & Contoh](https://bloxarynid.github.io/sat/)**

---

## 🎯 Fitur Unggulan

- **🔥 60+ Animasi** siap pakai dengan 2 sistem berbeda
- **🎭 Dual System** - Pilih antara `transition` CSS atau `keyframe animation`
- **⚡ Pure CSS** - Tanpa dependensi JavaScript berat
- **📱 Responsif** - Otomatis adaptif untuk semua perangkat
- **🎨 Customizable** - Kontrol penuh dengan class sederhana
- **🚀 Optimized** - Performa tinggi dengan `will-change`
- **🔧 No Conflict** - Deteksi otomatis konflik sistem

---

## 📦 Instalasi

SAT tersedia dalam 2 versi terpisah untuk memudahkan penggunaan:

### **🔄 Versi Transition System** (CSS Transition)
Untuk animasi yang smooth dan berbasis transition CSS.

```html
<!-- SAT CSS Transition -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/bloxarynid/sat@main/sat/sat.css">

<!-- SAT JavaScript -->
<script src="https://cdn.jsdelivr.net/gh/bloxarynid/sat@main/script/script.js"></script>
```

🎞️ Versi Animation System (Keyframe Animation)

Untuk animasi yang lebih kompleks dan berbasis keyframe CSS.

```html
<!-- SAT CSS Animation -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/bloxarynid/sat@main/sat/animation.sat.css">

<!-- SAT JavaScript Animation -->
<script src="https://cdn.jsdelivr.net/gh/bloxarynid/sat@main/script/animation.sat.js"></script>
```

📥 Manual Download

1. Download dari GitHub Releases
2. Pilih versi yang diinginkan:
   · SAT-Transition.zip - Hanya sistem transition
   · SAT-Animation.zip - Hanya sistem animation
   · SAT-Full.zip - Kedua sistem lengkap

---

🚀 Mulai Cepat

1. Basic Usage

```html
<!-- Menggunakan Transition System -->
<div class="sat-fade-up">
  Animasi dengan sistem transition
</div>

<!-- Menggunakan Animation System -->
<div class="sat-fade-up">
  Animasi dengan sistem keyframe
</div>
```

2. Dengan Kontrol Lengkap

```html
<!-- Transition System dengan kontrol -->
<div class="sat-zoom-in 
            sat-duration-800 
            sat-delay-200 
            sat-easing-ease-out-back">
  Zoom in dengan durasi 800ms, delay 200ms
</div>

<!-- Animation System dengan kontrol -->
<div class="sat-slide-left
            sat-duration-1000
            sat-delay-300
            sat-easing-ease-in-out">
  Slide left dengan durasi 1 detik, delay 300ms
</div>
```

3. Auto-initialization

SAT akan otomatis terinisialisasi. Untuk kontrol manual:

```javascript
// Opsional: Inisialisasi dengan konfigurasi
SAT.init();

// Atau dengan pengaturan khusus
SAT.init({
  threshold: 0.1,        // Trigger saat 10% elemen terlihat
  rootMargin: '50px',    // Margin tambahan
  once: true             // Animasi hanya sekali
});
```

---

🎨 Sistem Animasi

SAT memiliki 2 sistem animasi terpisah yang tidak boleh dicampur:

🔄 Sistem Transition (CSS Transition)

Menggunakan CSS transition untuk animasi yang smooth.

```html
<div class="sat-fade-up">
  <!-- Menggunakan transition CSS -->
</div>
```

🎞️ Sistem Animation (CSS Keyframes)

Menggunakan CSS @keyframes untuk animasi yang lebih kompleks.

```html
<div class="sat-zoom-in">
  <!-- Menggunakan keyframe animation -->
</div>
```

---

📋 Daftar Animasi

🎭 Animasi Fade

Class Description Transition Animation
sat-fade-up Muncul dari bawah ✅ ✅
sat-fade-down Muncul dari atas ✅ ✅
sat-fade-left Muncul dari kanan ✅ ✅
sat-fade-right Muncul dari kiri ✅ ✅
sat-fade-up-left Muncul dari kanan bawah ✅ ✅
sat-fade-up-right Muncul dari kiri bawah ✅ ✅
sat-fade-down-left Muncul dari kanan atas ✅ ✅
sat-fade-down-right Muncul dari kiri atas ✅ ✅

🔍 Animasi Zoom

Class Description Transition Animation
sat-zoom-in Zoom masuk dari kecil ✅ ✅
sat-zoom-out Zoom keluar dari besar ✅ ✅
sat-zoom-in-up Zoom masuk dari bawah ✅ ✅
sat-zoom-in-down Zoom masuk dari atas ✅ ✅
sat-zoom-in-left Zoom masuk dari kanan ✅ ✅
sat-zoom-in-right Zoom masuk dari kiri ✅ ✅
sat-zoom-out-up Zoom keluar ke atas ✅ ✅
sat-zoom-out-down Zoom keluar ke bawah ✅ ✅

➡️ Animasi Slide

Class Description Transition Animation
sat-slide-up Geser dari bawah ✅ ✅
sat-slide-down Geser dari atas ✅ ✅
sat-slide-left Geser dari kanan ✅ ✅
sat-slide-right Geser dari kiri ✅ ✅

🔄 Animasi Flip

Class Description Transition Animation
sat-flip-left Flip dari kiri ✅ ✅
sat-flip-right Flip dari kanan ✅ ✅
sat-flip-up Flip dari atas ✅ ✅
sat-flip-down Flip dari bawah ✅ ✅

🌫️ Animasi Blur

Class Description Transition Animation
sat-blur Blur sederhana ✅ ✅
sat-blur-up Blur dari bawah ✅ ✅
sat-blur-down Blur dari atas ✅ ✅
sat-blur-left Blur dari kanan ✅ ✅
sat-blur-right Blur dari kiri ✅ ✅
sat-blur-zoom-in Blur + zoom in ✅ ✅
sat-blur-zoom-out Blur + zoom out ✅ ✅
sat-blur-glass Efek glassmorphism ✅ ✅

---

⚙️ Kontrol & Customisasi

🕒 Durasi (50ms - 3000ms)

```html
<!-- Gunakan pattern: sat-duration-{value} -->
<div class="sat-fade-up sat-duration-300">Cepat (300ms)</div>
<div class="sat-fade-up sat-duration-1000">Standard (1 detik)</div>
<div class="sat-fade-up sat-duration-2000">Lambat (2 detik)</div>
```

⏱️ Delay (0ms - 3000ms)

```html
<!-- Gunakan pattern: sat-delay-{value} -->
<div class="sat-fade-up sat-delay-0">Tanpa delay</div>
<div class="sat-fade-up sat-delay-500">Delay 500ms</div>
<div class="sat-fade-up sat-delay-1000">Delay 1 detik</div>
```

📈 Easing Functions

```html
<!-- Linear -->
<div class="sat-fade-up sat-easing-linear">Linear</div>

<!-- Standard -->
<div class="sat-fade-up sat-easing-ease">Ease</div>

<!-- Advanced -->
<div class="sat-fade-up sat-easing-ease-in-back">Ease In Back</div>
<div class="sat-fade-up sat-easing-ease-out-back">Ease Out Back</div>
```

⚡ Optimasi Performa

```html
<div class="sat-fade-up sat-optimize">
  Optimized dengan will-change
</div>
```

📱 Responsif

```html
<!-- Nonaktifkan di mobile -->
<div class="sat-fade-up sat-mobile-disable">
  Tidak animasi di perangkat mobile
</div>
```

---

💻 API Reference

Metode JavaScript

```javascript
// Inisialisasi SAT
SAT.init();

// Refresh semua animasi
SAT.refresh();

// Reset semua animasi ke state awal
SAT.reset();

// Toggle semua animasi (show/hide)
SAT.toggle();

// Dapatkan informasi versi
SAT.getVersion(); // "2.0.0"

// Debug: lihat sistem info
SAT.getSystemInfo();
// Output: { total: 10, transition: 7, animation: 3, mixed: 0 }
```

📡 Events

```javascript
// Saat animasi masuk viewport
document.addEventListener('sat:in', function(event) {
  console.log('Animasi masuk:', event.detail);
  // event.detail = { element: Element, system: 'transition'|'animation' }
});

// Saat animasi keluar viewport
document.addEventListener('sat:out', function(event) {
  console.log('Animasi keluar:', event.detail);
});
```

---

🎯 Contoh Lengkap

Contoh Transition System

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contoh SAT Transition System</title>
  
  <!-- Include SAT Transition System -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/bloxarynid/sat@main/sat/sat.css">
  
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial, sans-serif; padding: 20px; }
    section { min-height: 100vh; padding: 50px 20px; }
    .hero { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
    .card { background: white; padding: 30px; margin: 20px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
  </style>
</head>
<body>
  
  <section class="hero">
    <div class="sat-fade-down sat-duration-1000">
      <h1 style="font-size: 3em; margin-bottom: 20px;">🔄 SAT Transition System</h1>
      <p style="font-size: 1.2em;">Menggunakan CSS Transition untuk animasi smooth</p>
    </div>
  </section>
  
  <section>
    <div class="sat-zoom-in sat-duration-800">
      <div class="card">
        <h2>✨ Animasi Zoom</h2>
        <p>Menggunakan sistem transition CSS</p>
      </div>
    </div>
  </section>
  
  <script src="https://cdn.jsdelivr.net/gh/bloxarynid/sat@main/script/script.js"></script>
</body>
</html>
```

Contoh Animation System

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contoh SAT Animation System</title>
  
  <!-- Include SAT Animation System -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/bloxarynid/sat@main/sat/animation.sat.css">
  
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial, sans-serif; padding: 20px; }
    section { min-height: 100vh; padding: 50px 20px; }
    .hero { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
    .card { background: white; padding: 30px; margin: 20px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
  </style>
</head>
<body>
  
  <section class="hero">
    <div class="sat-fade-up sat-duration-1000">
      <h1 style="font-size: 3em; margin-bottom: 20px;">🎞️ SAT Animation System</h1>
      <p style="font-size: 1.2em;">Menggunakan CSS Keyframes untuk animasi kompleks</p>
    </div>
  </section>
  
  <section>
    <div class="sat-flip-left sat-duration-1000">
      <div class="card">
        <h2>🔄 Animasi Flip</h2>
        <p>Menggunakan sistem keyframe animation</p>
      </div>
    </div>
  </section>
  
  <script src="https://cdn.jsdelivr.net/gh/bloxarynid/sat@main/script/animation.sat.js"></script>
</body>
</html>
```

---

🛠️ Custom Animasi

Buat Animasi Custom dengan SAT System

```css
/* Custom animation dengan SAT system */
.custom-rotate {
  opacity: 0;
  transform: rotate(-180deg);
  transition: opacity var(--sat-duration, 0.5s) var(--sat-easing, ease),
              transform var(--sat-duration, 0.5s) var(--sat-easing, ease);
}

.custom-rotate.sat-animate {
  opacity: 1;
  transform: rotate(0deg);
}
```

```html
<div class="custom-rotate sat-duration-1000 sat-delay-300">
  Custom rotation animation
</div>
```

---

⚠️ Important Notes

❌ JANGAN MENCAMPUR VERSI!

```html
<!-- ❌ SALAH: Mixing conflict! -->
<!-- Jangan gunakan CSS transition dan animation di file yang sama -->
<link rel="stylesheet" href="sat.css">
<link rel="stylesheet" href="animation.sat.css">

<!-- ✅ BENAR: Pilih salah satu versi -->
<!-- Versi Transition System -->
<link rel="stylesheet" href="sat.css">

<!-- ATAU -->
<!-- Versi Animation System -->
<link rel="stylesheet" href="animation.sat.css">
```

📱 Browser Support

SAT mendukung semua browser modern:

· Chrome 60+
· Firefox 55+
· Safari 12+
· Edge 79+
· Opera 50+

⚡ Best Practices

1. Gunakan sat-optimize untuk elemen kompleks
2. Hindari animasi terlalu banyak secara bersamaan
3. Gunakan sat-mobile-disable untuk performa mobile
4. Test di berbagai device dan browser

---

🔧 Troubleshooting

Animasi Tidak Muncul?

1. Pastikan file CSS & JS terload
2. Cek console untuk error
3. Pastikan elemen memiliki tinggi yang cukup
4. Coba SAT.refresh() untuk reset

Animasi Kasar/Lag?

```html
<!-- Tambahkan class optimasi -->
<div class="sat-fade-up sat-optimize">
  Optimized element
</div>

<!-- Atau nonaktifkan di mobile -->
<div class="sat-transition-fade-up sat-optimize">
  Optimized element
</div>

<!-- Atau nonaktifkan di mobile -->
<div class="sat-fade-up sat-mobile-disable">
  Disabled on mobile
</div>
```

Debug System

```javascript
// Cek informasi sistem
console.log(SAT.getSystemInfo());

// Cek elemen dengan konflik
document.querySelectorAll('.sat-mixing-warning').forEach(el => {
  console.warn('Mixing conflict:', el);
});
```

---

🤝 Berkontribusi

Kontribusi sangat diterima! Ikuti langkah berikut:

1. Fork repository
2. Buat branch fitur baru (git checkout -b feature/amazing-feature)
3. Commit perubahan (git commit -m 'Add amazing feature')
4. Push ke branch (git push origin feature/amazing-feature)
5. Buka Pull Request

---

📄 Lisensi

MIT License © 2026 Bloxaryn.id

Dibuat dengan ❤️ oleh Bloxaryn.id

---

🙏 Credits & Inspiration

· Terinspirasi oleh AOS oleh Michał Sajnóg
· Icon dari FontAwesome
· Gradient dari UI Gradients

---

🎉 SAT v2.0.0

Dual Animation System
By Bloxaryn.id - 2026

---

💡 Tips

Pilih sistem yang tepat untuk kebutuhan Anda:

· 🔄 Transition System: Cocok untuk animasi sederhana, smooth, dan ringan
· 🎞️ Animation System: Cocok untuk animasi kompleks dengan timing yang presisi

Gunakan versi terpisah untuk optimasi:

· Jika hanya butuh transition, gunakan SAT Transition System
· Jika hanya butuh animation, gunakan SAT Animation System
· Jika butuh keduanya, gunakan SAT Full Version
