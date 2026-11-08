const cards = [...document.querySelectorAll('.card')];
const filters = [...document.querySelectorAll('.filter-btn')];
const categories = new Set(filters.map(button => button.dataset.filter));

function applyFilter(category, updateUrl = false) {
  if (!categories.has(category)) category = 'all';

  filters.forEach(button => {
    const active = button.dataset.filter === category;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });

  cards.forEach(card => {
    card.hidden = category !== 'all' && !card.dataset.tags.split(' ').includes(category);
    // Carry the selected filter into each page's return links.
    const link = card.querySelector('.card-link');
    const url = new URL(link.href);
    if (category === 'all') url.searchParams.delete('category');
    else url.searchParams.set('category', category);
    link.href = url.href;
  });

  if (updateUrl) {
    const url = new URL(location.href);
    if (category === 'all') url.searchParams.delete('category');
    else url.searchParams.set('category', category);
    url.hash = '';
    history.replaceState(null, '', url);
    const count = cards.filter(card => !card.hidden).length;
    const label = filters.find(button => button.dataset.filter === category).textContent;
    document.getElementById('filter-status').textContent = `${count} projects shown: ${label}.`;
  }
}

filters.forEach(button => {
  button.addEventListener('click', () => applyFilter(button.dataset.filter, true));
});

// The URL also restores the filter on reload or browser Back.
window.addEventListener('pageshow', () => {
  applyFilter(new URL(location.href).searchParams.get('category'));
});
applyFilter(new URL(location.href).searchParams.get('category'));
