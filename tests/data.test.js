/**
 * @jest-environment jsdom
 */

let defaultConfig, getSubjects, updateSiteUI, closeMobileMenu;

beforeEach(() => {
    localStorage.clear();
    document.body.innerHTML = '';
    document.head.innerHTML = '';

    jest.resetModules();

    const dataModule = require('../data');
    defaultConfig = dataModule.defaultConfig;
    getSubjects = dataModule.getSubjects;
    updateSiteUI = dataModule.updateSiteUI;
    closeMobileMenu = dataModule.closeMobileMenu;
});

// --- defaultConfig structure tests ---

describe('defaultConfig', () => {
    test('has required identity fields', () => {
        expect(defaultConfig.siteName).toBe('ExamPaperLK');
        expect(defaultConfig.brandLogoText).toBe('E');
        expect(typeof defaultConfig.footerText).toBe('string');
    });

    test('has required theme fields', () => {
        expect(defaultConfig.primaryColor).toBe('#4f46e5');
        expect(defaultConfig.accentColor).toBe('#7c3aed');
        expect(typeof defaultConfig.fontFamily).toBe('string');
        expect(typeof defaultConfig.maintenanceMode).toBe('boolean');
    });

    test('has navigation array with at least Home and More', () => {
        expect(Array.isArray(defaultConfig.navigation)).toBe(true);
        expect(defaultConfig.navigation.length).toBeGreaterThanOrEqual(2);
        const labels = defaultConfig.navigation.map(n => n.label);
        expect(labels).toContain('Home');
        expect(labels).toContain('More');
    });

    test('has hero section fields', () => {
        expect(typeof defaultConfig.heroTitle).toBe('string');
        expect(typeof defaultConfig.heroSubtitle).toBe('string');
        expect(typeof defaultConfig.heroButtonText).toBe('string');
        expect(typeof defaultConfig.heroButtonLink).toBe('string');
    });

    test('has categories array with OL, AL, Dahampasal, Scholarship', () => {
        expect(Array.isArray(defaultConfig.categories)).toBe(true);
        const ids = defaultConfig.categories.map(c => c.id);
        expect(ids).toContain('ol');
        expect(ids).toContain('al');
        expect(ids).toContain('dahampasal');
        expect(ids).toContain('scholarship');
    });

    test('each category has required fields', () => {
        defaultConfig.categories.forEach(cat => {
            expect(cat).toHaveProperty('id');
            expect(cat).toHaveProperty('name');
            expect(cat).toHaveProperty('fullName');
            expect(cat).toHaveProperty('color');
            expect(cat).toHaveProperty('icon');
        });
    });

    test('has subjects for OL and AL', () => {
        expect(defaultConfig.subjects).toHaveProperty('OL');
        expect(defaultConfig.subjects).toHaveProperty('AL');
        expect(Array.isArray(defaultConfig.subjects.OL)).toBe(true);
        expect(Array.isArray(defaultConfig.subjects.AL)).toBe(true);
    });

    test('each subject has required fields', () => {
        const allSubjects = [...defaultConfig.subjects.OL, ...defaultConfig.subjects.AL];
        allSubjects.forEach(sub => {
            expect(sub).toHaveProperty('id');
            expect(sub).toHaveProperty('name');
            expect(sub).toHaveProperty('sinhala');
            expect(sub).toHaveProperty('color');
        });
    });

    test('has paperTypes, years, and parts arrays', () => {
        expect(Array.isArray(defaultConfig.paperTypes)).toBe(true);
        expect(Array.isArray(defaultConfig.years)).toBe(true);
        expect(Array.isArray(defaultConfig.parts)).toBe(true);
        expect(defaultConfig.paperTypes.length).toBeGreaterThan(0);
        expect(defaultConfig.years.length).toBeGreaterThan(0);
        expect(defaultConfig.parts.length).toBeGreaterThan(0);
    });

    test('has features array with valid entries', () => {
        expect(Array.isArray(defaultConfig.features)).toBe(true);
        defaultConfig.features.forEach(f => {
            expect(f).toHaveProperty('title');
            expect(f).toHaveProperty('desc');
            expect(f).toHaveProperty('icon');
        });
    });

    test('has contact and social fields', () => {
        expect(typeof defaultConfig.contactWhatsApp).toBe('string');
        expect(typeof defaultConfig.contactEmail).toBe('string');
        expect(typeof defaultConfig.socialTelegram).toBe('string');
        expect(typeof defaultConfig.socialFacebook).toBe('string');
        expect(typeof defaultConfig.socialYoutube).toBe('string');
    });

    test('has SEO fields', () => {
        expect(typeof defaultConfig.seoDescription).toBe('string');
        expect(typeof defaultConfig.seoKeywords).toBe('string');
    });
});

