(function () {
    const publicPages = ['login.html', 'admin/login.html'];
    // Handle cases where pathname might be empty or "/"
    const pathParts = window.location.pathname.split('/');
    const currentPage = pathParts.pop() || 'index.html';
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // Check if we are actually on a public page (handling case-sensitivity and local paths)
    const isPublicPage = publicPages.some(p => currentPage.toLowerCase().includes(p.toLowerCase()));
    const isAdminPath = window.location.pathname.includes('/admin/');

    if (currentUser) {
        const users = JSON.parse(localStorage.getItem('siteUsers')) || [];
        const masterUser = users.find(u => u.email === currentUser.email);
        if (masterUser && masterUser.blocked) {
            localStorage.removeItem('currentUser');
            alert("🚫 Access Restricted: Please contact the administrator.");
            window.location.href = 'login.html';
            return;
        }
    }

    if (!currentUser && !isPublicPage && !isAdminPath) {
        // Redirect to login, ensuring we use a relative path that works on GitHub Pages
        window.location.href = 'login.html';
    }
})();
