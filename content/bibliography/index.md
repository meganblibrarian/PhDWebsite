---
title: "Annotated Bibliography"
summary: "A searchable reading room for my research library."
showDate: false
showAuthor: false
showReadingTime: false
showWordCount: false
showEdit: false
---

Search across every field below — citation, purpose, framework, methodology, findings, and relevance to my research.

<div class="bib-reader">
  <div class="bib-search-row">
    <label for="bib-search">Search entries</label>
    <input id="bib-search" type="text" placeholder="Try a keyword, author, or theme…" autocomplete="off">
  </div>
  <p class="bib-count" id="bib-count"></p>
  <div id="bib-results"></div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.4.1/papaparse.min.js"></script>

<style>
  .bib-reader {
    margin: 1.5rem 0 2.5rem;
    font-family: inherit;
  }

  .bib-search-row label {
    display: block;
    font-size: 0.75rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: rgb(var(--color-neutral-500) / 1);
    margin-bottom: 0.4rem;
  }

  #bib-search {
    width: 100%;
    padding: 0.7rem 0.9rem;
    font-size: 0.95rem;
    font-family: inherit;
    background: rgb(var(--color-neutral-100) / 1);
    border: 1px solid rgb(var(--color-neutral-300) / 1);
    border-radius: 0.375rem;
    color: rgb(var(--color-neutral-900) / 1);
    outline: none;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
  }

  html.dark #bib-search {
    background: rgb(var(--color-neutral-800) / 1);
    border-color: rgb(var(--color-neutral-600) / 1);
    color: rgb(var(--color-neutral-100) / 1);
  }

  #bib-search:focus {
    border-color: rgb(var(--color-primary-500) / 1);
    box-shadow: 0 0 0 3px rgb(var(--color-primary-500) / 0.15);
  }

  .bib-count {
    font-size: 0.8rem;
    color: rgb(var(--color-neutral-500) / 1);
    margin: 0.6rem 0.1rem 1.5rem;
  }

  .bib-status {
    font-size: 0.85rem;
    color: rgb(var(--color-neutral-500) / 1);
    padding: 2rem 0;
    text-align: center;
  }

  .bib-status.error {
    color: rgb(var(--color-primary-600) / 1);
  }

  .bib-card {
    position: relative;
    background: rgb(var(--color-neutral-100) / 1);
    border: 1px solid rgb(var(--color-neutral-300) / 1);
    border-left: 3px solid rgb(var(--color-secondary-500) / 1);
    border-radius: 0.375rem;
    margin-bottom: 1.1rem;
    padding: 1.2rem 1.3rem 1.3rem;
  }

  html.dark .bib-card {
    background: rgb(var(--color-neutral-800) / 1);
    border-color: rgb(var(--color-neutral-600) / 1);
    border-left-color: rgb(var(--color-secondary-400) / 1);
  }

  .bib-citation {
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.5;
    margin: 0 0 0.9rem;
    padding-bottom: 0.8rem;
    border-bottom: 1px solid rgb(var(--color-neutral-300) / 1);
    color: rgb(var(--color-neutral-900) / 1);
  }

  html.dark .bib-citation {
    border-bottom-color: rgb(var(--color-neutral-600) / 1);
    color: rgb(var(--color-neutral-100) / 1);
  }

  .bib-field {
    display: grid;
    grid-template-columns: 108px 1fr;
    gap: 0.8rem;
    margin-bottom: 0.6rem;
    align-items: baseline;
  }

  .bib-field:last-child { margin-bottom: 0; }

  .bib-field-label {
    font-size: 0.68rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: rgb(var(--color-neutral-500) / 1);
    padding-top: 0.1rem;
  }

  .bib-field-value {
    font-size: 0.9rem;
    color: rgb(var(--color-neutral-800) / 1);
  }

  html.dark .bib-field-value {
    color: rgb(var(--color-neutral-200) / 1);
  }

  .bib-field-value.empty {
    color: rgb(var(--color-neutral-400) / 1);
    font-style: italic;
  }

  .bib-field.relevance .bib-field-value,
  .bib-field.relevance .bib-field-label {
    color: rgb(var(--color-primary-600) / 1);
  }

  html.dark .bib-field.relevance .bib-field-value,
  html.dark .bib-field.relevance .bib-field-label {
    color: rgb(var(--color-primary-400) / 1);
  }

  @media (max-width: 560px) {
    .bib-field {
      grid-template-columns: 1fr;
      gap: 0.15rem;
    }
  }
