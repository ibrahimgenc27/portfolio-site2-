/* ==============================================================
   APP.JS - Ana Uygulama Modülü
   
   Bu dosya uygulamanın ana giriş noktasıdır.
   Router'ı yapılandırır, event listener'ları ekler ve
   uygulamayı başlatır.
   ============================================================== */

"use strict";

/* ==============================================================
   DOM ELEMENTLERİ
   Sayfa yüklendikten sonra seçilecek elementler
   ============================================================== */

// const kullanımı - değişmeyecek referanslar
const elements = {
    app: null,          // Ana içerik alanı
    header: null,       // Header elementi
    hamburger: null,    // Hamburger menü butonu
    nav: null,          // Navigasyon menüsü
    themeToggle: null,  // Tema değiştirme butonu
    scrollTop: null     // Yukarı kaydırma butonu
};

/* ==============================================================
   UYGULAMA BAŞLATMA
   DOM yüklendikten sonra çalışır
   ============================================================== */

// DOMContentLoaded event - Sayfa tamamen yüklendikten sonra çalışır
document.addEventListener('DOMContentLoaded', () => {
    // DOM elementlerini seç ve kaydet
    initializeElements();

    // Router'ı yapılandır
    setupRouter();

    // Event listener'ları ekle
    setupEventListeners();

    // Tema tercihini localStorage'dan yükle
    loadThemePreference();

    // Konsola bilgi mesajı
    console.log('Portfolio SPA başarıyla yüklendi! 🚀');
});

/* ==============================================================
   ELEMENT SEÇİMİ
   Sık kullanılan DOM elementlerini seçer ve saklar
   ============================================================== */

const initializeElements = () => {
    elements.app = document.getElementById('app');
    elements.header = document.getElementById('header');
    elements.hamburger = document.getElementById('hamburger');
    elements.nav = document.getElementById('nav');
    elements.themeToggle = document.getElementById('themeToggle');
    elements.scrollTop = document.getElementById('scrollTop');
};

/* ==============================================================
   ROUTER YAPILANDIRMASI
   Tüm rotaları tanımlar
   ============================================================== */

const setupRouter = () => {
    // Ana sayfa rotası
    router.addRoute('home', async () => {
        const html = await renderHomePage();
        loadContent(html);
    });

    // Hakkımda rotası
    router.addRoute('about', async () => {
        const html = await renderAboutPage();
        loadContent(html);

        // Tab event listener'larını ekle (sayfa yüklendikten sonra)
        setTimeout(() => {
            setupTabListeners();
        }, 200);
    });

    // Projeler rotası
    router.addRoute('projects', async () => {
        const html = await renderProjectsPage();
        loadContent(html);

        // Filtre event listener'larını ekle
        setTimeout(() => {
            setupFilterListeners();
        }, 200);
    });

    // Yetenekler rotası
    router.addRoute('skills', async () => {
        const html = await renderSkillsPage();
        loadContent(html);

        // Skill bar animasyonlarını başlat
        setTimeout(() => {
            animateSkillBars();
        }, 200);
    });

    // İletişim rotası
    router.addRoute('contact', async () => {
        const html = await renderContactPage();
        loadContent(html);

        // Form event listener'larını ekle
        setTimeout(() => {
            setupFormListeners();
        }, 200);
    });
};

/* ==============================================================
   EVENT LISTENER'LAR
   Kullanıcı etkileşimlerini yönetir
   ============================================================== */

const setupEventListeners = () => {
    // Hamburger menü tıklama
    if (elements.hamburger) {
        elements.hamburger.addEventListener('click', toggleMobileMenu);
    }

    // Tema değiştirme butonu tıklama
    if (elements.themeToggle) {
        elements.themeToggle.addEventListener('click', toggleTheme);
    }

    // Scroll eventi - Header gölgesi ve scroll-top butonu
    window.addEventListener('scroll', handleScroll);

    // Navigasyon linkleri - Mobil menüyü kapat
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Mobil menü açıksa kapat
            if (elements.nav && elements.nav.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });

    // Sayfa yukarı kaydırma butonu
    if (elements.scrollTop) {
        elements.scrollTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Escape tuşu - Mobil menüyü kapat
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && elements.nav && elements.nav.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
};

/* ==============================================================
   MOBİL MENÜ YÖNETİMİ
   Hamburger menü açma/kapama işlemi
   ============================================================== */

const toggleMobileMenu = () => {
    // Hamburger butonuna active sınıfı ekle/kaldır
    elements.hamburger.classList.toggle('active');

    // Navigasyona active sınıfı ekle/kaldır
    elements.nav.classList.toggle('active');

    // ARIA attribute güncelle (erişilebilirlik)
    const isExpanded = elements.hamburger.classList.contains('active');
    elements.hamburger.setAttribute('aria-expanded', isExpanded);

    // Body scroll'u kilitle/aç
    document.body.style.overflow = isExpanded ? 'hidden' : '';
};

/* ==============================================================
   TEMA YÖNETİMİ
   Dark/Light tema değişimi ve localStorage'da saklama
   ============================================================== */

