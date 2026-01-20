// Random Recommender logic
const recKey = 'readify_recommend_list';
const allBooks = window.READIFY_BOOKS || [];

const pickRandom = (genre, length) => {
  const filtered = allBooks.filter((book) => {
    const genreMatch = genre === 'All' || book.genre === genre;
    const lengthMatch = length === 'All' || book.length === length;
    return genreMatch && lengthMatch;
  });
  if (!filtered.length) return null;
  const index = Math.floor(Math.random() * filtered.length);
  return filtered[index];
};

const renderRecommendation = (book) => {
  const card = document.querySelector('#recommendationCard');
  if (!card) return;
  if (!book) {
    card.innerHTML = '<p>No matching book. Try another filter.</p>';
    return;
  }
  card.innerHTML = `
    <h3>${book.title}</h3>
    <p><strong>${book.author}</strong></p>
    <p>${book.synopsis}</p>
    <div class="badge">${book.genre}</div>
    <div class="badge">${book.length}</div>
  `;
};

const renderList = () => {
  const list = ReadifyStorage.load(recKey, []);
  const container = document.querySelector('#readingListPreview');
  if (!container) return;
  if (!list.length) {
    container.innerHTML = '<p>Your reading list is empty.</p>';
    return;
  }
  container.innerHTML = list
    .map((book) => `<div class="card"><strong>${book.title}</strong><br><small>${book.author}</small></div>`)
    .join('');
};

document.addEventListener('DOMContentLoaded', () => {
  const genreSelect = document.querySelector('#recGenre');
  const lengthSelect = document.querySelector('#recLength');
  const recommendBtn = document.querySelector('#recommendBtn');
  const pickAgainBtn = document.querySelector('#pickAgain');
  const saveBtn = document.querySelector('#saveRec');
  const card = document.querySelector('#recommendationCard');

  let currentBook = null;

  const doPick = () => {
    currentBook = pickRandom(genreSelect.value, lengthSelect.value);
    renderRecommendation(currentBook);
  };

  recommendBtn.addEventListener('click', doPick);
  pickAgainBtn.addEventListener('click', () => {
    doPick();
    card.classList.remove('pick-again');
    void card.offsetWidth;
    card.classList.add('pick-again');
  });

  saveBtn.addEventListener('click', () => {
    if (!currentBook) return;
    const list = ReadifyStorage.load(recKey, []);
    if (!list.find((book) => book.id === currentBook.id)) {
      list.push(currentBook);
      ReadifyStorage.save(recKey, list);
      renderList();
    }
  });

  renderList();
});
