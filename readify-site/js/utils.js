// Shared utilities for Readify
const ReadifyStorage = {
  save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  load(key, fallback) {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    try {
      return JSON.parse(raw);
    } catch (error) {
      console.warn('Failed to parse storage data', error);
      return fallback;
    }
  }
};

const revealElements = () => {
  const reveals = document.querySelectorAll('.reveal');
  const trigger = window.innerHeight * 0.9;
  reveals.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < trigger) {
      el.classList.add('active');
    }
  });
};

document.addEventListener('scroll', revealElements);
document.addEventListener('DOMContentLoaded', () => {
  revealElements();
  const backToTop = document.querySelector('#backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
