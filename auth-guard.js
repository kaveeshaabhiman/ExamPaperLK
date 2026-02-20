(function () {
    const publicPages = ['login.html', 'admin/login.html'];
    const currentPage = window.location.pathname.split('/').pop();

    // Check if user is logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const isAdmin = sessionStorage.getItem('isAdmin') === 'true';

    // If not logged in and not on a public page, redirect to user login
    if (!currentUser && !publicPages.includes(currentPage) && !window.location.pathname.includes('admin/')) {
        window.location.href = 'login.html';
    }
})();
