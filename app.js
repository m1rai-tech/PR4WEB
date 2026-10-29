const audio = document.querySelector('audio');
const playBtn = document.querySelector('.play');
const rows = document.querySelectorAll('.tracks tbody tr');
const nowTitle = document.querySelector('.now-title');
const nowArtist = document.querySelector('.player .artist');
const nowCover = document.querySelector('.now-cover');

const likeBtn = document.querySelector('.like');
const likeCount = document.querySelector('.like-count');
const shareBtn = document.querySelector('.share');
const themeBtn = document.querySelector('.theme');
const toast = document.querySelector('.toast');

const form = document.querySelector('.review-form');
const nameInput = document.querySelector('#name');
const textInput = document.querySelector('#text');
const chars = document.querySelector('.chars');
const list = document.querySelector('.review-list');
const reviewsCount = document.querySelector('.reviews-count');
const player = document.querySelector('.player');

function togglePlay() {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

function selectTrack(row) {
  rows.forEach((r) => r.classList.remove('active'));
  row.classList.add('active');

  const title = row.querySelector('.title').textContent;
  audio.src = row.dataset.src;
  nowTitle.textContent = title;
  nowArtist.textContent = row.querySelector('.artist').textContent;
  nowCover.src = row.querySelector('img').src;
  document.title = `${title} — Kevin MacLeod`;
  audio.play();
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

playBtn.addEventListener('click', togglePlay);
audio.addEventListener('play', () => playBtn.classList.add('playing'));
audio.addEventListener('pause', () => playBtn.classList.remove('playing'));

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = String(Math.floor(seconds % 60)).padStart(2, '0');
  return `${m}:${s}`;
}

rows.forEach((row) => {
  row.addEventListener('click', () => selectTrack(row));

  const meta = new Audio();
  meta.preload = 'metadata';
  meta.addEventListener('loadedmetadata', () => {
    row.querySelector('.time').textContent = formatTime(meta.duration);
  });
  meta.src = row.dataset.src;
});

document.addEventListener('keydown', (event) => {
  const typing = event.target.matches('input, textarea');
  if (event.code === 'Space' && !typing) {
    event.preventDefault();
    togglePlay();
  }
});

likeBtn.addEventListener('click', () => {
  const liked = likeBtn.classList.toggle('liked');
  const count = Number(likeCount.textContent);
  likeCount.textContent = liked ? count + 1 : count - 1;
  likeBtn.setAttribute('aria-pressed', liked);
});

shareBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    showToast('Посилання скопійовано');
  } catch {
    alert(`Посилання на альбом: ${window.location.href}`);
  }
});

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('light');
});

window.addEventListener('scroll', () => {
  player.classList.toggle('raised', window.scrollY > 50);
});

function setError(input, message) {
  const error = input.parentElement.querySelector('.error');
  error.textContent = message;
  input.classList.toggle('invalid', message !== '');
}

function validate() {
  const name = nameInput.value.trim();
  const text = textInput.value.trim();
  let ok = true;

  if (name.length < 2) {
    setError(nameInput, "Ім'я має містити мінімум 2 символи");
    ok = false;
  } else {
    setError(nameInput, '');
  }

  if (text.length < 10) {
    setError(textInput, 'Відгук має містити мінімум 10 символів');
    ok = false;
  } else {
    setError(textInput, '');
  }

  return ok;
}

textInput.addEventListener('input', () => {
  chars.textContent = textInput.value.length;
});

[nameInput, textInput].forEach((input) => {
  input.addEventListener('input', () => setError(input, ''));
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!validate()) return;

  const item = document.createElement('li');
  item.classList.add('review');

  const author = document.createElement('p');
  author.classList.add('review-author');
  author.textContent = nameInput.value.trim();

  const body = document.createElement('p');
  body.textContent = textInput.value.trim();

  item.append(author, body);
  list.prepend(item);

  reviewsCount.textContent = list.children.length;
  form.reset();
  chars.textContent = 0;
  showToast('Дякуємо за відгук!');
});
