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

    // First, clean up hardcoded logout buttons to avoid duplicates across different files.
    document.querySelectorAll('nav button').forEach(btn => {
        if (btn.textContent.trim().toLowerCase() === 'logout') {
            btn.remove();
        }
    });

    navContainers.forEach(container => {
        container.innerHTML = siteConfig.navigation.map(link => {
            if (link.label.toLowerCase() === 'more') {
                return `<a href="${link.url}" class="group relative px-5 py-2.5 rounded-full text-sm font-black transition-all duration-300 ${window.location.href.includes(link.url) ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25' : 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 hover:from-indigo-600 hover:to-purple-600 hover:text-white hover:shadow-lg hover:shadow-indigo-500/25'} flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                    ${link.label}
                    <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                </a>`;
            }
            return `<a href="${link.url}" class="px-4 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${window.location.href.includes(link.url) ? 'text-indigo-600 bg-indigo-50' : 'text-gray-500 hover:text-indigo-600 hover:bg-gray-50'}">${link.label}</a>`;
        }).join('') + `
            <button onclick="localStorage.removeItem('currentUser'); location.replace('login.html');" class="ml-3 px-4 py-2 rounded-full text-[10px] font-black text-red-400 hover:text-white hover:bg-red-500 uppercase tracking-widest transition-all duration-300 border border-red-100 hover:border-red-500 hidden md:inline-flex items-center gap-2">
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                Logout
            </button>
        `;
    });

    // Inject mobile menu styles once
    if (!document.getElementById('mobile-menu-styles')) {
        const menuStyles = document.createElement('style');
        menuStyles.id = 'mobile-menu-styles';
        menuStyles.innerHTML = `
            @keyframes menuSlideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
            @keyframes menuSlideOut { from { transform: translateX(0); } to { transform: translateX(100%); } }
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
            @keyframes menuItemFade { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
            .mobile-menu-open { animation: menuSlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
            .mobile-menu-close { animation: menuSlideOut 0.3s cubic-bezier(0.4, 0, 1, 1) forwards; }
            .mobile-backdrop-open { animation: fadeIn 0.3s ease forwards; }
            .mobile-backdrop-close { animation: fadeOut 0.3s ease forwards; }
            .mobile-menu-item { animation: menuItemFade 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        `;
        document.head.appendChild(menuStyles);
    }

    // Mobile Menu Hook & Interactivity
    const mobileMenuBtns = document.querySelectorAll('nav .md\\\\:hidden button');
    mobileMenuBtns.forEach(btn => {
        if (!btn.dataset.menuAttached) {
            btn.dataset.menuAttached = 'true';
            btn.addEventListener('click', () => {
                let mobileMenu = document.getElementById('global-mobile-menu');
                let backdrop = document.getElementById('global-mobile-backdrop');

                if (!mobileMenu) {
                    // Create backdrop
                    backdrop = document.createElement('div');
                    backdrop.id = 'global-mobile-backdrop';
                    backdrop.className = 'fixed inset-0 bg-black/40 backdrop-blur-sm z-[99] mobile-backdrop-open';
                    backdrop.addEventListener('click', closeMobileMenu);
                    document.body.appendChild(backdrop);

                    // Create menu panel
                    mobileMenu = document.createElement('div');
                    mobileMenu.id = 'global-mobile-menu';
                    mobileMenu.className = 'fixed top-0 right-0 bottom-0 w-[85%] max-w-[380px] bg-white z-[100] mobile-menu-open flex flex-col shadow-[-10px_0_40px_rgba(0,0,0,0.15)]';

                    // Get current user info
                    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                    const userName = currentUser ? currentUser.name : 'Student';
                    const userEmail = currentUser ? currentUser.email : '';
                    const userInitial = userName.charAt(0).toUpperCase();

                    // Navigation Links
                    const navLinks = siteConfig.navigation.map((link, i) => {
                        const isActive = window.location.href.includes(link.url);
                        const isMore = link.label.toLowerCase() === 'more';
                        let icon = '<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>';
                        if (isMore) icon = '<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>';
                        return `<a href="${link.url}" class="mobile-menu-item flex items-center gap-4 px-5 py-4 rounded-2xl font-bold text-[15px] ${isActive ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50'} transition-all" style="animation-delay: ${0.1 + i * 0.05}s">
                            <div class="w-10 h-10 rounded-xl ${isActive ? 'bg-indigo-100' : 'bg-gray-100'} flex items-center justify-center ${isActive ? 'text-indigo-600' : 'text-gray-400'}">${icon}</div>
                            <span>${link.label}</span>
                            ${isMore ? '<span class="ml-auto px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-600 text-[9px] font-black uppercase">New</span>' : ''}
                        </a>`;
                    }).join('');

                    // Category Links
                    const catIcons = { 'OL': '📘', 'AL': '📕', 'book': '📙', 'grad': '🎓' };
                    const categoryLinks = siteConfig.categories.map((cat, i) => `
                        <a href="paper-view.html?level=${cat.name}" class="mobile-menu-item flex items-center gap-4 px-5 py-3.5 rounded-2xl text-gray-700 hover:bg-gray-50 transition-all" style="animation-delay: ${0.25 + i * 0.05}s">
                            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-${cat.color}-50 to-${cat.color}-100 flex items-center justify-center text-lg">${catIcons[cat.icon] || '📄'}</div>
                            <div>
                                <span class="font-bold text-sm block">${cat.name} Papers</span>
                                <span class="text-[10px] text-gray-400 font-medium">${cat.fullName}</span>
                            </div>
                            <svg class="w-4 h-4 text-gray-300 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
                        </a>
                    `).join('');

                    const navDelay = siteConfig.navigation.length;
                    const catDelay = siteConfig.categories.length;
                    const logoutDelay = 0.25 + (navDelay + catDelay) * 0.05;

                    mobileMenu.innerHTML = `
                        <!-- Header with close button -->
                        <div class="flex items-center justify-between px-6 py-5 border-b border-gray-100 mobile-menu-item" style="animation-delay: 0s">
                            <div class="flex items-center gap-3">
                                <div class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-lg font-black shadow-lg shadow-indigo-200">${userInitial}</div>
                                <div>
                                    <div class="font-black text-gray-900 text-sm">${userName}</div>
                                    <div class="text-[11px] text-gray-400 font-medium truncate max-w-[180px]">${userEmail}</div>
                                </div>
                            </div>
                            <button onclick="closeMobileMenu()" class="w-10 h-10 rounded-xl bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-all">
                                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>

                        <!-- Scrollable Content -->
                        <div class="flex-1 overflow-y-auto px-4 py-4 space-y-1">
                            <!-- Navigation Links -->
                            <div class="mb-2">
                                <div class="px-4 py-2 text-[9px] font-black text-gray-300 uppercase tracking-[0.2em] mobile-menu-item" style="animation-delay: 0.08s">Navigation</div>
                                ${navLinks}
                            </div>

                            <!-- Divider -->
                            <div class="h-px bg-gray-100 mx-4 my-3"></div>

                            <!-- Library Categories -->
                            <div>
                                <div class="px-4 py-2 text-[9px] font-black text-gray-300 uppercase tracking-[0.2em] mobile-menu-item" style="animation-delay: 0.2s">
                                    <span class="flex items-center gap-2">📚 Paper Library</span>
                                </div>
                                ${categoryLinks}
                            </div>
                        </div>

                        <!-- Bottom: Logout Button -->
                        <div class="p-4 border-t border-gray-100 mobile-menu-item" style="animation-delay: ${logoutDelay}s">
                            <button onclick="localStorage.removeItem('currentUser'); location.replace('login.html');" class="w-full flex items-center justify-center gap-3 px-5 py-4 rounded-2xl bg-red-50 hover:bg-red-500 text-red-500 hover:text-white font-black text-xs uppercase tracking-[0.15em] transition-all duration-300 group">
                                <svg class="w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                                Sign Out
                            </button>
                        </div>
                    `;
                    document.body.appendChild(mobileMenu);
                    document.body.style.overflow = 'hidden';
                } else {
                    // Toggle menu
                    if (mobileMenu.classList.contains('hidden')) {
                        mobileMenu.classList.remove('hidden');
                        mobileMenu.classList.remove('mobile-menu-close');
                        mobileMenu.classList.add('mobile-menu-open');
                        if (backdrop) {
                            backdrop.classList.remove('hidden');
                            backdrop.classList.remove('mobile-backdrop-close');
                            backdrop.classList.add('mobile-backdrop-open');
                        }
                        document.body.style.overflow = 'hidden';
                    } else {
                        closeMobileMenu();
                    }
                }
            });
        }
    });

    // Hero Updates
    const hTitle = document.getElementById('site-hero-title');
    const hSub = document.getElementById('site-hero-subtitle');
    const hBtn = document.getElementById('site-hero-button');
    if (hTitle) hTitle.innerHTML = `<span class="block text-slate-900 mb-2 drop-shadow-sm tracking-tighter">${siteConfig.siteName}</span> <span class="text-gradient drop-shadow-md inline-block animate-pulse-glow" style="animation-duration: 4s;">${siteConfig.heroTitle}</span>`;
    if (hSub) hSub.textContent = siteConfig.heroSubtitle;
    if (hBtn) {
        hBtn.innerHTML = `<span class="relative z-10">${siteConfig.heroButtonText}</span><div class="absolute inset-0 h-full w-full bg-gradient-to-r from-purple-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>`;
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
        const icons = { zap: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>', download: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>', check: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>' };
        featureGrid.innerHTML = siteConfig.features.map(f => `
            <div class="bg-white/70 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white hover:border-indigo-100 transition-all duration-500 hover:-translate-y-3 cursor-default hover-lift relative overflow-hidden group">
                <div class="absolute top-[-20%] right-[-20%] w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all duration-1000 group-hover:scale-150"></div>
                <div class="relative z-10">
                    <div class="w-16 h-16 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl flex items-center justify-center text-indigo-500 mb-8 border border-white shadow-inner group-hover:scale-110 transition-transform duration-500 group-hover:rotate-3">
                        <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">${icons[f.icon] || icons.zap}</svg>
                    </div>
                    <h3 class="text-2xl font-black text-slate-800 tracking-tight leading-none mb-4 group-hover:text-indigo-600 transition-colors">${f.title}</h3>
                    <p class="text-slate-500 font-medium leading-relaxed">${f.desc}</p>
                </div>
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

// Global function to close mobile menu with animation
function closeMobileMenu() {
    const mobileMenu = document.getElementById('global-mobile-menu');
    const backdrop = document.getElementById('global-mobile-backdrop');
    if (mobileMenu) {
        mobileMenu.classList.remove('mobile-menu-open');
        mobileMenu.classList.add('mobile-menu-close');
    }
    if (backdrop) {
        backdrop.classList.remove('mobile-backdrop-open');
        backdrop.classList.add('mobile-backdrop-close');
    }
    document.body.style.overflow = 'auto';
    setTimeout(() => {
        if (mobileMenu) mobileMenu.classList.add('hidden');
        if (backdrop) backdrop.classList.add('hidden');
    }, 300);
}

document.addEventListener('DOMContentLoaded', updateSiteUI);
