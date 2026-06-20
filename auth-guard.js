function isPublicPageCheck(currentPage, publicPages) {
    return publicPages.some(p => currentPage.toLowerCase().includes(p.toLowerCase()));
}

function getCurrentPage(pathname) {
    const pathParts = pathname.split('/');
    return pathParts.pop() || 'index.html';
}

function isAdminPathCheck(pathname) {
    return pathname.includes('/admin/');
}

function checkBlockedUser(currentUser, users) {
    if (!currentUser) return false;
    const masterUser = users.find(u => u.email === currentUser.email);
    return !!(masterUser && masterUser.blocked);
}

function shouldRedirectToLogin(currentUser, isPublicPage, isAdminPath) {
    return !currentUser && !isPublicPage && !isAdminPath;
}

(function () {
    const publicPages = ['login.html', 'admin/login.html'];
    const currentPage = getCurrentPage(window.location.pathname);
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    const isPublicPage = isPublicPageCheck(currentPage, publicPages);
    const isAdminPath = isAdminPathCheck(window.location.pathname);

    if (currentUser) {
        const users = JSON.parse(localStorage.getItem('siteUsers')) || [];
        if (checkBlockedUser(currentUser, users)) {
            localStorage.removeItem('currentUser');
            alert("🚫 Access Restricted: Please contact the administrator.");
            window.location.href = 'login.html';
            return;
        }
    }

    if (shouldRedirectToLogin(currentUser, isPublicPage, isAdminPath)) {
        window.location.href = 'login.html';
    }
})();

// Export for testing (Node.js only)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        isPublicPageCheck,
        getCurrentPage,
        isAdminPathCheck,
        checkBlockedUser,
        shouldRedirectToLogin
    };
}
