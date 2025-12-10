/* ==============================================================
   ROUTER.JS - SPA Yönlendirme Modülü
   
   Bu modül hash-based routing sistemini yönetir.
   Sayfa yenilenmeden URL değişikliklerini algılar ve
   ilgili içeriği dinamik olarak yükler.
   
   Ödev Gereksinimleri:
   - URL Yönetimi: Tarayıcı adres çubuğu güncellenmeli
   - Sayfa yenilenmeden içerik değişmeli (SPA mantığı)
   ============================================================== */

// "use strict" - Katı mod, hataları önler
"use strict";

/* ==============================================================
   ROUTER SINIFI
   Hash-based SPA router implementasyonu
   ============================================================== */

// Router sınıfı - ES6+ class yapısı kullanımı
class Router {
    // Constructor - Sınıf başlatıcı
    constructor() {
        // Rota tanımlamaları - Her hash için bir handler fonksiyonu
        this.routes = {};
        
        // Varsayılan rota
        this.defaultRoute = 'home';
        
        // Mevcut aktif rota
        this.currentRoute = null;
        
        // Router'ı başlat
        this.init();
    }
    
    /* ==============================================================
       ROUTER BAŞLATMA
       Event listener'ları ekler ve ilk rotayı yükler
    ============================================================== */
    init() {
        // hashchange event - URL hash değiştiğinde tetiklenir
        // Arrow function kullanımı (ES6+ gereksinimi)
        window.addEventListener('hashchange', () => this.handleRouteChange());
        
        // Sayfa ilk yüklendiğinde de çalıştır
        window.addEventListener('DOMContentLoaded', () => this.handleRouteChange());
    }
    
    /* ==============================================================
       ROTA EKLEME
       Yeni bir rota ve handler fonksiyonu ekler
       @param {string} path - Rota yolu (örn: 'home', 'about')
       @param {function} handler - Çağrılacak fonksiyon
    ============================================================== */
    addRoute(path, handler) {
        // Rotayı kaydet
        this.routes[path] = handler;
    }
    
    /* ==============================================================
       ROTA DEĞİŞİKLİĞİ YÖNETİMİ
       URL hash değiştiğinde çağrılır
    ============================================================== */
    handleRouteChange() {
        // Mevcut hash'i al (# işaretini kaldır)
        // location.hash boşsa varsayılan rota kullan
        const hash = window.location.hash.slice(1) || this.defaultRoute;
        
        // Geçerli bir rota mı kontrol et
        if (this.routes[hash]) {
            // Önceki rotayı güncelle
            this.currentRoute = hash;
            
            // Handler fonksiyonunu çağır
            this.routes[hash]();
            
            // Navigasyon linklerini güncelle
            this.updateNavLinks(hash);
            
            // Sayfanın en üstüne kaydır
            this.scrollToTop();
        } else {
            // Geçersiz rota - varsayılana yönlendir
            this.navigate(this.defaultRoute);
        }
    }
    
    /* ==============================================================
       PROGRAMATIK YÖNLENDİRME
       JavaScript ile rota değiştirmek için kullanılır
       @param {string} path - Gidilecek rota
    ============================================================== */
    navigate(path) {
        // URL hash'ini güncelle
        window.location.hash = path;
    }
    
    /* ==============================================================
       NAVİGASYON LİNKLERİNİ GÜNCELLEME
       Aktif menü öğesini vurgular
       @param {string} activeRoute - Aktif rota adı
    ============================================================== */
    updateNavLinks(activeRoute) {
        // Tüm nav linklerini seç
        const navLinks = document.querySelectorAll('.nav-link');
        
        // forEach ile döngü (ES6+ array method)
        navLinks.forEach(link => {
            // data-page attribute'unu al
            const page = link.dataset.page;
            
            // Aktif sınıfı ekle/kaldır
            if (page === activeRoute) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    /* ==============================================================
       SAYFANIN BAŞINA KAYDIRMA
       Rota değiştiğinde sayfayı en üste kaydırır
    ============================================================== */
    scrollToTop() {
        // smooth scroll davranışı
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    /* ==============================================================
       MEVCUT ROTAYI GETIR
       @returns {string} - Mevcut aktif rota
    ============================================================== */
    getCurrentRoute() {
        return this.currentRoute;
    }
}

// Global router instance oluştur
// const kullanımı (var yerine - ES6+ gereksinimi)
const router = new Router();

/* ==============================================================
   SAYFA YÜKLEME YARDIMCI FONKSİYONLARI
   ============================================================== */

// Ana içerik alanını al
// const kullanımı
const getAppElement = () => document.getElementById('app');

// İçerik yükleme fonksiyonu
// Arrow function kullanımı (ES6+ gereksinimi)
const loadContent = (htmlContent) => {
    const app = getAppElement();
    if (app) {
        // Fade out animasyonu
        app.style.opacity = '0';
        
        // Kısa gecikme ile içeriği değiştir
        setTimeout(() => {
            app.innerHTML = htmlContent;
            // Fade in animasyonu
            app.style.opacity = '1';
            app.style.transition = 'opacity 0.3s ease';
        }, 150);
    }
};
