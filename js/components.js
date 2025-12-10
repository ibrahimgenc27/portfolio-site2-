/* ==============================================================
   COMPONENTS.JS - Sayfa Bilesenleri Modulu
   
   Bu modul tum sayfa iceriklerini dinamik olarak olusturur.
   Her sayfa icin ayri bir fonksiyon tanimlanmistir.
   fetch API ile JSON verisi okunur ve DOM'a eklenir.
   ============================================================== */

"use strict";

/* ==============================================================
   GLOBAL DEGISKENLER
   Portfolio verilerini saklamak icin
   ============================================================== */

// Portfolio verileri - fetch ile yuklendikten sonra saklanir
let portfolioData = null;

/* ==============================================================
   VERI YUKLEME FONKSIYONU
   fetch API ve async/await kullanimi
   ============================================================== */

// async fonksiyon - Promise tabanli asenkron islem
const loadPortfolioData = async function () {
    // Veri zaten yukluyse tekrar yukleme
    if (portfolioData) {
        return portfolioData;
    }

    try {
        // fetch API ile JSON dosyasini oku
        const response = await fetch('data/portfolio.json');

        // Yanit basarili mi kontrol et
        if (!response.ok) {
            throw new Error('HTTP Hatasi: ' + response.status);
        }

        // JSON verisini parse et
        portfolioData = await response.json();

        // Veriyi dondur
        return portfolioData;

    } catch (error) {
        // Hata durumunda konsola yaz
        console.error('Veri yuklenirken hata olustu:', error);

        // Bos veri dondur
        return null;
    }
};

/* ==============================================================
   ANA SAYFA (HOME) BILESENI
   Karsilama ve tanitim bolumu
   ============================================================== */

const renderHomePage = async function () {
    // Veriyi yukle
    const data = await loadPortfolioData();

    // Veri yoksa hata mesaji goster
    if (!data) {
        return '<div class="section"><div class="container"><p>Veri yuklenirken bir hata olustu.</p></div></div>';
    }

    // Kisisel bilgileri al
    const personal = data.personal;
    const services = data.services;

    // Hizmet kartlarini olustur
    let hizmetKartlari = '';
    for (let i = 0; i < services.length; i++) {
        const service = services[i];
        hizmetKartlari = hizmetKartlari +
            '<article class="service-card">' +
            '<div class="service-icon">' +
            '<span class="icon-emoji">' + getServiceEmoji(service.title) + '</span>' +
            '</div>' +
            '<h3 class="service-title">' + service.title + '</h3>' +
            '<p class="service-description">' + service.description + '</p>' +
            '</article>';
    }

    // Kisaltilmis bio metni
    const kisaBio = personal.bio.substring(0, 150) + '...';

    // HTML icerigini olustur
    const htmlIcerik =
        '<!-- Hero Bolumu - Karsilama alani -->' +
        '<section class="hero" aria-label="Karsilama bolumu">' +
        '<div class="hero-container">' +
        '<!-- Sol taraf - Icerik -->' +
        '<div class="hero-content">' +
        '<!-- Hos geldin etiketi -->' +
        '<div class="hero-tag">' +
        '<span class="icon-emoji">👋</span>' +
        '<span>Merhaba, ben</span>' +
        '</div>' +

        '<!-- Ana baslik -->' +
        '<h1 class="hero-title">' +
        personal.name +
        '<br>' +
        '<span class="highlight">' + personal.title + '</span>' +
        '</h1>' +

        '<!-- Alt aciklama -->' +
        '<p class="hero-subtitle">' +
        kisaBio +
        '</p>' +

        '<!-- Butonlar -->' +
        '<div class="hero-buttons">' +
        '<a href="#projects" class="btn btn-primary">' +
        '<span class="icon-emoji">📁</span> Projelerimi Gor' +
        '</a>' +
        '<a href="#contact" class="btn btn-secondary">' +
        '<span class="icon-emoji">✉️</span> Iletisime Gec' +
        '</a>' +
        '</div>' +
        '</div>' +

        '<!-- Sag taraf - Gorsel -->' +
        '<div class="hero-visual">' +
        '<div class="hero-image-wrapper">' +
        '<!-- Profil gorseli -->' +
        '<img src="assets/eniskinay.png" alt="' + personal.name + ' profil fotografi" class="hero-image">' +
        '<!-- Dekoratif sekil -->' +
        '<div class="hero-shape"></div>' +
        '</div>' +

        '<!-- Yuzen kartlar -->' +
        '<div class="floating-card floating-card-1">' +
        '<div class="icon purple">' +
        '<span class="icon-emoji">💻</span>' +
        '</div>' +
        '<div class="info">' +
        '<h4>5+</h4>' +
        '<p>Yil Deneyim</p>' +
        '</div>' +
        '</div>' +

        '<div class="floating-card floating-card-2">' +
        '<div class="icon pink">' +
        '<span class="icon-emoji">🚀</span>' +
        '</div>' +
        '<div class="info">' +
        '<h4>50+</h4>' +
        '<p>Tamamlanan Proje</p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</section>' +

        '<!-- Hizmetler Bolumu -->' +
        '<section class="section" aria-label="Hizmetler">' +
        '<div class="container">' +
        '<header class="section-header">' +
        '<h2 class="section-title">Hizmetlerim</h2>' +
        '<p class="section-subtitle">' +
        'Profesyonel web gelistirme hizmetleri sunuyorum' +
        '</p>' +
        '</header>' +

        '<!-- Hizmet kartlari -->' +
        '<div class="services-grid">' +
        hizmetKartlari +
        '</div>' +
        '</div>' +
        '</section>';

    return htmlIcerik;
};

