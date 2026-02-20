// ⚡️ GLOBAL NO-CODE ENGINE v3.0 ⚡️
// This file manages the entire website structure, design, and content.
// Changes made in the Admin Panel are saved to LocalStorage and applied instantly.

const defaultConfig = {
    // --- 🏢 BASIC IDENTITY ---
    siteName: "ExamPaperLK",
    brandLogoText: "E",
    brandLogoUrl: "", // Optional image logo
    footerText: "© 2024 ExamPaperLK. All rights reserved.",

    // --- 🎨 VISUAL ENGINE (Theme) ---
    primaryColor: "#4f46e5",
    accentColor: "#7c3aed",
    fontFamily: "'Inter', sans-serif",
    customCss: "",
    maintenanceMode: false,

    // --- 🧭 NAVIGATION MENU ---
    navigation: [
        { label: "Home", url: "index.html" },
        { label: "More", url: "more.html" }
    ],

    // --- 🏠 HERO SECTION ---
    heroTitle: "Sri Lanka's Best Past Paper Collection",
    heroSubtitle: "Access thousands of O/L and A/L past papers in Sinhala medium instantly. Prepare smart, score higher.",
    heroButtonText: "Browse Papers",
    heroButtonLink: "#categories-grid",

    // --- 📢 MARKETING & NOTICES ---
    showAnnouncement: true,
    announcementText: "🔥 New 2024 Grade 5 Scholarship Model Papers are now available!",
    announcementLink: "paper-view.html?level=Scholarship",

    // --- ✨ FEATURES SECTION (Why Choose Us) ---
    features: [
        { title: "Updated Daily", desc: "We constantly update our database with the latest papers.", icon: "zap" },
        { title: "Free Downloads", desc: "Download papers instantly without any hassle.", icon: "download" },
        { title: "Verified Answers", desc: "Reliable marking schemes to check your progress.", icon: "check" }
    ],

    // --- 📞 CONTACT & SOCIAL LINKS ---
    contactWhatsApp: "+94XXXXXXXXX",
    contactEmail: "info@exampaperlk.com",
    socialTelegram: "#",
    socialFacebook: "#",
    socialYoutube: "#",

    // --- 🔎 SEO & HEAD ---
    seoDescription: "Free past papers, model papers and marking schemes for O/L, A/L and Grade 5 Scholarship students in Sri Lanka.",
    seoKeywords: "past papers, ol papers, al papers, sri lanka exam, sinhala medium papers",

    // --- 🏗️ CORE STRUCTURE ---
    paperTypes: ["Past Paper", "Model Paper", "Provincial", "Term Test", "Short Notes"],
    years: ["2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015"],
    parts: ["Part I", "Part II", "Part III", "Full Paper", "Marking Scheme"],
    categories: [
        { id: "ol", name: "O/L", fullName: "Ordinary Level", color: "indigo", icon: "OL" },
        { id: "al", name: "A/L", fullName: "Advanced Level", color: "purple", icon: "AL" },
        { id: "dahampasal", name: "Dahampasal", fullName: "Religious School", color: "orange", icon: "book" },
        { id: "scholarship", name: "Scholarship", fullName: "Grade 5 Exam", color: "cyan", icon: "grad" }
    ],
    subjects: {
        "OL": [
            { id: "maths", name: "Mathematics", sinhala: "Ganithaya", color: "blue" },
            { id: "science", name: "Science", sinhala: "Vidhyawa", color: "green" },
            { id: "sinhala", name: "Sinhala", sinhala: "Sinhala Language", color: "red" },
            { id: "history", name: "History", sinhala: "Ithihasaya", color: "orange" },
            { id: "religion", name: "Religion", sinhala: "Agamma", color: "purple" }
        ],
        "AL": [
            { id: "combinedmaths", name: "Combined Maths", sinhala: "Sanyuktha Ganithaya", color: "red" },
            { id: "physics", name: "Physics", sinhala: "Bowthika Vidhyawa", color: "purple" },
            { id: "chemistry", name: "Chemistry", sinhala: "Rasayana Vidhyawa", color: "green" },
            { id: "biology", name: "Biology", sinhala: "Jeewa Vidhyawa", color: "emerald" },
            { id: "it", name: "ICT", sinhala: "Thakshanaya", color: "blue" }
        ]
    }
};

// --- CORE SYSTEM INITIALIZATION ---

const siteConfig = JSON.parse(localStorage.getItem('siteConfig')) || defaultConfig;
const localPapers = JSON.parse(localStorage.getItem('examPapers')) || [];
const papersData = [...localPapers];

function getSubjects(level) {
    if (!level) return [];
    // Try matching by name first, then by ID (lowercase)
    const category = siteConfig.categories.find(c => c.name === level || c.id === level.toLowerCase());
    const key = category ? category.id : level.toLowerCase();
    // Try upper case keys (like OL, AL) for backward compatibility
    return siteConfig.subjects[key] || siteConfig.subjects[key.toUpperCase()] || [];
}

// --- AUTOMATIC DATA BINDING ENGINE ---

