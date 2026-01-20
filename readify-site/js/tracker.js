// Progress Tracker logic
const trackerKey = 'readify_progress';

const updateResults = ({ percent, daysLeft, finishDate }) => {
  const percentEl = document.querySelector('#percentComplete');
  const finishEl = document.querySelector('#finishEstimate');
  const bar = document.querySelector('#progressFill');
  const counter = document.querySelector('#counter');

  if (percentEl) {
    percentEl.textContent = `${percent.toFixed(1)}%`;
  }
  if (finishEl) {
    finishEl.textContent = daysLeft <= 0
      ? 'You can finish today!'
      : `Estimated finish: ${finishDate}`;
  }
  if (bar) {
    bar.style.width = `${percent}%`;
  }
  if (counter) {
    let current = 0;
    const target = Math.round(percent);
    const step = () => {
      current += 1;
      counter.textContent = `${current}%`;
      if (current < target) {
        requestAnimationFrame(step);
      }
    };
    step();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#trackerForm');
  const saveBtn = document.querySelector('#saveProgress');
  const status = document.querySelector('#saveStatus');

  const saved = ReadifyStorage.load(trackerKey, null);
  if (saved && form) {
    form.totalPages.value = saved.totalPages;
    form.pagesRead.value = saved.pagesRead;
    form.speed.value = saved.speed;
    updateResults(saved.results);
  }

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const total = Number(form.totalPages.value);
      const read = Number(form.pagesRead.value);
      const speed = Number(form.speed.value);
      if (!total || !read || !speed || read > total) return;

      const percent = Math.min((read / total) * 100, 100);
      const remainingPages = total - read;
      const daysLeft = Math.ceil(remainingPages / speed);
      const finishDate = new Date();
      finishDate.setDate(finishDate.getDate() + daysLeft);
      const results = {
        percent,
        daysLeft,
        finishDate: finishDate.toDateString()
      };
      updateResults(results);

      if (status) {
        status.textContent = '';
      }

      form.dataset.results = JSON.stringify(results);
    });
  }

  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      if (!form.dataset.results) return;
      const results = JSON.parse(form.dataset.results);
      const payload = {
        totalPages: form.totalPages.value,
        pagesRead: form.pagesRead.value,
        speed: form.speed.value,
        results
      };
      ReadifyStorage.save(trackerKey, payload);
      if (status) {
        status.className = 'msg-success';
        status.textContent = 'Progress saved!';
      }
    });
  }
});
