/**
 * @jest-environment jsdom
 */

const { filterPapers, countPapers, updatePaperCounts } = require('../count-papers');

const samplePapers = [
    { subject: 'Mathematics', level: 'O/L', type: 'Past Paper' },
    { subject: 'Mathematics', level: 'O/L', type: 'Model Paper' },
    { subject: 'Science', level: 'O/L', type: 'Past Paper' },
    { subject: 'Physics', level: 'A/L', type: 'Past Paper' },
    { subject: 'Physics', level: 'A/L', type: 'Model Paper' },
    { subject: 'Chemistry', level: 'A/L', type: 'Past Paper' },
    { subject: 'Combined Maths', level: 'A/L', type: 'Provincial' },
    { subject: 'Sinhala', level: 'O/L', type: 'Term Test' },
];

// --- filterPapers tests ---

describe('filterPapers', () => {
    test('returns all papers when no filters applied', () => {
        const result = filterPapers(samplePapers);
        expect(result).toHaveLength(samplePapers.length);
    });

    test('returns all papers with empty filter object', () => {
        const result = filterPapers(samplePapers, {});
        expect(result).toHaveLength(samplePapers.length);
    });

    test('filters by level', () => {
        const result = filterPapers(samplePapers, { level: 'O/L' });
        expect(result).toHaveLength(4);
        result.forEach(p => expect(p.level).toBe('O/L'));
    });

    test('filters by level A/L', () => {
        const result = filterPapers(samplePapers, { level: 'A/L' });
        expect(result).toHaveLength(4);
        result.forEach(p => expect(p.level).toBe('A/L'));
    });

    test('filters by type', () => {
        const result = filterPapers(samplePapers, { type: 'Past Paper' });
        expect(result).toHaveLength(4);
        result.forEach(p => expect(p.type).toBe('Past Paper'));
    });

    test('filters by subject (case-insensitive)', () => {
        const result = filterPapers(samplePapers, { subject: 'mathematics' });
        expect(result).toHaveLength(2);
        result.forEach(p => expect(p.subject.toLowerCase()).toBe('mathematics'));
    });

    test('filters by subject (uppercase)', () => {
        const result = filterPapers(samplePapers, { subject: 'PHYSICS' });
        expect(result).toHaveLength(2);
    });

    test('filters by subject with whitespace trimming', () => {
        const result = filterPapers(samplePapers, { subject: '  Physics  ' });
        expect(result).toHaveLength(2);
    });

    test('filters by level and type combined', () => {
        const result = filterPapers(samplePapers, { level: 'O/L', type: 'Past Paper' });
        expect(result).toHaveLength(2);
    });

    test('filters by all three criteria', () => {
        const result = filterPapers(samplePapers, { subject: 'Mathematics', level: 'O/L', type: 'Past Paper' });
        expect(result).toHaveLength(1);
        expect(result[0].subject).toBe('Mathematics');
    });

    test('returns empty array when no match', () => {
        const result = filterPapers(samplePapers, { subject: 'Biology' });
        expect(result).toHaveLength(0);
    });

    test('returns empty array for empty papers list', () => {
        const result = filterPapers([], { level: 'O/L' });
        expect(result).toHaveLength(0);
    });

    test('handles papers with missing subject field', () => {
        const papers = [
            { level: 'O/L', type: 'Past Paper' },
            { subject: 'Math', level: 'O/L', type: 'Past Paper' },
        ];
        const result = filterPapers(papers, { subject: 'Math' });
        expect(result).toHaveLength(1);
    });

    test('handles papers with undefined subject gracefully', () => {
        const papers = [{ level: 'O/L', type: 'Past Paper' }];
        expect(() => filterPapers(papers, { subject: 'Math' })).not.toThrow();
        expect(filterPapers(papers, { subject: 'Math' })).toHaveLength(0);
    });

    test('does not mutate the original array', () => {
        const original = [...samplePapers];
        filterPapers(samplePapers, { level: 'O/L' });
        expect(samplePapers).toEqual(original);
    });
});

