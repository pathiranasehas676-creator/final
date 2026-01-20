// Reading Flow sounds + completed books
const flowKey = 'readify_completed';
let currentAudio = null;

const setPlayingStatus = (text) => {
  const status = document.querySelector('#nowPlaying');
  if (status) status.textContent = text;
};

const stopAudio = () => {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
    setPlayingStatus('Not playing');
  }
};

const renderCompleted = () => {
  const list = ReadifyStorage.load(flowKey, []);
  const container = document.querySelector('#completedList');
  if (!container) return;
  if (!list.length) {
    container.innerHTML = '<p>No books completed yet.</p>';
    return;
  }
  container.innerHTML = list
    .map(
      (item) => `
      <div class="card">
        <strong>${item}</strong>
        <button class="btn btn-secondary" data-title="${item}">Undo</button>
      </div>
    `
    )
    .join('');
};

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-sound]').forEach((button) => {
    button.addEventListener('click', () => {
      const src = button.dataset.sound;
      if (currentAudio && currentAudio.src.includes(src)) {
        stopAudio();
        button.classList.remove('active');
        return;
      }
      document.querySelectorAll('[data-sound]').forEach((btn) => btn.classList.remove('active'));
      currentAudio = new Audio(src);
      currentAudio.loop = true;
      currentAudio.play();
      button.classList.add('active');
      setPlayingStatus(`Playing ${button.textContent}`);
    });
  });

  const stopBtn = document.querySelector('#stopSound');
  const pauseBtn = document.querySelector('#pauseSound');
  if (stopBtn) {
    stopBtn.addEventListener('click', stopAudio);
  }
  if (pauseBtn) {
    pauseBtn.addEventListener('click', () => {
      if (currentAudio) {
        currentAudio.pause();
        setPlayingStatus('Paused');
      }
    });
  }

  const form = document.querySelector('#completedForm');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const title = form.completedTitle.value.trim();
      if (!title) return;
      const list = ReadifyStorage.load(flowKey, []);
      list.push(title);
      ReadifyStorage.save(flowKey, list);
      form.reset();
      renderCompleted();
    });
  }

  document.body.addEventListener('click', (event) => {
    if (event.target.matches('#completedList button')) {
      const title = event.target.dataset.title;
      const list = ReadifyStorage.load(flowKey, []);
      const updated = list.filter((item) => item !== title);
      ReadifyStorage.save(flowKey, updated);
      renderCompleted();
    }
  });

  renderCompleted();
});