function updateSiteUI() {
    if (siteConfig.maintenanceMode && !window.location.href.includes('admin')) {
        document.body.innerHTML = `<div style="height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; font-family:sans-serif; text-align:center; background:#f8fafc;">
            <h1 style="font-size:3rem; margin-bottom:1rem;">Maintenance Mode</h1>
            <p style="color:#64748b;">We are updating the library. Please come back in a few minutes.</p>
        </div>`;
        return;
    }

    // Apply Brand Identity
    document.querySelectorAll('[data-site-name]').forEach(el => el.textContent = siteConfig.siteName);
    document.querySelectorAll('[data-logo-text]').forEach(el => {
        if (siteConfig.brandLogoUrl) {
            el.innerHTML = `<img src="${siteConfig.brandLogoUrl}" class="w-full h-full object-contain p-1">`;
            el.style.background = 'transparent';
        } else {
            el.textContent = siteConfig.brandLogoText;
        }
    });

    // Theme Engine
    const styleId = 'global-theme-injector';
    let style = document.getElementById(styleId);
    if (!style) {
        style = document.createElement('style');
        style.id = styleId;
        document.head.appendChild(style);
    }
    style.innerHTML = `
        :root {
            --primary: ${siteConfig.primaryColor};
            --accent: ${siteConfig.accentColor};
            --font-family: ${siteConfig.fontFamily};
        }
        body { font-family: var(--font-family) !important; }
        .bg-primary { background-color: var(--primary) !important; }
        .text-primary { color: var(--primary) !important; }
        .border-primary { border-color: var(--primary) !important; }
        .hover\\:bg-primary:hover { background-color: var(--primary) !important; }
        .text-gradient {
            background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        ${siteConfig.customCss}
    `;

    // Navigation Menu Generator
    const navContainers = document.querySelectorAll('[data-nav-menu]');
    navContainers.forEach(container => {
        container.innerHTML = siteConfig.navigation.map(link => `
            <a href="${link.url}" class="px-3 py-2 rounded-md text-sm font-semibold transition-all ${window.location.href.includes(link.url) ? 'text-primary bg-white shadow-sm' : 'text-gray-500 hover:text-primary'}">${link.label}</a>
        `).join('');
    });

    // Hero Updates
    const hTitle = document.getElementById('site-hero-title');
    const hSub = document.getElementById('site-hero-subtitle');
    const hBtn = document.getElementById('site-hero-button');
    if (hTitle) hTitle.innerHTML = `<span class="block text-gray-900 mb-2">${siteConfig.siteName}</span> <span class="text-gradient">${siteConfig.heroTitle}</span>`;
    if (hSub) hSub.textContent = siteConfig.heroSubtitle;
    if (hBtn) {
        hBtn.textContent = siteConfig.heroButtonText;
        hBtn.href = siteConfig.heroButtonLink;
    }

    // Announcement Bar
    const barId = 'global-top-bar';
    let bar = document.getElementById(barId);
    if (siteConfig.showAnnouncement && siteConfig.announcementText) {
        if (!bar) {
            bar = document.createElement('a');
            bar.id = barId;
            document.body.prepend(bar);
        }
        bar.className = 'fixed top-0 left-0 w-full z-[100] text-white text-[10px] md:text-xs font-black py-2.5 px-4 text-center block shadow-lg';
        bar.style.background = `linear-gradient(to r, var(--primary), var(--accent))`;
        bar.href = siteConfig.announcementLink;
        bar.textContent = siteConfig.announcementText;
        document.querySelectorAll('nav').forEach(n => n.style.marginTop = '40px');
    } else if (bar) {
        bar.remove();
        document.querySelectorAll('nav').forEach(n => n.style.marginTop = '0px');
    }

    // Feature Grid (Home Only)
    const featureGrid = document.getElementById('feature-grid');
    if (featureGrid && siteConfig.features) {
        // Icons mapping for variety
        const icons = { zap: '<path d="M13 10V3L4 14h7v7l9-11h-7z"/>', download: '<path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>', check: '<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>' };
        featureGrid.innerHTML = siteConfig.features.map(f => `
            <div class="glass-card p-8 rounded-3xl hover:bg-white transition-all group">
                <div class="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                    <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">${icons[f.icon] || icons.zap}</svg>
                </div>
                <h3 class="text-xl font-black text-gray-900 mb-2">${f.title}</h3>
                <p class="text-gray-500 font-medium leading-relaxed">${f.desc}</p>
            </div>
        `).join('');
    }

    // Global Footer Generator
    const footers = document.querySelectorAll('footer');
    footers.forEach(footer => {
        footer.className = "bg-white border-t border-gray-100 py-16 px-4 mt-20";
        footer.innerHTML = `
            <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                <div class="col-span-1 md:col-span-2">
                    <div class="flex items-center gap-3 mb-6">
                        <div class="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-black shadow-lg">${siteConfig.brandLogoText}</div>
                        <span class="font-black text-2xl tracking-tighter text-gray-900">${siteConfig.siteName}</span>
                    </div>
                    <p class="text-gray-500 max-w-sm font-medium leading-relaxed">${siteConfig.seoDescription}</p>
                </div>
                <div>
                    <h4 class="font-black text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-6">Explore</h4>
                    <div class="space-y-3">
                        ${siteConfig.navigation.map(l => `<a href="${l.url}" class="block text-gray-600 hover:text-primary font-bold text-sm">${l.label}</a>`).join('')}
                    </div>
                </div>
                <div>
                    <h4 class="font-black text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-6">Official Channels</h4>
                    <div class="flex gap-4">
                        <a href="https://wa.me/${siteConfig.contactWhatsApp}" class="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 hover:bg-[#25D366] hover:text-white transition-all shadow-sm">W</a>
                        <a href="${siteConfig.socialTelegram}" class="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 hover:bg-[#0088cc] hover:text-white transition-all shadow-sm">T</a>
                        <a href="${siteConfig.socialYoutube}" class="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 hover:bg-[#FF0000] hover:text-white transition-all shadow-sm">Y</a>
                    </div>
                </div>
            </div>
            <div class="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center text-center gap-4">
                <span class="text-xs font-black text-gray-300 uppercase tracking-widest">${siteConfig.footerText}</span>
                <span class="text-[9px] font-black text-white bg-gray-900 px-3 py-1 rounded-full uppercase tracking-widest">No-Code Engine v3.0</span>
            </div>
        `;
    });
}

document.addEventListener('DOMContentLoaded', updateSiteUI);
