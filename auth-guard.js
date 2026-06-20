(function () {
    var currentUser = null;
    try {
        var raw = localStorage.getItem('currentUser');
        if (raw) currentUser = JSON.parse(raw);
    } catch (e) {
        console.error('auth-guard: failed to parse currentUser from localStorage', e);
        localStorage.removeItem('currentUser');
    }

    var publicPages = ['login.html', 'admin/login.html'];
    var pathParts = window.location.pathname.split('/');
    var currentPage = pathParts.pop() || 'index.html';

    var isPublicPage = publicPages.some(function (p) {
        return currentPage.toLowerCase().includes(p.toLowerCase());
    });
    var isAdminPath = window.location.pathname.includes('/admin/');

    if (currentUser) {
        var users = [];
        try {
            var rawUsers = localStorage.getItem('siteUsers');
            if (rawUsers) users = JSON.parse(rawUsers);
        } catch (e) {
            console.error('auth-guard: failed to parse siteUsers from localStorage', e);
        }
        if (Array.isArray(users)) {
            var masterUser = users.find(function (u) { return u.email === currentUser.email; });
            if (masterUser && masterUser.blocked) {
                localStorage.removeItem('currentUser');
                alert("Access Restricted: Please contact the administrator.");
                window.location.href = 'login.html';
                return;
            }
        }
    }

    if (!currentUser && !isPublicPage && !isAdminPath) {
        window.location.href = 'login.html';
    }
})();