// Hizmet basligina gore emoji dondur
function getServiceEmoji(title) {
    if (title.indexOf('Web') !== -1) return '🌐';
    if (title.indexOf('Mobil') !== -1) return '📱';
    if (title.indexOf('API') !== -1) return '⚙️';
    if (title.indexOf('UI') !== -1 || title.indexOf('Tasarim') !== -1) return '🎨';
    return '💼';
}

/* ==============================================================
   HAKKIMDA SAYFASI BILESENI
   Kisisel bilgiler, egitim ve deneyim
   ============================================================== */

const renderAboutPage = async function () {
    // Veriyi yukle
    const data = await loadPortfolioData();

    if (!data) {
        return '<div class="section"><div class="container"><p>Veri yuklenemedi.</p></div></div>';
    }

    const personal = data.personal;

    // Yas hesaplama
    const currentYear = new Date().getFullYear();
    const age = currentYear - personal.birthYear;

    // Deneyim timeline olustur
    let deneyimHTML = '';
    for (let i = 0; i < personal.experience.length; i++) {
        const exp = personal.experience[i];
        deneyimHTML = deneyimHTML +
            '<div class="timeline-item">' +
            '<h4>' + exp.position + '</h4>' +
            '<p class="company">' + exp.company + '</p>' +
            '<p class="period">' + exp.period + '</p>' +
            '<p class="description">' + exp.description + '</p>' +
            '</div>';
    }

    // Egitim timeline olustur
    let egitimHTML = '';
    for (let j = 0; j < personal.education.length; j++) {
        const edu = personal.education[j];
        egitimHTML = egitimHTML +
            '<div class="timeline-item">' +
            '<h4>' + edu.degree + '</h4>' +
            '<p class="school">' + edu.school + '</p>' +
            '<p class="period">' + edu.year + '</p>' +
            '</div>';
    }

    const htmlIcerik =
        '<!-- Hakkimda Bolumu -->' +
        '<section class="section" aria-label="Hakkimda">' +
        '<div class="container">' +
        '<header class="section-header">' +
        '<h2 class="section-title">Hakkimda</h2>' +
        '<p class="section-subtitle">' +
        'Kendimi ve kariyerimi taniyin' +
        '</p>' +
        '</header>' +

        '<!-- Icerik -->' +
        '<div class="about-content">' +
        '<!-- Sol taraf - Profil karti -->' +
        '<div class="about-image-card">' +
        '<img src="assets/eniskinay.png" alt="' + personal.name + '" class="about-image">' +
        '</div>' +

        '<!-- Sag taraf - Bilgiler -->' +
        '<div class="about-info">' +
        '<h3>Merhaba, Ben ' + personal.name + '</h3>' +
        '<p>' + personal.bio + '</p>' +

        '<!-- Kisisel bilgi listesi -->' +
        '<div class="info-list">' +
        '<div class="info-item">' +
        '<span class="icon-emoji">👤</span>' +
        '<div>' +
        '<span class="label">Isim</span>' +
        '<span class="value">' + personal.name + '</span>' +
        '</div>' +
        '</div>' +
        '<div class="info-item">' +
        '<span class="icon-emoji">🎂</span>' +
        '<div>' +
        '<span class="label">Yas</span>' +
        '<span class="value">' + age + '</span>' +
        '</div>' +
        '</div>' +
        '<div class="info-item">' +
        '<span class="icon-emoji">📍</span>' +
        '<div>' +
        '<span class="label">Konum</span>' +
        '<span class="value">' + personal.location + '</span>' +
        '</div>' +
        '</div>' +
        '<div class="info-item">' +
        '<span class="icon-emoji">✉️</span>' +
        '<div>' +
        '<span class="label">E-posta</span>' +
        '<span class="value">' + personal.email + '</span>' +
        '</div>' +
        '</div>' +
        '</div>' +

        '<!-- Deneyim ve Egitim Sekmeleri -->' +
        '<div class="tabs" role="tablist">' +
        '<button class="tab-btn active" data-tab="experience" role="tab" aria-selected="true">' +
        '<span class="icon-emoji">💼</span> Deneyim' +
        '</button>' +
        '<button class="tab-btn" data-tab="education" role="tab" aria-selected="false">' +
        '<span class="icon-emoji">🎓</span> Egitim' +
        '</button>' +
        '</div>' +

        '<!-- Deneyim Timeline -->' +
        '<div class="tab-content" id="experience-tab" role="tabpanel">' +
        '<div class="timeline">' +
        deneyimHTML +
        '</div>' +
        '</div>' +

        '<!-- Egitim Timeline -->' +
        '<div class="tab-content" id="education-tab" role="tabpanel" style="display: none;">' +
        '<div class="timeline">' +
        egitimHTML +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</section>';

    return htmlIcerik;
};

