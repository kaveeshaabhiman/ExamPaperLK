/**
 * @jest-environment jsdom
 */

let authGuard;

beforeEach(() => {
    localStorage.clear();
    jest.resetModules();
    authGuard = require('../auth-guard');
});

// --- getCurrentPage tests ---

describe('getCurrentPage', () => {
    test('extracts page from simple pathname', () => {
        expect(authGuard.getCurrentPage('/index.html')).toBe('index.html');
    });

    test('extracts page from nested path', () => {
        expect(authGuard.getCurrentPage('/admin/login.html')).toBe('login.html');
    });

    test('returns index.html for root path "/"', () => {
        expect(authGuard.getCurrentPage('/')).toBe('index.html');
    });

    test('returns index.html for empty path', () => {
        expect(authGuard.getCurrentPage('')).toBe('index.html');
    });

    test('extracts page from deep nested path', () => {
        expect(authGuard.getCurrentPage('/a/b/c/page.html')).toBe('page.html');
    });

    test('handles path without extension', () => {
        expect(authGuard.getCurrentPage('/dashboard')).toBe('dashboard');
    });
});

// --- isPublicPageCheck tests ---

describe('isPublicPageCheck', () => {
    const publicPages = ['login.html', 'admin/login.html'];

    test('returns true for login.html', () => {
        expect(authGuard.isPublicPageCheck('login.html', publicPages)).toBe(true);
    });

    test('returns true for Login.html (case-insensitive)', () => {
        expect(authGuard.isPublicPageCheck('Login.html', publicPages)).toBe(true);
    });

    test('returns true for LOGIN.HTML (all uppercase)', () => {
        expect(authGuard.isPublicPageCheck('LOGIN.HTML', publicPages)).toBe(true);
    });

    test('returns false for index.html', () => {
        expect(authGuard.isPublicPageCheck('index.html', publicPages)).toBe(false);
    });

    test('returns false for dashboard.html', () => {
        expect(authGuard.isPublicPageCheck('dashboard.html', publicPages)).toBe(false);
    });

    test('returns false for empty string', () => {
        expect(authGuard.isPublicPageCheck('', publicPages)).toBe(false);
    });

    test('returns false with empty publicPages array', () => {
        expect(authGuard.isPublicPageCheck('login.html', [])).toBe(false);
    });
});

// --- isAdminPathCheck tests ---

describe('isAdminPathCheck', () => {
    test('returns true for /admin/ path', () => {
        expect(authGuard.isAdminPathCheck('/admin/')).toBe(true);
    });

    test('returns true for /admin/dashboard.html', () => {
        expect(authGuard.isAdminPathCheck('/admin/dashboard.html')).toBe(true);
    });

    test('returns false for root path', () => {
        expect(authGuard.isAdminPathCheck('/')).toBe(false);
    });

    test('returns false for /index.html', () => {
        expect(authGuard.isAdminPathCheck('/index.html')).toBe(false);
    });

    test('returns false for /administrator/', () => {
        expect(authGuard.isAdminPathCheck('/administrator/')).toBe(false);
    });

    test('returns false for empty string', () => {
        expect(authGuard.isAdminPathCheck('')).toBe(false);
    });
});

// --- checkBlockedUser tests ---

describe('checkBlockedUser', () => {
    test('returns false when currentUser is null', () => {
        expect(authGuard.checkBlockedUser(null, [])).toBe(false);
    });

    test('returns false when currentUser is undefined', () => {
        expect(authGuard.checkBlockedUser(undefined, [])).toBe(false);
    });

    test('returns false when user is not in users list', () => {
        const currentUser = { email: 'user@test.com' };
        const users = [{ email: 'other@test.com', blocked: true }];
        expect(authGuard.checkBlockedUser(currentUser, users)).toBe(false);
    });

    test('returns false when user exists but is not blocked', () => {
        const currentUser = { email: 'user@test.com' };
        const users = [{ email: 'user@test.com', blocked: false }];
        expect(authGuard.checkBlockedUser(currentUser, users)).toBe(false);
    });

    test('returns true when user exists and is blocked', () => {
        const currentUser = { email: 'user@test.com' };
        const users = [{ email: 'user@test.com', blocked: true }];
        expect(authGuard.checkBlockedUser(currentUser, users)).toBe(true);
    });

    test('returns false when user has no blocked property', () => {
        const currentUser = { email: 'user@test.com' };
        const users = [{ email: 'user@test.com' }];
        expect(authGuard.checkBlockedUser(currentUser, users)).toBe(false);
    });

    test('correctly finds user among multiple users', () => {
        const currentUser = { email: 'target@test.com' };
        const users = [
            { email: 'other1@test.com', blocked: false },
            { email: 'target@test.com', blocked: true },
            { email: 'other2@test.com', blocked: false }
        ];
        expect(authGuard.checkBlockedUser(currentUser, users)).toBe(true);
    });
});

// --- shouldRedirectToLogin tests ---

describe('shouldRedirectToLogin', () => {
    test('returns true when no user and not on public/admin page', () => {
        expect(authGuard.shouldRedirectToLogin(null, false, false)).toBe(true);
    });

    test('returns false when user is logged in', () => {
        const user = { email: 'user@test.com' };
        expect(authGuard.shouldRedirectToLogin(user, false, false)).toBe(false);
    });

    test('returns false when on a public page', () => {
        expect(authGuard.shouldRedirectToLogin(null, true, false)).toBe(false);
    });

    test('returns false when on an admin path', () => {
        expect(authGuard.shouldRedirectToLogin(null, false, true)).toBe(false);
    });

    test('returns false when user exists on public page', () => {
        const user = { email: 'user@test.com' };
        expect(authGuard.shouldRedirectToLogin(user, true, false)).toBe(false);
    });

    test('returns false when user exists on admin path', () => {
        const user = { email: 'user@test.com' };
        expect(authGuard.shouldRedirectToLogin(user, false, true)).toBe(false);
    });

    test('returns false when all conditions are true', () => {
        const user = { email: 'user@test.com' };
        expect(authGuard.shouldRedirectToLogin(user, true, true)).toBe(false);
    });
});
