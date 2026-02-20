// This script automatically counts papers from data.js and updates the UI

document.addEventListener('DOMContentLoaded', () => {
    // Check if papersData is loaded
    if (typeof papersData === 'undefined') {
        console.error("data.js is not loaded!");
        return;
    }

    // Select all elements that need a count update
    // Elements should have data-subject, and optionally data-level or data-type
    const countElements = document.querySelectorAll('[data-count-target]');

    countElements.forEach(el => {
        const subject = el.getAttribute('data-subject');
        const level = el.getAttribute('data-level');
        const type = el.getAttribute('data-type');

        // Filter papers
        const count = papersData.filter(paper => {
            // Level check (Mandatory if specified)
            if (level && paper.level !== level) return false;

            // Type check (Mandatory if specified)
            if (type && paper.type !== type) return false;

            // Subject check (If specified) - Case-insensitive & trimmed
            if (subject) {
                const searchSubject = subject.toLowerCase().trim();
                const paperSubject = (paper.subject || "").toLowerCase().trim();
                if (paperSubject !== searchSubject) return false;
            }

            return true;
        }).length;

        // Update text
        el.textContent = `${count} Papers`;
    });
});
