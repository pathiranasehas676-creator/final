// Home page: quotes, author of day, newsletter
const quotes = [
  {
    text: '“Books are a uniquely portable magic.”',
    author: 'Stephen King'
  },
  {
    text: '“Reading is to the mind what exercise is to the body.”',
    author: 'Joseph Addison'
  },
  {
    text: '“A reader lives a thousand lives before he dies.”',
    author: 'George R.R. Martin'
  }
];

const authors = [
  'Toni Morrison',
  'Neil Gaiman',
  'Jane Austen',
  'Chimamanda Ngozi Adichie',
  'Brandon Sanderson',
  'Agatha Christie',
  'Haruki Murakami'
];

const updateQuote = (index) => {
  const quoteText = document.querySelector('#quoteText');
  const quoteAuthor = document.querySelector('#quoteAuthor');
  const dots = document.querySelectorAll('.dot');

  if (quoteText && quoteAuthor) {
    quoteText.textContent = quotes[index].text;
    quoteAuthor.textContent = `— ${quotes[index].author}`;
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === index);
    });
  }
};

let quoteIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
  updateQuote(quoteIndex);
  setInterval(() => {
    quoteIndex = (quoteIndex + 1) % quotes.length;
    updateQuote(quoteIndex);
  }, 4500);

  const authorEl = document.querySelector('#authorOfDay');
  if (authorEl) {
    const dayIndex = new Date().getDay();
    authorEl.textContent = authors[dayIndex];
  }

  const form = document.querySelector('#newsletterForm');
  const msg = document.querySelector('#newsletterMsg');
  if (form && msg) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const emailInput = form.querySelector('input');
      const email = emailInput.value.trim();
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!isValid) {
        msg.className = 'msg-error';
        msg.textContent = 'Please enter a valid campus email.';
        return;
      }
      const saved = ReadifyStorage.load('readify_newsletter', []);
      saved.push({ email, date: new Date().toISOString() });
      ReadifyStorage.save('readify_newsletter', saved);
      msg.className = 'msg-success';
      msg.textContent = 'Subscribed! Check your inbox for cozy updates.';
      form.reset();
    });
  }
});
