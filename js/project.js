const category = new URL(location.href).searchParams.get('category');
if (['robotics', 'game', 'research', 'software'].includes(category)) {
  document.querySelectorAll('[data-back-to-projects]').forEach(link => {
    const url = new URL(link.href);
    url.searchParams.set('category', category);
    link.href = url.href;
  });
}

const videos = [...document.querySelectorAll('video')];
const choices = [...document.querySelectorAll('.video-choice')];
const panels = [...document.querySelectorAll('.video-panel')];

function selectVideo(id) {
  panels.forEach(panel => {
    panel.hidden = panel.id !== id;
    if (panel.hidden) panel.querySelector('video').pause();
  });
  choices.forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.video === id));
  });
}

choices.forEach(button => {
  button.addEventListener('click', () => selectVideo(button.dataset.video));
});
if (choices.length) selectVideo(choices[0].dataset.video);

videos.forEach(video => {
  video.addEventListener('play', () => {
    videos.forEach(other => { if (other !== video) other.pause(); });
  });
});
window.addEventListener('pagehide', () => videos.forEach(video => video.pause()));

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImg');
let imageTrigger;

document.querySelectorAll('.image-trigger').forEach(button => {
  button.addEventListener('click', () => {
    imageTrigger = button;
    const source = button.querySelector('img');
    lightboxImage.src = source.src;
    lightboxImage.alt = source.alt;
    lightbox.showModal();
    document.body.style.overflow = 'hidden';
  });
});
lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', event => {
  if (event.target === lightbox) lightbox.close();
});
lightbox.addEventListener('close', () => {
  document.body.style.overflow = '';
  imageTrigger?.focus({ preventScroll: true });
});
