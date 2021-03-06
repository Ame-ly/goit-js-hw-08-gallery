import images from './gallery-items.js';

const galleryRef = document.querySelector('.js-gallery');
const lightboxRef = document.querySelector('.js-lightbox');
const overlayRef = document.querySelector('.lightbox__overlay');
const imageRef = document.querySelector('.lightbox__image');
const btnModalCloseRef = document.querySelector(
  'button[data-action="close-lightbox"]',
);

const galleryMarkup = createGalleryMarkup(images);
galleryRef.insertAdjacentHTML('beforeend', galleryMarkup);
galleryRef.addEventListener('click', openModal);

function createGalleryMarkup(images) {
  return images
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
    })
    .join('');
}

console.log(images);

function openModal(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }
  overlayRef.addEventListener('click', closeModal);
  btnModalCloseRef.addEventListener('click', closeModal);
  window.addEventListener('keydown', escapeClose);
  lightboxRef.classList.add('is-open');
  imageRef.src = event.target.dataset.source;
  imageRef.alt = event.target.alt;
}

function closeModal() {
  overlayRef.removeEventListener('click', closeModal);
  btnModalCloseRef.removeEventListener('click', closeModal);
  window.removeEventListener('keydown', escapeClose);
  lightboxRef.classList.remove('is-open');
  imageRef.src = '';
  imageRef.alt = '';
}

function escapeClose(event) {
  if (event.code === 'Escape') {
    closeModal();
  }
}
