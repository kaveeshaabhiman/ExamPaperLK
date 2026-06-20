// This script automatically counts papers from data.js and updates the UI

document.addEventListener('DOMContentLoaded', () => {
    if (typeof papersData === 'undefined' || !Array.isArray(papersData)) {
        console.error("count-papers: papersData is not available or not an array");
        document.querySelectorAll('[data-count-target]').forEach(el => {
            el.textContent = '0 Papers';
        });
        return;
    }

    const countElements = document.querySelectorAll('[data-count-target]');

    countElements.forEach(el => {
        const subject = el.getAttribute('data-subject');
        const level = el.getAttribute('data-level');
        const type = el.getAttribute('data-type');

        const count = papersData.filter(paper => {
            if (!paper) return false;
            if (level && paper.level !== level) return false;
            if (type && paper.type !== type) return false;

            if (subject) {
                const searchSubject = subject.toLowerCase().trim();
                const paperSubject = (paper.subject || "").toLowerCase().trim();
                if (paperSubject !== searchSubject) return false;
            }

            return true;
        }).length;

        el.textContent = `${count} Papers`;
    });
});