// --- countPapers tests ---

describe('countPapers', () => {
    test('returns total count when no filters', () => {
        expect(countPapers(samplePapers)).toBe(samplePapers.length);
    });

    test('returns correct count for level filter', () => {
        expect(countPapers(samplePapers, { level: 'O/L' })).toBe(4);
        expect(countPapers(samplePapers, { level: 'A/L' })).toBe(4);
    });

    test('returns correct count for type filter', () => {
        expect(countPapers(samplePapers, { type: 'Past Paper' })).toBe(4);
        expect(countPapers(samplePapers, { type: 'Model Paper' })).toBe(2);
    });

    test('returns correct count for subject filter', () => {
        expect(countPapers(samplePapers, { subject: 'Mathematics' })).toBe(2);
        expect(countPapers(samplePapers, { subject: 'Physics' })).toBe(2);
    });

    test('returns correct count for combined filters', () => {
        expect(countPapers(samplePapers, { level: 'A/L', type: 'Past Paper' })).toBe(2);
        expect(countPapers(samplePapers, { subject: 'Mathematics', level: 'O/L' })).toBe(2);
    });

    test('returns 0 when no match', () => {
        expect(countPapers(samplePapers, { subject: 'Art' })).toBe(0);
    });

    test('returns 0 for empty papers list', () => {
        expect(countPapers([])).toBe(0);
    });

    test('returns 1 for Provincial type', () => {
        expect(countPapers(samplePapers, { type: 'Provincial' })).toBe(1);
    });
});

// --- updatePaperCounts (DOM integration) tests ---

describe('updatePaperCounts', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });

    test('updates text content of elements with data-count-target', () => {
        document.body.innerHTML = `
            <span data-count-target data-level="O/L"></span>
        `;
        updatePaperCounts(samplePapers);
        const el = document.querySelector('[data-count-target]');
        expect(el.textContent).toBe('4 Papers');
    });

    test('updates multiple count elements', () => {
        document.body.innerHTML = `
            <span data-count-target data-level="O/L" id="ol"></span>
            <span data-count-target data-level="A/L" id="al"></span>
        `;
        updatePaperCounts(samplePapers);
        expect(document.getElementById('ol').textContent).toBe('4 Papers');
        expect(document.getElementById('al').textContent).toBe('4 Papers');
    });

    test('handles subject filter in DOM', () => {
        document.body.innerHTML = `
            <span data-count-target data-subject="Mathematics"></span>
        `;
        updatePaperCounts(samplePapers);
        const el = document.querySelector('[data-count-target]');
        expect(el.textContent).toBe('2 Papers');
    });

    test('handles type filter in DOM', () => {
        document.body.innerHTML = `
            <span data-count-target data-type="Past Paper"></span>
        `;
        updatePaperCounts(samplePapers);
        const el = document.querySelector('[data-count-target]');
        expect(el.textContent).toBe('4 Papers');
    });

    test('handles combined filters in DOM', () => {
        document.body.innerHTML = `
            <span data-count-target data-subject="Mathematics" data-level="O/L" data-type="Past Paper"></span>
        `;
        updatePaperCounts(samplePapers);
        const el = document.querySelector('[data-count-target]');
        expect(el.textContent).toBe('1 Papers');
    });

    test('shows 0 Papers when no match', () => {
        document.body.innerHTML = `
            <span data-count-target data-subject="Biology"></span>
        `;
        updatePaperCounts(samplePapers);
        const el = document.querySelector('[data-count-target]');
        expect(el.textContent).toBe('0 Papers');
    });

    test('handles no count elements gracefully', () => {
        document.body.innerHTML = '<div>No count elements here</div>';
        expect(() => updatePaperCounts(samplePapers)).not.toThrow();
    });

    test('counts all papers when no filter attributes present', () => {
        document.body.innerHTML = `
            <span data-count-target></span>
        `;
        updatePaperCounts(samplePapers);
        const el = document.querySelector('[data-count-target]');
        expect(el.textContent).toBe('8 Papers');
    });
});