const toggleTheme = () => {
    // Mevcut temayı al
    const currentTheme = document.documentElement.getAttribute('data-theme');

    // Yeni temayı belirle
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    // Temayı uygula
    document.documentElement.setAttribute('data-theme', newTheme);

    // Tema ikonunu güncelle
    const icon = elements.themeToggle.querySelector('i');
    if (icon) {
        icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    // localStorage'a kaydet (ödev gereksinimi)
    localStorage.setItem('portfolio-theme', newTheme);

    console.log(`Tema değiştirildi: ${newTheme}`);
};

// Sayfa yüklendiğinde tema tercihini yükle
const loadThemePreference = () => {
    // localStorage'dan tema tercihini al
    const savedTheme = localStorage.getItem('portfolio-theme');

    // Sistem teması tercihini kontrol et
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Kaydedilmiş tema varsa onu kullan, yoksa sistem tercihini kullan
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');

    // Temayı uygula
    document.documentElement.setAttribute('data-theme', theme);

    // İkonu güncelle
    const icon = elements.themeToggle?.querySelector('i');
    if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
};

/* ==============================================================
   SCROLL YÖNETİMİ
   Sayfa kaydırıldığında header ve scroll-top butonu güncelleme
   ============================================================== */

const handleScroll = () => {
    const scrollY = window.scrollY;

    // Header'a gölge ekle (50px'den fazla scroll edildiğinde)
    if (elements.header) {
        if (scrollY > 50) {
            elements.header.classList.add('scrolled');
        } else {
            elements.header.classList.remove('scrolled');
        }
    }

    // Scroll-top butonunu göster/gizle (300px'den fazla scroll edildiğinde)
    if (elements.scrollTop) {
        if (scrollY > 300) {
            elements.scrollTop.classList.add('visible');
        } else {
            elements.scrollTop.classList.remove('visible');
        }
    }
};

/* ==============================================================
   TAB YÖNETİMİ (Hakkımda sayfası için)
   Deneyim ve Eğitim sekmeleri
   ============================================================== */

const setupTabListeners = () => {
    const tabButtons = document.querySelectorAll('.tab-btn');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.dataset.tab;
            switchTab(tabName);
        });
    });
};

/* ==============================================================
   FİLTRE YÖNETİMİ (Projeler sayfası için)
   Proje kategorilerine göre filtreleme
   ============================================================== */

const setupFilterListeners = () => {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Aktif sınıfını güncelle
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filtreleme yap
            const category = btn.dataset.filter;
            filterProjects(category);
        });
    });
};

/* ==============================================================
   FORM YÖNETİMİ
   İletişim formu validasyonu ve gönderimi
   HTML5 validasyonu + JavaScript validasyonu (ödev gereksinimi)
   ============================================================== */

const setupFormListeners = () => {
    const form = document.getElementById('contact-form');

    if (!form) return;

    // Form gönderimi
    form.addEventListener('submit', handleFormSubmit);

    // Gerçek zamanlı validasyon
    const inputs = form.querySelectorAll('.form-input, .form-textarea');

    inputs.forEach(input => {
        // Blur eventi - Alan terk edildiğinde
        input.addEventListener('blur', () => validateField(input));

        // Input eventi - Yazarken
        input.addEventListener('input', () => {
            // Hata varsa temizle
            const formGroup = input.closest('.form-group');
            if (formGroup.classList.contains('error')) {
                validateField(input);
            }
        });
    });
};

// Tek bir alani dogrula
const validateField = (input) => {
    const formGroup = input.closest('.form-group');
    let isValid = true;

    // Girilen degeri al ve bosluklari temizle
    const value = input.value.trim();

    // Isim alani kontrolu
    if (input.id === 'name') {
        // En az 2 karakter olmali
        if (value.length < 2) {
            isValid = false;
        }
    }

    // E-posta alani kontrolu
    if (input.id === 'email') {
        // @ isareti ve nokta icermeli
        if (value.indexOf('@') === -1 || value.indexOf('.') === -1) {
            isValid = false;
        }
    }

    // Konu alani kontrolu
    if (input.id === 'subject') {
        // En az 5 karakter olmali
        if (value.length < 5) {
            isValid = false;
        }
    }

    // Mesaj alani kontrolu
    if (input.id === 'message') {
        // En az 10 karakter olmali
        if (value.length < 10) {
            isValid = false;
        }
    }

    // Hata sinifini ekle veya kaldir
    if (isValid) {
        formGroup.classList.remove('error');
    } else {
        formGroup.classList.add('error');
    }

    return isValid;
};

// Form gönderimi
const handleFormSubmit = (e) => {
    // Varsayılan form gönderimini engelle
    e.preventDefault();

    const form = e.target;
    const inputs = form.querySelectorAll('.form-input, .form-textarea');
    let isFormValid = true;

    // Tüm alanları doğrula
    inputs.forEach(input => {
        if (!validateField(input)) {
            isFormValid = false;
        }
    });

    // Form geçerli değilse işlemi durdur
    if (!isFormValid) {
        // İlk hatalı alana odaklan
        const firstError = form.querySelector('.form-group.error .form-input, .form-group.error .form-textarea');
        if (firstError) {
            firstError.focus();
        }
        return;
    }

    // Form verilerini al (gerçek uygulamada sunucuya gönderilir)
    const formData = {
        name: form.querySelector('#name').value,
        email: form.querySelector('#email').value,
        subject: form.querySelector('#subject').value,
        message: form.querySelector('#message').value
    };

    // Konsola yazdır (gerçek uygulamada fetch ile sunucuya gönderilir)
    console.log('Form verileri:', formData);

    // Formu gizle ve başarı mesajını göster
    form.style.display = 'none';

    const successMessage = document.getElementById('form-success');
    if (successMessage) {
        successMessage.classList.add('show');
    }

    // 5 saniye sonra formu tekrar göster
    setTimeout(() => {
        form.reset();
        form.style.display = 'block';
        if (successMessage) {
            successMessage.classList.remove('show');
        }
    }, 5000);
};

/* ==============================================================
   YARDIMCI FONKSİYONLAR
   ============================================================== */

// Debounce fonksiyonu - Performans optimizasyonu
const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
};

// Scroll yönetimini debounce ile optimize et
window.addEventListener('scroll', debounce(handleScroll, 10));
