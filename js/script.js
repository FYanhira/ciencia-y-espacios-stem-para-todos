// Script muy simple para el lightbox de la galería.
// No se usa ninguna librería externa ni backend.

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeButton = document.querySelector('.lightbox-close');
const galleryButtons = document.querySelectorAll('.lightbox-trigger');

if (lightbox && lightboxImage && lightboxCaption && closeButton) {
  galleryButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const caption = button.dataset.caption || 'Imagen';
      lightboxImage.src = `images/galeria/${caption}`;
      lightboxImage.alt = caption;
      lightboxCaption.textContent = caption;
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
    });
  });

  closeButton.addEventListener('click', () => {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImage.src = '';
    lightboxImage.alt = '';
    lightboxCaption.textContent = '';
  });

  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      closeButton.click();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && lightbox.classList.contains('open')) {
      closeButton.click();
    }
  });
}