/* ==============================================================
   PROJELER SAYFASI BILESENI
   Portfolio projeleri ve filtreleme
   ============================================================== */

const renderProjectsPage = async function () {
    // Veriyi yukle
    const data = await loadPortfolioData();

    if (!data) {
        return '<div class="section"><div class="container"><p>Veri yuklenemedi.</p></div></div>';
    }

    const projects = data.projects;

    // Benzersiz kategorileri al
    const kategoriler = ['all'];
    for (let i = 0; i < projects.length; i++) {
        const cat = projects[i].category;
        if (kategoriler.indexOf(cat) === -1) {
            kategoriler.push(cat);
        }
    }

    // Filtre butonlari olustur
    let filtreButonlari = '';
    for (let j = 0; j < kategoriler.length; j++) {
        const kategori = kategoriler[j];
        const aktifClass = (j === 0) ? 'active' : '';
        let kategoriAdi = kategori;
        if (kategori === 'all') kategoriAdi = 'Tumu';
        if (kategori === 'web') kategoriAdi = 'Web';
        if (kategori === 'mobile') kategoriAdi = 'Mobil';
        if (kategori === 'api') kategoriAdi = 'API';

        filtreButonlari = filtreButonlari +
            '<button class="filter-btn ' + aktifClass + '" data-filter="' + kategori + '" role="tab">' +
            kategoriAdi +
            '</button>';
    }

    // Proje kartlari olustur
    let projeKartlari = '';
    for (let k = 0; k < projects.length; k++) {
        const project = projects[k];

        // Teknoloji etiketleri
        let techTags = '';
        for (let t = 0; t < project.technologies.length; t++) {
            techTags = techTags + '<span class="tech-tag">' + project.technologies[t] + '</span>';
        }

        projeKartlari = projeKartlari +
            '<article class="project-card" data-category="' + project.category + '">' +
            '<!-- Proje Gorseli -->' +
            '<div class="project-image">' +
            '<img src="' + project.image + '" alt="' + project.title + '" loading="lazy">' +
            '<!-- Overlay -->' +
            '<div class="project-overlay">' +
            '<a href="' + project.demoUrl + '" target="_blank" rel="noopener" aria-label="Demo goruntule">' +
            '<span class="icon-emoji">🔗</span>' +
            '</a>' +
            '<a href="' + project.githubUrl + '" target="_blank" rel="noopener" aria-label="Kaynak kodu">' +
            '<span class="icon-emoji">📂</span>' +
            '</a>' +
            '</div>' +
            '</div>' +

            '<!-- Proje Bilgileri -->' +
            '<div class="project-info">' +
            '<span class="project-category">' + project.category + '</span>' +
            '<h3 class="project-title">' + project.title + '</h3>' +
            '<p class="project-description">' + project.description + '</p>' +

            '<!-- Teknoloji Etiketleri -->' +
            '<div class="project-tech">' +
            techTags +
            '</div>' +
            '</div>' +
            '</article>';
    }

    const htmlIcerik =
        '<!-- Projeler Bolumu -->' +
        '<section class="section" aria-label="Projeler">' +
        '<div class="container">' +
        '<header class="section-header">' +
        '<h2 class="section-title">Projelerim</h2>' +
        '<p class="section-subtitle">' +
        'Gelistirdigim projelerden bazilari' +
        '</p>' +
        '</header>' +

        '<!-- Filtre Butonlari -->' +
        '<div class="filters" role="tablist" aria-label="Proje filtreleri">' +
        filtreButonlari +
        '</div>' +

        '<!-- Proje Kartlari -->' +
        '<div class="projects-grid" id="projects-grid">' +
        projeKartlari +
        '</div>' +
        '</div>' +
        '</section>';

    return htmlIcerik;
};

