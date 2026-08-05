const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.primary-nav');

navToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});

nav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

const languageButtons = document.querySelectorAll('[data-lang]');
const translatable = document.querySelectorAll('[data-en][data-es]');

function setLanguage(lang) {
  translatable.forEach(el => {
    el.textContent = el.dataset[lang];
  });
  document.documentElement.lang = lang;
  languageButtons.forEach(button => {
    button.classList.toggle('active', button.dataset.lang === lang);
  });
  localStorage.setItem('jg-language', lang);
}

languageButtons.forEach(button => {
  button.addEventListener('click', () => setLanguage(button.dataset.lang));
});

const savedLanguage = localStorage.getItem('jg-language');
const browserLanguage = (navigator.language || 'en').toLowerCase().startsWith('es') ? 'es' : 'en';
setLanguage(savedLanguage || browserLanguage);

document.getElementById('year').textContent = new Date().getFullYear();

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCaption = document.getElementById('lightbox-caption');

document.querySelectorAll('.gallery-button').forEach(button => {
  button.addEventListener('click', () => {
    const image = button.querySelector('img');
    const caption = button.querySelector('span');
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = caption.textContent;
    lightbox.showModal();
  });
});

document.querySelector('.lightbox-close')?.addEventListener('click', () => lightbox.close());
lightbox?.addEventListener('click', event => {
  if (event.target === lightbox) lightbox.close();
});
