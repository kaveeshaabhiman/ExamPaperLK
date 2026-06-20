(function () {
    const publicPages = ['login.html', 'admin.html'];
    var pathParts = window.location.pathname.split('/');
    var currentPage = pathParts.pop() || 'index.html';

    var isPublicPage = publicPages.some(function(p) {
        return currentPage.toLowerCase().includes(p.toLowerCase());
    });

    if (isPublicPage) return;

    var raw = localStorage.getItem('currentUser');
    var currentUser = null;
    try { currentUser = JSON.parse(raw); } catch(e) { currentUser = null; }

    if (currentUser && typeof currentUser === 'object') {
        var users = [];
        try { users = JSON.parse(localStorage.getItem('siteUsers')) || []; } catch(e) {}
        var masterUser = users.find(function(u) { return u.email === currentUser.email; });
        if (masterUser && masterUser.blocked) {
            localStorage.removeItem('currentUser');
            window.location.href = 'login.html';
            return;
        }
    }

    if (!currentUser) {
        window.location.href = 'login.html';
    }
})();