/* ==============================================================
   YETENEKLERIM SAYFASI BILESENI
   Teknik yetenekler ve ilerleme cubuklari
   ============================================================== */

const renderSkillsPage = async function () {
    // Veriyi yukle
    const data = await loadPortfolioData();

    if (!data) {
        return '<div class="section"><div class="container"><p>Veri yuklenemedi.</p></div></div>';
    }

    const skills = data.skills;

    // Yetenek kartlari olustur
    let yetenekKartlari = '';
    for (let i = 0; i < skills.length; i++) {
        const skillGroup = skills[i];

        // Kategori ikonunu belirle
        let categoryEmoji = '💻';
        if (skillGroup.category === 'Frontend') categoryEmoji = '🎨';
        if (skillGroup.category === 'Backend') categoryEmoji = '⚙️';
        if (skillGroup.category === 'Veritabani') categoryEmoji = '🗄️';
        if (skillGroup.category === 'Araclar') categoryEmoji = '🔧';

        // Yetenek listesi
        let yetenekListesi = '';
        for (let j = 0; j < skillGroup.items.length; j++) {
            const skill = skillGroup.items[j];
            yetenekListesi = yetenekListesi +
                '<div class="skill-item">' +
                '<div class="skill-info">' +
                '<span class="skill-name">' + skill.name + '</span>' +
                '<span class="skill-percentage">' + skill.level + '%</span>' +
                '</div>' +
                '<div class="skill-bar">' +
                '<div class="skill-progress" style="width: 0%" data-level="' + skill.level + '"></div>' +
                '</div>' +
                '</div>';
        }

        yetenekKartlari = yetenekKartlari +
            '<article class="skill-card">' +
            '<!-- Kart Basligi -->' +
            '<div class="skill-card-header">' +
            '<div class="skill-card-icon">' +
            '<span class="icon-emoji">' + categoryEmoji + '</span>' +
            '</div>' +
            '<h3 class="skill-card-title">' + skillGroup.category + '</h3>' +
            '</div>' +

            '<!-- Yetenek Listesi -->' +
            '<div class="skill-list">' +
            yetenekListesi +
            '</div>' +
            '</article>';
    }

    const htmlIcerik =
        '<!-- Yetenekler Bolumu -->' +
        '<section class="section" aria-label="Yetenekler">' +
        '<div class="container">' +
        '<header class="section-header">' +
        '<h2 class="section-title">Yeteneklerim</h2>' +
        '<p class="section-subtitle">' +
        'Kullandigim teknolojiler ve yetkinlik seviyelerim' +
        '</p>' +
        '</header>' +

        '<!-- Yetenek Kartlari -->' +
        '<div class="skills-grid">' +
        yetenekKartlari +
        '</div>' +
        '</div>' +
        '</section>';

    return htmlIcerik;
};

