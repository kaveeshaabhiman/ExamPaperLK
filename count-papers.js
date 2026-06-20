// This script automatically counts papers from data.js and updates the UI

function filterPapers(papers, { subject, level, type } = {}) {
    return papers.filter(paper => {
        if (level && paper.level !== level) return false;
        if (type && paper.type !== type) return false;
        if (subject) {
            const searchSubject = subject.toLowerCase().trim();
            const paperSubject = (paper.subject || "").toLowerCase().trim();
            if (paperSubject !== searchSubject) return false;
        }
        return true;
    });
}

function countPapers(papers, { subject, level, type } = {}) {
    return filterPapers(papers, { subject, level, type }).length;
}

function updatePaperCounts(papersData) {
    const countElements = document.querySelectorAll('[data-count-target]');

    countElements.forEach(el => {
        const subject = el.getAttribute('data-subject');
        const level = el.getAttribute('data-level');
        const type = el.getAttribute('data-type');

        const count = countPapers(papersData, { subject, level, type });
        el.textContent = `${count} Papers`;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    if (typeof papersData === 'undefined') {
        console.error("data.js is not loaded!");
        return;
    }
    updatePaperCounts(papersData);
});

// Export for testing (Node.js only)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { filterPapers, countPapers, updatePaperCounts };
}