</style>

<script>
  (function () {
    // Replace with your sheet's published CSV link:
    // File → Share → Publish to web → select the "Bibliography" tab → CSV → Publish
    const CSV_URL = 'PASTE_YOUR_PUBLISHED_CSV_URL_HERE';

    const resultsEl = document.getElementById('bib-results');
    const countEl = document.getElementById('bib-count');
    const searchEl = document.getElementById('bib-search');
    let entries = [];

    function showStatus(message, isError) {
      resultsEl.innerHTML = `<p class="bib-status${isError ? ' error' : ''}">${message}</p>`;
    }

    function escapeHtml(str) {
      return (str || '').replace(/[&<>"']/g, c => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
      }[c]));
    }

    function fieldRow(label, value, extraClass) {
      const isEmpty = !value || !value.trim();
      return `<div class="bib-field${extraClass ? ' ' + extraClass : ''}">
        <div class="bib-field-label">${label}</div>
        <div class="bib-field-value${isEmpty ? ' empty' : ''}">${isEmpty ? 'Not filled in yet' : escapeHtml(value)}</div>
      </div>`;
    }

    function render(list) {
      if (list.length === 0) {
        showStatus('No entries match that search. Try a broader term.', false);
        countEl.textContent = '';
        return;
      }
      countEl.textContent = `Showing ${list.length} of ${entries.length} entries`;
      resultsEl.innerHTML = list.map(e => `
        <div class="bib-card">
          <p class="bib-citation">${escapeHtml(e.citation) || 'Citation pending'}</p>
          ${fieldRow('Purpose', e.purpose)}
          ${fieldRow('Framework', e.framework)}
          ${fieldRow('Methodology', e.methodology)}
          ${fieldRow('Findings', e.findings)}
          ${fieldRow('Relevance', e.relevance, 'relevance')}
        </div>
      `).join('');
    }

    function filterEntries(query) {
      const q = query.trim().toLowerCase();
      if (!q) return entries;
      return entries.filter(e =>
        [e.citation, e.purpose, e.framework, e.methodology, e.findings, e.relevance]
          .some(field => (field || '').toLowerCase().includes(q))
      );
    }

    searchEl.addEventListener('input', () => render(filterEntries(searchEl.value)));

    if (CSV_URL.includes('PASTE_YOUR')) {
      showStatus('Add your published CSV link inside the script to load your library.', true);
      return;
    }

    showStatus('Loading your library…', false);
    fetch(CSV_URL)
      .then(res => {
        if (!res.ok) throw new Error('Sheet returned status ' + res.status);
        return res.text();
      })
      .then(csvText => {
        const rows = Papa.parse(csvText.trim(), { skipEmptyLines: true }).data;
        entries = rows.slice(1)
          .filter(r => r.length >= 2 && r[1])
          .map(r => ({
            key: r[0] || '',
            citation: r[1] || '',
            purpose: r[2] || '',
            framework: r[3] || '',
            methodology: r[4] || '',
            findings: r[5] || '',
            relevance: r[6] || ''
          }));
        if (entries.length === 0) {
          showStatus('The sheet loaded, but no entries were found. Check the CSV link points at the Bibliography tab.', true);
        } else {
          render(entries);
        }
      })
      .catch(err => {
        showStatus('Could not load the sheet (' + err.message + '). Check the published CSV link is correct and still public.', true);
      });
  })();
</script>