/* ==============================================================
   ILETISIM SAYFASI BILESENI
   Iletisim formu ve bilgileri
   ============================================================== */

const renderContactPage = async function () {
    // Veriyi yukle
    const data = await loadPortfolioData();

    if (!data) {
        return '<div class="section"><div class="container"><p>Veri yuklenemedi.</p></div></div>';
    }

    const personal = data.personal;

    const htmlIcerik =
        '<!-- Iletisim Bolumu -->' +
        '<section class="section" aria-label="Iletisim">' +
        '<div class="container">' +
        '<header class="section-header">' +
        '<h2 class="section-title">Iletisim</h2>' +
        '<p class="section-subtitle">' +
        'Benimle iletisime gecmekten cekinmeyin' +
        '</p>' +
        '</header>' +

        '<!-- Iletisim Icerigi -->' +
        '<div class="contact-content">' +
        '<!-- Sol taraf - Iletisim Bilgileri -->' +
        '<div class="contact-info">' +
        '<article class="contact-card">' +
        '<div class="contact-card-icon">' +
        '<span class="icon-emoji">✉️</span>' +
        '</div>' +
        '<div class="contact-card-content">' +
        '<h4>E-posta</h4>' +
        '<p>' + personal.email + '</p>' +
        '</div>' +
        '</article>' +

        '<article class="contact-card">' +
        '<div class="contact-card-icon">' +
        '<span class="icon-emoji">📞</span>' +
        '</div>' +
        '<div class="contact-card-content">' +
        '<h4>Telefon</h4>' +
        '<p>' + personal.phone + '</p>' +
        '</div>' +
        '</article>' +

        '<article class="contact-card">' +
        '<div class="contact-card-icon">' +
        '<span class="icon-emoji">📍</span>' +
        '</div>' +
        '<div class="contact-card-content">' +
        '<h4>Konum</h4>' +
        '<p>' + personal.location + '</p>' +
        '</div>' +
        '</article>' +

        '<!-- Sosyal Medya -->' +
        '<div class="social-links" style="margin-top: 1rem;">' +
        '<a href="' + personal.social.github + '" target="_blank" rel="noopener" aria-label="GitHub">' +
        '<span class="icon-emoji">📂</span>' +
        '</a>' +
        '<a href="' + personal.social.linkedin + '" target="_blank" rel="noopener" aria-label="LinkedIn">' +
        '<span class="icon-emoji">💼</span>' +
        '</a>' +
        '<a href="' + personal.social.twitter + '" target="_blank" rel="noopener" aria-label="Twitter">' +
        '<span class="icon-emoji">🐦</span>' +
        '</a>' +
        '</div>' +
        '</div>' +

        '<!-- Sag taraf - Iletisim Formu -->' +
        '<div class="contact-form-wrapper">' +
        '<h3 class="contact-form-title">Mesaj Gonderin</h3>' +

        '<!-- Basari Mesaji -->' +
        '<div class="form-success" id="form-success">' +
        '<span class="icon-emoji" style="font-size: 3rem;">✅</span>' +
        '<h4>Mesajiniz Gonderildi!</h4>' +
        '<p>En kisa surede size geri donus yapacagim.</p>' +
        '</div>' +

        '<!-- Iletisim Formu -->' +
        '<form id="contact-form" class="contact-form" novalidate>' +
        '<!-- Isim ve E-posta -->' +
        '<div class="form-row">' +
        '<div class="form-group">' +
        '<label for="name" class="form-label">' +
        'Isim Soyisim <span class="required">*</span>' +
        '</label>' +
        '<input type="text" id="name" name="name" class="form-input" placeholder="Adinizi girin" required minlength="2" aria-required="true">' +
        '<span class="form-error">Lutfen gecerli bir isim girin (en az 2 karakter)</span>' +
        '</div>' +

        '<div class="form-group">' +
        '<label for="email" class="form-label">' +
        'E-posta <span class="required">*</span>' +
        '</label>' +
        '<input type="email" id="email" name="email" class="form-input" placeholder="ornek@email.com" required aria-required="true">' +
        '<span class="form-error">Lutfen gecerli bir e-posta adresi girin</span>' +
        '</div>' +
        '</div>' +

        '<!-- Konu -->' +
        '<div class="form-group">' +
        '<label for="subject" class="form-label">' +
        'Konu <span class="required">*</span>' +
        '</label>' +
        '<input type="text" id="subject" name="subject" class="form-input" placeholder="Mesajinizin konusu" required minlength="5" aria-required="true">' +
        '<span class="form-error">Lutfen bir konu girin (en az 5 karakter)</span>' +
        '</div>' +

        '<!-- Mesaj -->' +
        '<div class="form-group">' +
        '<label for="message" class="form-label">' +
        'Mesaj <span class="required">*</span>' +
        '</label>' +
        '<textarea id="message" name="message" class="form-textarea" placeholder="Mesajinizi buraya yazin..." required minlength="10" aria-required="true"></textarea>' +
        '<span class="form-error">Lutfen bir mesaj girin (en az 10 karakter)</span>' +
        '</div>' +

        '<!-- Gonder Butonu -->' +
        '<button type="submit" class="btn btn-primary" style="width: 100%;">' +
        '<span class="icon-emoji">📤</span> Mesaj Gonder' +
        '</button>' +
        '</form>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</section>';

    return htmlIcerik;
};

