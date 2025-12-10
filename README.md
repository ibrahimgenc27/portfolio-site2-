# 🌐 Portfolio SPA (Single Page Application)

Web Teknolojileri Dersi - Proje Ödevi

## 📋 Proje Hakkında

Bu proje, modern web teknolojileri kullanılarak geliştirilmiş **tek sayfa uygulama (SPA)** tabanlı bir kişisel portfolio sitesidir. Sayfa yenilenmeden dinamik içerik yükleme, URL yönetimi ve responsive tasarım özelliklerini içerir.

## ✨ Özellikler

### Temel Özellikler
- 🔄 **Dinamik Sayfa Yükleme**: Sayfa yenilenmeden içerik değişimi (SPA mantığı)
- 🔗 **Hash-Based URL Yönetimi**: Tarayıcı adres çubuğu güncelleme
- 📱 **Responsive Tasarım**: Mobil, tablet ve masaüstü uyumlu
- 🍔 **Hamburger Menü**: Mobil cihazlarda kullanıcı dostu navigasyon
- 📝 **Form Validasyonu**: HTML5 + JavaScript ile çift katmanlı doğrulama

### Gelişmiş Özellikler
- 🌙 **Dark/Light Tema**: localStorage ile kalıcı tema tercihi
- 🎨 **Modern Animasyonlar**: CSS transitions ve animations
- ♿ **Erişilebilirlik (A11y)**: ARIA etiketleri ve klavye navigasyonu
- 📊 **Dinamik İlerleme Çubukları**: Yetenek seviyelerini görsel gösterim
- 🔍 **Proje Filtreleme**: Kategoriye göre proje listeleme

## 🛠️ Kullanılan Teknolojiler

### Frontend
| Teknoloji | Açıklama |
|-----------|----------|
| HTML5 | Semantic etiketler (nav, main, section, article, footer) |
| CSS3 | Flexbox, Grid, Custom Properties, Animations |
| JavaScript (ES6+) | const/let, Arrow Functions, async/await, Modules |

### Veri Yönetimi
| Teknoloji | Açıklama |
|-----------|----------|
| fetch API | JSON verisi okuma |
| localStorage | Tema tercihi saklama |
| JSON | Proje ve içerik verileri |

## 📁 Proje Yapısı

```
portfolio-spa/
├── index.html              # Ana HTML dosyası
├── css/
│   └── style.css           # Tüm CSS stilleri
├── js/
│   ├── app.js              # Ana uygulama mantığı
│   ├── router.js           # SPA router modülü
│   └── components.js       # Sayfa bileşenleri
├── data/
│   └── portfolio.json      # Portfolio verileri
├── assets/
│   └── images/             # Görseller
├── README.md               # Bu dosya
└── OgrenciNo.txt           # OBIS için gerekli dosya
```

## 🚀 Kurulum ve Çalıştırma


4. **Tarayıcıda açın:**
   ```
   http://localhost:8000
   ```

### GitHub Pages

Proje GitHub Pages üzerinde yayınlanabilir:
1. Repository ayarlarına gidin
2. Pages bölümünü seçin
3. Branch olarak `main` ve folder olarak `/ (root)` seçin
4. Kaydedin

## 📄 Sayfalar

| Sayfa | URL | Açıklama |
|-------|-----|----------|
| Ana Sayfa | `#home` | Karşılama ve tanıtım |
| Hakkımda | `#about` | Kişisel bilgiler, deneyim ve eğitim |
| Projelerim | `#projects` | Portfolio projeleri (filtrelenebilir) |
| Yeteneklerim | `#skills` | Teknik yetenekler ve seviyeler |
| İletişim | `#contact` | İletişim formu ve bilgiler |

## ✅ Ödev Gereksinimleri Kontrol Listesi

### HTML5 & CSS3
- [x] Semantic HTML etiketleri (`<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`)
- [x] Responsive Tasarım (Media Queries, Flexbox, Grid)
- [x] CSS Animations ve Transitions

### Modern JavaScript (ES6+)
- [x] `const` ve `let` kullanımı (`var` kullanılmadı)
- [x] Arrow Functions (`=>`)
- [x] async/await ve Promise
- [x] Template Literals
- [x] Destructuring
- [x] Spread Operator
- [x] Class yapısı

### Asenkron JavaScript
- [x] fetch() API (JSON verisi okuma)
- [x] JSON verisi işleme ve DOM'a aktarma

### Veri Yönetimi ve Formlar
- [x] localStorage kullanımı (tema tercihi)
- [x] HTML5 form validasyonları
- [x] JavaScript ile özel validasyonlar

### SPA Gereksinimleri
- [x] Dinamik sayfa yükleme (sayfa yenilenmeden)
- [x] Hash-based URL yönetimi
- [x] Hamburger menü (mobil)
- [x] İletişim formu

## 📱 Responsive Breakpoints

| Cihaz | Genişlik | Özellikler |
|-------|----------|------------|
| Mobil | < 480px | Tek sütun, hamburger menü |
| Tablet | 480px - 768px | Hamburger menü, optimize layout |
| Masaüstü | > 768px | Tam menü, çok sütunlu grid |

## 🎨 Renk Paleti

| Renk | Hex | Kullanım |
|------|-----|----------|
| Primary | `#6366f1` | Ana vurgu rengi |
| Secondary | `#ec4899` | İkincil vurgu |
| Accent | `#14b8a6` | Aksan rengi |
| Background | `#ffffff` / `#0f172a` | Arkaplan (light/dark) |
| Text | `#1e293b` / `#f1f5f9` | Metin (light/dark) |

## 📝 Kod Açıklamaları

Tüm JavaScript ve CSS dosyaları **Türkçe açıklama satırları** içermektedir. Her fonksiyon ve stil bloğu:
- Ne işe yaradığı
- Kullandığı ödev gereksinimleri
- Önemli notlar

ile açıklanmıştır.


## 👤 Geliştirici

**Öğrenci Bilgileri**

- **İsim**: [İsim Soyisim]
- **Öğrenci No**: [Öğrenci Numarası]
- **Ders**: ISE-201 Web Teknolojileri

