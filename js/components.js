/* ==============================================================
   COMPONENTS.JS - Sayfa Bileşenleri Modülü
   
   Bu modül tüm sayfa içeriklerini dinamik olarak oluşturur.
   Her sayfa için ayrı bir fonksiyon tanımlanmıştır.
   fetch API ile JSON verisi okunur ve DOM'a eklenir.
   
   Ödev Gereksinimleri:
   - fetch() API kullanımı
   - async/await kullanımı
   - JSON verisi işleme ve DOM'a aktarma
   - Arrow functions kullanımı
   ============================================================== */

"use strict";

/* ==============================================================
   GLOBAL DEĞİŞKENLER
   Portfolio verilerini saklamak için (const/let kullanımı)
   ============================================================== */

// Portfolio verileri - fetch ile yüklendikten sonra saklanır
let portfolioData = null;

/* ==============================================================
   VERİ YÜKLEME FONKSİYONU
   fetch API ve async/await kullanımı
   ============================================================== */

// async fonksiyon - Promise tabanlı asenkron işlem (ES6+ gereksinimi)
const loadPortfolioData = async () => {
    // Veri zaten yüklüyse tekrar yükleme
    if (portfolioData) {
        return portfolioData;
    }

    try {
        // fetch API ile JSON dosyasını oku
        // await kullanımı - Promise'in çözülmesini bekler
        const response = await fetch('data/portfolio.json');

        // Yanıt başarılı mı kontrol et
        if (!response.ok) {
            throw new Error(`HTTP Hatası: ${response.status}`);
        }

        // JSON verisini parse et
        portfolioData = await response.json();

        // Veriyi döndür
        return portfolioData;

    } catch (error) {
        // Hata durumunda konsola yaz
        console.error('Veri yüklenirken hata oluştu:', error);

        // Boş veri döndür
        return null;
    }
};

/* ==============================================================
   ANA SAYFA (HOME) BİLEŞENİ
   Karşılama ve tanıtım bölümü
   ============================================================== */

const renderHomePage = async () => {
    // Veriyi yükle
    const data = await loadPortfolioData();

    // Veri yoksa hata mesajı göster
    if (!data) {
        return `
            <div class="section">
                <div class="container">
                    <p>Veri yüklenirken bir hata oluştu.</p>
                </div>
            </div>
        `;
    }

    // Kişisel bilgileri al (destructuring - ES6+)
    const { personal, services } = data;

    // HTML içeriğini oluştur (template literal - ES6+)
    return `
        <!-- Hero Bölümü - Karşılama alanı -->
        <section class="hero" aria-label="Karşılama bölümü">
            <div class="hero-container">
                <!-- Sol taraf - İçerik -->
                <div class="hero-content">
                    <!-- Hoş geldin etiketi -->
                    <div class="hero-tag">
                        <i class="fas fa-hand-wave"></i>
                        <span>Merhaba, ben</span>
                    </div>
                    
                    <!-- Ana başlık -->
                    <h1 class="hero-title">
                        ${personal.name}
                        <br>
                        <span class="highlight">${personal.title}</span>
                    </h1>
                    
                    <!-- Alt açıklama -->
                    <p class="hero-subtitle">
                        ${personal.bio.substring(0, 150)}...
                    </p>
                    
                    <!-- Butonlar -->
                    <div class="hero-buttons">
                        <a href="#projects" class="btn btn-primary">
                            <i class="fas fa-folder-open"></i>
                            Projelerimi Gör
                        </a>
                        <a href="#contact" class="btn btn-secondary">
                            <i class="fas fa-envelope"></i>
                            İletişime Geç
                        </a>
                    </div>
                </div>
                
                <!-- Sağ taraf - Görsel -->
                <div class="hero-visual">
                    <div class="hero-image-wrapper">
                        <!-- Profil görseli -->
                        <img 
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" 
                            alt="${personal.name} profil fotoğrafı" 
                            class="hero-image"
                        >
                        <!-- Dekoratif şekil -->
                        <div class="hero-shape"></div>
                    </div>
                    
                    <!-- Yüzen kartlar -->
                    <div class="floating-card floating-card-1">
                        <div class="icon purple">
                            <i class="fas fa-code"></i>
                        </div>
                        <div class="info">
                            <h4>5+</h4>
                            <p>Yıl Deneyim</p>
                        </div>
                    </div>
                    
                    <div class="floating-card floating-card-2">
                        <div class="icon pink">
                            <i class="fas fa-project-diagram"></i>
                        </div>
                        <div class="info">
                            <h4>50+</h4>
                            <p>Tamamlanan Proje</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <!-- Hizmetler Bölümü -->
        <section class="section" aria-label="Hizmetler">
            <div class="container">
                <header class="section-header">
                    <h2 class="section-title">Hizmetlerim</h2>
                    <p class="section-subtitle">
                        Profesyonel web geliştirme hizmetleri sunuyorum
                    </p>
                </header>
                
                <!-- Hizmet kartları - CSS Grid -->
                <div class="services-grid">
                    ${services.map(service => `
                        <article class="service-card">
                            <div class="service-icon">
                                <i class="fas ${service.icon}"></i>
                            </div>
                            <h3 class="service-title">${service.title}</h3>
                            <p class="service-description">${service.description}</p>
                        </article>
                    `).join('')}
                </div>
            </div>
        </section>
    `;
};