/* ==============================================================
   YARDIMCI FONKSIYONLAR
   ============================================================== */

// Skill bar animasyonunu baslat
const animateSkillBars = function () {
    // Tum skill progress barlari sec
    const progressBars = document.querySelectorAll('.skill-progress');

    // Her bir progress bar icin
    progressBars.forEach(function (bar, index) {
        // data-level attribute'undan seviyeyi al
        const level = bar.getAttribute('data-level');

        // Kisa gecikme ile animasyonu baslat
        setTimeout(function () {
            bar.style.width = level + '%';
        }, 300 + (index * 50));
    });
};

// Proje filtreleme fonksiyonu
const filterProjects = function (category) {
    // Tum proje kartlarini sec
    const projects = document.querySelectorAll('.project-card');

    projects.forEach(function (project) {
        // Projenin kategorisini al
        const projectCategory = project.getAttribute('data-category');

        // Kategori eslesiyor mu kontrol et
        if (category === 'all' || projectCategory === category) {
            project.style.display = 'block';
            project.style.animation = 'fadeIn 0.5s ease-out';
        } else {
            project.style.display = 'none';
        }
    });
};

// Tab degistirme fonksiyonu
const switchTab = function (tabName) {
    // Tum tab butonlarini ve iceriklerini sec
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    // Butonlari guncelle
    tabButtons.forEach(function (btn) {
        if (btn.getAttribute('data-tab') === tabName) {
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');
        } else {
            btn.classList.remove('active');
            btn.setAttribute('aria-selected', 'false');
        }
    });

    // Icerikleri guncelle
    tabContents.forEach(function (content) {
        if (content.id === tabName + '-tab') {
            content.style.display = 'block';
        } else {
            content.style.display = 'none';
        }
    });
};
