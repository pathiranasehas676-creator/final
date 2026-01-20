// Feedback form validation + FAQ accordion
const feedbackKey = 'readify_feedback';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#feedbackForm');
  const message = document.querySelector('#feedbackMsg');

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const note = form.message.value.trim();

      const errors = {
        name: name.length < 2 ? 'Please enter your name.' : '',
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? '' : 'Enter a valid email.',
        message: note.length < 10 ? 'Message should be at least 10 characters.' : ''
      };

      form.querySelectorAll('.error-text').forEach((el) => (el.textContent = ''));

      Object.keys(errors).forEach((key) => {
        if (errors[key]) {
          form.querySelector(`#${key}Error`).textContent = errors[key];
        }
      });

      if (Object.values(errors).some((value) => value)) {
        message.className = 'msg-error';
        message.textContent = 'Please fix the highlighted fields.';
        return;
      }

      const stored = ReadifyStorage.load(feedbackKey, []);
      stored.push({ name, email, message: note, date: new Date().toISOString() });
      ReadifyStorage.save(feedbackKey, stored);
      message.className = 'msg-success';
      message.textContent = 'Thanks! Your feedback was saved.';
      form.reset();
    });
  }

  document.querySelectorAll('.accordion-item').forEach((item) => {
    const title = item.querySelector('.accordion-title');
    title.addEventListener('click', () => {
      document.querySelectorAll('.accordion-item').forEach((other) => {
        if (other !== item) other.classList.remove('active');
      });
      item.classList.toggle('active');
    });
  });
});