/* ==============================================================
   HAKKIMDA SAYFASI BİLEŞENİ
   Kişisel bilgiler, eğitim ve deneyim
   ============================================================== */

const renderAboutPage = async () => {
    // Veriyi yükle
    const data = await loadPortfolioData();

    if (!data) {
        return '<div class="section"><div class="container"><p>Veri yüklenemedi.</p></div></div>';
    }

    const { personal } = data;

    // Yaş hesaplama
    const currentYear = new Date().getFullYear();
    const age = currentYear - personal.birthYear;

    return `
        <!-- Hakkımda Bölümü -->
        <section class="section" aria-label="Hakkımda">
            <div class="container">
                <header class="section-header">
                    <h2 class="section-title">Hakkımda</h2>
                    <p class="section-subtitle">
                        Kendimi ve kariyerimi tanıyın
                    </p>
                </header>
                
                <!-- İçerik - CSS Grid layout -->
                <div class="about-content">
                    <!-- Sol taraf - Profil kartı -->
                    <div class="about-image-card">
                        <img 
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop" 
                            alt="${personal.name}" 
                            class="about-image"
                        >
                    </div>
                    
                    <!-- Sağ taraf - Bilgiler -->
                    <div class="about-info">
                        <h3>Merhaba, Ben ${personal.name}</h3>
                        <p>${personal.bio}</p>
                        
                        <!-- Kişisel bilgi listesi -->
                        <div class="info-list">
                            <div class="info-item">
                                <i class="fas fa-user"></i>
                                <div>
                                    <span class="label">İsim</span>
                                    <span class="value">${personal.name}</span>
                                </div>
                            </div>
                            <div class="info-item">
                                <i class="fas fa-birthday-cake"></i>
                                <div>
                                    <span class="label">Yaş</span>
                                    <span class="value">${age}</span>
                                </div>
                            </div>
                            <div class="info-item">
                                <i class="fas fa-map-marker-alt"></i>
                                <div>
                                    <span class="label">Konum</span>
                                    <span class="value">${personal.location}</span>
                                </div>
                            </div>
                            <div class="info-item">
                                <i class="fas fa-envelope"></i>
                                <div>
                                    <span class="label">E-posta</span>
                                    <span class="value">${personal.email}</span>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Deneyim ve Eğitim Sekmeleri -->
                        <div class="tabs" role="tablist">
                            <button 
                                class="tab-btn active" 
                                data-tab="experience"
                                role="tab"
                                aria-selected="true"
                            >
                                <i class="fas fa-briefcase"></i> Deneyim
                            </button>
                            <button 
                                class="tab-btn" 
                                data-tab="education"
                                role="tab"
                                aria-selected="false"
                            >
                                <i class="fas fa-graduation-cap"></i> Eğitim
                            </button>
                        </div>
                        
                        <!-- Deneyim Timeline -->
                        <div class="tab-content" id="experience-tab" role="tabpanel">
                            <div class="timeline">
                                ${personal.experience.map(exp => `
                                    <div class="timeline-item">
                                        <h4>${exp.position}</h4>
                                        <p class="company">${exp.company}</p>
                                        <p class="period">${exp.period}</p>
                                        <p class="description">${exp.description}</p>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        
                        <!-- Eğitim Timeline (Gizli - JS ile gösterilecek) -->
                        <div class="tab-content" id="education-tab" role="tabpanel" style="display: none;">
                            <div class="timeline">
                                ${personal.education.map(edu => `
                                    <div class="timeline-item">
                                        <h4>${edu.degree}</h4>
                                        <p class="school">${edu.school}</p>
                                        <p class="period">${edu.year}</p>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        
                        <!-- CV İndir Butonu -->
                        <div style="margin-top: 2rem;">
                            <a href="#" class="btn btn-primary">
                                <i class="fas fa-download"></i>
                                CV İndir
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
};

/* ==============================================================
   PROJELER SAYFASI BİLEŞENİ
   Portfolio projeleri ve filtreleme
   ============================================================== */

const renderProjectsPage = async () => {
    // Veriyi yükle
    const data = await loadPortfolioData();

    if (!data) {
        return '<div class="section"><div class="container"><p>Veri yüklenemedi.</p></div></div>';
    }

    const { projects } = data;

    // Benzersiz kategorileri al (Set kullanımı - ES6+)
    const categories = ['all', ...new Set(projects.map(p => p.category))];

    return `
        <!-- Projeler Bölümü -->
        <section class="section" aria-label="Projeler">
            <div class="container">
                <header class="section-header">
                    <h2 class="section-title">Projelerim</h2>
                    <p class="section-subtitle">
                        Geliştirdiğim projelerden bazıları
                    </p>
                </header>
                
                <!-- Filtre Butonları -->
                <div class="filters" role="tablist" aria-label="Proje filtreleri">
                    ${categories.map((cat, index) => `
                        <button 
                            class="filter-btn ${index === 0 ? 'active' : ''}" 
                            data-filter="${cat}"
                            role="tab"
                            aria-selected="${index === 0 ? 'true' : 'false'}"
                        >
                            ${cat === 'all' ? 'Tümü' :
            cat === 'web' ? 'Web' :
                cat === 'mobile' ? 'Mobil' :
                    cat === 'api' ? 'API' : cat}
                        </button>
                    `).join('')}
                </div>
                
                <!-- Proje Kartları - CSS Grid -->
                <div class="projects-grid" id="projects-grid">
                    ${projects.map(project => `
                        <article class="project-card" data-category="${project.category}">
                            <!-- Proje Görseli -->
                            <div class="project-image">
                                <img 
                                    src="${project.image}" 
                                    alt="${project.title}" 
                                    loading="lazy"
                                >
                                <!-- Overlay - Hover'da görünür -->
                                <div class="project-overlay">
                                    <a href="${project.demoUrl}" target="_blank" rel="noopener" aria-label="Demo görüntüle">
                                        <i class="fas fa-external-link-alt"></i>
                                    </a>
                                    <a href="${project.githubUrl}" target="_blank" rel="noopener" aria-label="Kaynak kodu">
                                        <i class="fab fa-github"></i>
                                    </a>
                                </div>
                            </div>
                            
                            <!-- Proje Bilgileri -->
                            <div class="project-info">
                                <span class="project-category">${project.category}</span>
                                <h3 class="project-title">${project.title}</h3>
                                <p class="project-description">${project.description}</p>
                                
                                <!-- Teknoloji Etiketleri -->
                                <div class="project-tech">
                                    ${project.technologies.map(tech => `
                                        <span class="tech-tag">${tech}</span>
                                    `).join('')}
                                </div>
                            </div>
                        </article>
                    `).join('')}
                </div>
            </div>
        </section>
    `;
};

/* ==============================================================
   YETENEKLERİM SAYFASI BİLEŞENİ
   Teknik yetenekler ve ilerleme çubukları
   ============================================================== */

const renderSkillsPage = async () => {
    // Veriyi yükle
    const data = await loadPortfolioData();

    if (!data) {
        return '<div class="section"><div class="container"><p>Veri yüklenemedi.</p></div></div>';
    }

    const { skills } = data;

    return `
        <!-- Yetenekler Bölümü -->
        <section class="section" aria-label="Yetenekler">
            <div class="container">
                <header class="section-header">
                    <h2 class="section-title">Yeteneklerim</h2>
                    <p class="section-subtitle">
                        Kullandığım teknolojiler ve yetkinlik seviyelerim
                    </p>
                </header>
                
                <!-- Yetenek Kartları - CSS Grid -->
                <div class="skills-grid">
                    ${skills.map(skillGroup => `
                        <article class="skill-card">
                            <!-- Kart Başlığı -->
                            <div class="skill-card-header">
                                <div class="skill-card-icon">
                                    <i class="fas ${skillGroup.icon}"></i>
                                </div>
                                <h3 class="skill-card-title">${skillGroup.category}</h3>
                            </div>
                            
                            <!-- Yetenek Listesi -->
                            <div class="skill-list">
                                ${skillGroup.items.map(skill => `
                                    <div class="skill-item">
                                        <div class="skill-info">
                                            <span class="skill-name">${skill.name}</span>
                                            <span class="skill-percentage">${skill.level}%</span>
                                        </div>
                                        <div class="skill-bar">
                                            <div 
                                                class="skill-progress" 
                                                style="width: 0%" 
                                                data-level="${skill.level}"
                                            ></div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </article>
                    `).join('')}
                </div>
            </div>
        </section>
    `;
};

/* ==============================================================
   İLETİŞİM SAYFASI BİLEŞENİ
   İletişim formu ve bilgileri
   HTML5 form validasyonu gereksinimi
   ============================================================== */

const renderContactPage = async () => {
    // Veriyi yükle
    const data = await loadPortfolioData();

    if (!data) {
        return '<div class="section"><div class="container"><p>Veri yüklenemedi.</p></div></div>';
    }

    const { personal } = data;

    return `
        <!-- İletişim Bölümü -->
        <section class="section" aria-label="İletişim">
            <div class="container">
                <header class="section-header">
                    <h2 class="section-title">İletişim</h2>
                    <p class="section-subtitle">
                        Benimle iletişime geçmekten çekinmeyin
                    </p>
                </header>
                
                <!-- İletişim İçeriği - CSS Grid -->
                <div class="contact-content">
                    <!-- Sol taraf - İletişim Bilgileri -->
                    <div class="contact-info">
                        <article class="contact-card">
                            <div class="contact-card-icon">
                                <i class="fas fa-envelope"></i>
                            </div>
                            <div class="contact-card-content">
                                <h4>E-posta</h4>
                                <p>${personal.email}</p>
                            </div>
                        </article>
                        
                        <article class="contact-card">
                            <div class="contact-card-icon">
                                <i class="fas fa-phone"></i>
                            </div>
                            <div class="contact-card-content">
                                <h4>Telefon</h4>
                                <p>${personal.phone}</p>
                            </div>
                        </article>
                        
                        <article class="contact-card">
                            <div class="contact-card-icon">
                                <i class="fas fa-map-marker-alt"></i>
                            </div>
                            <div class="contact-card-content">
                                <h4>Konum</h4>
                                <p>${personal.location}</p>
                            </div>
                        </article>
                        
                        <!-- Sosyal Medya -->
                        <div class="social-links" style="margin-top: 1rem;">
                            <a href="${personal.social.github}" target="_blank" rel="noopener" aria-label="GitHub">
                                <i class="fab fa-github"></i>
                            </a>
                            <a href="${personal.social.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn">
                                <i class="fab fa-linkedin"></i>
                            </a>
                            <a href="${personal.social.twitter}" target="_blank" rel="noopener" aria-label="Twitter">
                                <i class="fab fa-twitter"></i>
                            </a>
                        </div>
                    </div>
                    
                    <!-- Sağ taraf - İletişim Formu -->
                    <div class="contact-form-wrapper">
                        <h3 class="contact-form-title">Mesaj Gönderin</h3>
                        
                        <!-- Başarı Mesajı (Gizli) -->
                        <div class="form-success" id="form-success">
                            <i class="fas fa-check-circle"></i>
                            <h4>Mesajınız Gönderildi!</h4>
                            <p>En kısa sürede size geri dönüş yapacağım.</p>
                        </div>
                        
                        <!-- İletişim Formu - HTML5 validasyonu -->
                        <form id="contact-form" class="contact-form" novalidate>
                            <!-- İsim ve E-posta - Yan yana -->
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="name" class="form-label">
                                        İsim Soyisim <span class="required">*</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        id="name" 
                                        name="name" 
                                        class="form-input" 
                                        placeholder="Adınızı girin"
                                        required
                                        minlength="2"
                                        aria-required="true"
                                    >
                                    <span class="form-error">Lütfen geçerli bir isim girin (en az 2 karakter)</span>
                                </div>
                                
                                <div class="form-group">
                                    <label for="email" class="form-label">
                                        E-posta <span class="required">*</span>
                                    </label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        name="email" 
                                        class="form-input" 
                                        placeholder="ornek@email.com"
                                        required
                                        aria-required="true"
                                    >
                                    <span class="form-error">Lütfen geçerli bir e-posta adresi girin</span>
                                </div>
                            </div>
                            
                            <!-- Konu -->
                            <div class="form-group">
                                <label for="subject" class="form-label">
                                    Konu <span class="required">*</span>
                                </label>
                                <input 
                                    type="text" 
                                    id="subject" 
                                    name="subject" 
                                    class="form-input" 
                                    placeholder="Mesajınızın konusu"
                                    required
                                    minlength="5"
                                    aria-required="true"
                                >
                                <span class="form-error">Lütfen bir konu girin (en az 5 karakter)</span>
                            </div>
                            
                            <!-- Mesaj -->
                            <div class="form-group">
                                <label for="message" class="form-label">
                                    Mesaj <span class="required">*</span>
                                </label>
                                <textarea 
                                    id="message" 
                                    name="message" 
                                    class="form-textarea" 
                                    placeholder="Mesajınızı buraya yazın..."
                                    required
                                    minlength="10"
                                    aria-required="true"
                                ></textarea>
                                <span class="form-error">Lütfen bir mesaj girin (en az 10 karakter)</span>
                            </div>
                            
                            <!-- Gönder Butonu -->
                            <button type="submit" class="btn btn-primary" style="width: 100%;">
                                <i class="fas fa-paper-plane"></i>
                                Mesaj Gönder
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    `;
};

/* ==============================================================
   YARDIMCI FONKSİYONLAR
   ============================================================== */

// Skill bar animasyonunu başlat
const animateSkillBars = () => {
    // Tüm skill progress barları seç
    const progressBars = document.querySelectorAll('.skill-progress');

    // Her bir progress bar için
    progressBars.forEach(bar => {
        // data-level attribute'undan seviyeyi al
        const level = bar.dataset.level;

        // Kısa gecikme ile animasyonu başlat
        setTimeout(() => {
            bar.style.width = `${level}%`;
        }, 300);
    });
};

// Proje filtreleme fonksiyonu
const filterProjects = (category) => {
    // Tüm proje kartlarını seç
    const projects = document.querySelectorAll('.project-card');

    projects.forEach(project => {
        // Projenin kategorisini al
        const projectCategory = project.dataset.category;

        // Kategori eşleşiyor mu kontrol et
        if (category === 'all' || projectCategory === category) {
            project.style.display = 'block';
            project.style.animation = 'fadeIn 0.5s ease-out';
        } else {
            project.style.display = 'none';
        }
    });
};

// Tab değiştirme fonksiyonu
const switchTab = (tabName) => {
    // Tüm tab butonlarını ve içeriklerini seç
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    // Butonları güncelle
    tabButtons.forEach(btn => {
        if (btn.dataset.tab === tabName) {
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');
        } else {
            btn.classList.remove('active');
            btn.setAttribute('aria-selected', 'false');
        }
    });

    // İçerikleri güncelle
    tabContents.forEach(content => {
        if (content.id === `${tabName}-tab`) {
            content.style.display = 'block';
        } else {
            content.style.display = 'none';
        }
    });
};
