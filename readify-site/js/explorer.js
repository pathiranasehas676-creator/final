// Explorer page: render books + modal + filters
const books = window.READIFY_BOOKS || [];
const listKey = 'readify_reading_list';

const renderBooks = (items) => {
  const grid = document.querySelector('#bookGrid');
  if (!grid) return;
  grid.innerHTML = '';
  if (!items.length) {
    grid.innerHTML = '<p>No books match your filters yet.</p>';
    return;
  }
  items.forEach((book) => {
    const card = document.createElement('div');
    card.className = 'card book-card reveal';
    card.innerHTML = `
      <img src="${book.cover}" alt="${book.title} cover">
      <h3>${book.title}</h3>
      <p><strong>${book.author}</strong></p>
      <p class="badge">${book.genre}</p>
      <button class="btn btn-secondary" data-id="${book.id}">View Details</button>
    `;
    grid.appendChild(card);
  });
};

const openModal = (book) => {
  const modal = document.querySelector('#bookModal');
  const modalTitle = document.querySelector('#modalTitle');
  const modalSynopsis = document.querySelector('#modalSynopsis');
  const modalSeries = document.querySelector('#modalSeries');
  const modalTable = document.querySelector('#modalTable');
  const addBtn = document.querySelector('#addToList');

  if (!modal) return;
  modalTitle.textContent = book.title;
  modalSynopsis.textContent = book.synopsis;
  modalSeries.innerHTML = `
    <li><strong>Prequels:</strong> ${book.prequels.length ? book.prequels.join(', ') : 'None'}</li>
    <li><strong>Sequels:</strong> ${book.sequels.length ? book.sequels.join(', ') : 'None'}</li>
  `;
  modalTable.innerHTML = book.reviews
    .map(
      (review) => `
      <tr>
        <td>${review.reviewer}</td>
        <td>${review.rating}</td>
        <td>${review.comment}</td>
      </tr>
    `
    )
    .join('');

  addBtn.onclick = () => {
    const list = ReadifyStorage.load(listKey, []);
    if (!list.find((item) => item.id === book.id)) {
      list.push(book);
      ReadifyStorage.save(listKey, list);
    }
    modal.classList.remove('active');
  };

  modal.classList.add('active');
};

document.addEventListener('DOMContentLoaded', () => {
  renderBooks(books);

  const searchInput = document.querySelector('#searchInput');
  const genreFilter = document.querySelector('#genreFilter');
  const authorFilter = document.querySelector('#authorFilter');

  const filterBooks = () => {
    const query = searchInput.value.toLowerCase();
    const genre = genreFilter.value;
    const author = authorFilter.value.toLowerCase();

    const filtered = books.filter((book) => {
      const matchesQuery =
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query);
      const matchesGenre = genre === 'All' || book.genre === genre;
      const matchesAuthor = !author || book.author.toLowerCase().includes(author);
      return matchesQuery && matchesGenre && matchesAuthor;
    });
    renderBooks(filtered);
  };

  [searchInput, genreFilter, authorFilter].forEach((input) => {
    input.addEventListener('input', filterBooks);
  });

  document.body.addEventListener('click', (event) => {
    const target = event.target;
    if (target.matches('.book-card button')) {
      const id = Number(target.dataset.id);
      const book = books.find((item) => item.id === id);
      if (book) openModal(book);
    }
    if (target.matches('#modalClose') || target.matches('#bookModal')) {
      document.querySelector('#bookModal').classList.remove('active');
    }
  });
});