// --- getSubjects tests ---

describe('getSubjects', () => {
    test('returns OL subjects when passed "O/L"', () => {
        const subjects = getSubjects('O/L');
        expect(Array.isArray(subjects)).toBe(true);
        expect(subjects.length).toBe(defaultConfig.subjects.OL.length);
    });

    test('returns AL subjects when passed "A/L"', () => {
        const subjects = getSubjects('A/L');
        expect(Array.isArray(subjects)).toBe(true);
        expect(subjects.length).toBe(defaultConfig.subjects.AL.length);
    });

    test('returns empty array for null/undefined input', () => {
        expect(getSubjects(null)).toEqual([]);
        expect(getSubjects(undefined)).toEqual([]);
    });

    test('returns empty array for unknown level', () => {
        expect(getSubjects('unknown')).toEqual([]);
        expect(getSubjects('xyz')).toEqual([]);
    });

    test('handles case-insensitive ID lookup', () => {
        const subjects = getSubjects('ol');
        expect(Array.isArray(subjects)).toBe(true);
    });
});

// --- updateSiteUI tests ---

describe('updateSiteUI', () => {
    test('renders maintenance mode when enabled', () => {
        localStorage.setItem('siteConfig', JSON.stringify({
            ...defaultConfig,
            maintenanceMode: true
        }));
        jest.resetModules();
        const mod = require('../data');

        mod.updateSiteUI();
        expect(document.body.innerHTML).toContain('Maintenance Mode');
    });

    test('does not render maintenance mode when disabled', () => {
        document.body.innerHTML = '<div data-site-name></div>';
        updateSiteUI();
        expect(document.body.innerHTML).not.toContain('Maintenance Mode');
    });

    test('updates site name in elements with data-site-name', () => {
        document.body.innerHTML = '<span data-site-name></span>';
        updateSiteUI();
        expect(document.querySelector('[data-site-name]').textContent).toBe(defaultConfig.siteName);
    });

    test('updates logo text in elements with data-logo-text', () => {
        document.body.innerHTML = '<div data-logo-text></div>';
        updateSiteUI();
        const el = document.querySelector('[data-logo-text]');
        expect(el.textContent).toBe(defaultConfig.brandLogoText);
    });

    test('renders image logo when brandLogoUrl is set', () => {
        localStorage.setItem('siteConfig', JSON.stringify({
            ...defaultConfig,
            brandLogoUrl: 'https://example.com/logo.png'
        }));
        jest.resetModules();
        const mod = require('../data');

        document.body.innerHTML = '<div data-logo-text></div>';
        mod.updateSiteUI();
        const el = document.querySelector('[data-logo-text]');
        expect(el.innerHTML).toContain('<img');
        expect(el.innerHTML).toContain('https://example.com/logo.png');
    });

    test('injects theme CSS variables', () => {
        document.body.innerHTML = '';
        updateSiteUI();
        const style = document.getElementById('global-theme-injector');
        expect(style).not.toBeNull();
        expect(style.innerHTML).toContain('--primary');
        expect(style.innerHTML).toContain('--accent');
        expect(style.innerHTML).toContain(defaultConfig.primaryColor);
    });

    test('creates announcement bar when enabled', () => {
        document.body.innerHTML = '<nav></nav>';
        updateSiteUI();
        const bar = document.getElementById('global-top-bar');
        expect(bar).not.toBeNull();
        expect(bar.textContent).toBe(defaultConfig.announcementText);
    });

    test('does not create announcement bar when disabled', () => {
        localStorage.setItem('siteConfig', JSON.stringify({
            ...defaultConfig,
            showAnnouncement: false
        }));
        jest.resetModules();
        const mod = require('../data');

        document.body.innerHTML = '<nav></nav>';
        mod.updateSiteUI();
        const bar = document.getElementById('global-top-bar');
        expect(bar).toBeNull();
    });

    test('removes existing announcement bar when toggled off', () => {
        document.body.innerHTML = '<a id="global-top-bar">Old</a><nav></nav>';
        localStorage.setItem('siteConfig', JSON.stringify({
            ...defaultConfig,
            showAnnouncement: false
        }));
        jest.resetModules();
        const mod = require('../data');

        mod.updateSiteUI();
        expect(document.getElementById('global-top-bar')).toBeNull();
    });

    test('updates hero section elements', () => {
        document.body.innerHTML = `
            <h1 id="site-hero-title"></h1>
            <p id="site-hero-subtitle"></p>
            <a id="site-hero-button"></a>
        `;
        updateSiteUI();
        const title = document.getElementById('site-hero-title');
        const sub = document.getElementById('site-hero-subtitle');
        const btn = document.getElementById('site-hero-button');
        expect(title.innerHTML).toContain(defaultConfig.siteName);
        expect(title.innerHTML).toContain(defaultConfig.heroTitle);
        expect(sub.textContent).toBe(defaultConfig.heroSubtitle);
        expect(btn.href).toContain(defaultConfig.heroButtonLink);
    });

    test('renders feature grid when element exists', () => {
        document.body.innerHTML = '<div id="feature-grid"></div>';
        updateSiteUI();
        const grid = document.getElementById('feature-grid');
        expect(grid.children.length).toBe(defaultConfig.features.length);
    });

    test('renders footer content', () => {
        document.body.innerHTML = '<footer></footer>';
        updateSiteUI();
        const footer = document.querySelector('footer');
        expect(footer.innerHTML).toContain(defaultConfig.siteName);
        expect(footer.innerHTML).toContain(defaultConfig.footerText);
    });

    test('generates navigation menu in data-nav-menu containers', () => {
        document.body.innerHTML = '<nav><div data-nav-menu></div></nav>';
        updateSiteUI();
        const navMenu = document.querySelector('[data-nav-menu]');
        expect(navMenu.innerHTML).toContain('Home');
        expect(navMenu.innerHTML).toContain('More');
        expect(navMenu.innerHTML).toContain('Logout');
    });
});

// --- closeMobileMenu tests ---

describe('closeMobileMenu', () => {
    test('adds close animation classes to mobile menu', () => {
        document.body.innerHTML = `
            <div id="global-mobile-menu" class="mobile-menu-open"></div>
            <div id="global-mobile-backdrop" class="mobile-backdrop-open"></div>
        `;
        closeMobileMenu();
        const menu = document.getElementById('global-mobile-menu');
        const backdrop = document.getElementById('global-mobile-backdrop');
        expect(menu.classList.contains('mobile-menu-close')).toBe(true);
        expect(menu.classList.contains('mobile-menu-open')).toBe(false);
        expect(backdrop.classList.contains('mobile-backdrop-close')).toBe(true);
        expect(backdrop.classList.contains('mobile-backdrop-open')).toBe(false);
    });

    test('restores body overflow to auto', () => {
        document.body.style.overflow = 'hidden';
        document.body.innerHTML = `
            <div id="global-mobile-menu" class="mobile-menu-open"></div>
            <div id="global-mobile-backdrop" class="mobile-backdrop-open"></div>
        `;
        closeMobileMenu();
        expect(document.body.style.overflow).toBe('auto');
    });

    test('handles case when menu elements do not exist', () => {
        document.body.innerHTML = '';
        expect(() => closeMobileMenu()).not.toThrow();
    });

    test('adds hidden class after timeout', () => {
        jest.useFakeTimers();
        document.body.innerHTML = `
            <div id="global-mobile-menu" class="mobile-menu-open"></div>
            <div id="global-mobile-backdrop" class="mobile-backdrop-open"></div>
        `;
        closeMobileMenu();
        jest.advanceTimersByTime(300);
        const menu = document.getElementById('global-mobile-menu');
        const backdrop = document.getElementById('global-mobile-backdrop');
        expect(menu.classList.contains('hidden')).toBe(true);
        expect(backdrop.classList.contains('hidden')).toBe(true);
        jest.useRealTimers();
    });
});
