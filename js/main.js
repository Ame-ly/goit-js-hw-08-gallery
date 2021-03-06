import images from './gallery-items.js';
import createGalleryMarkup from './create-gallery.js';
import {
  galleryRef,
  lightboxRef,
  overlayRef,
  imageRef,
  btnModalCloseRef,
} from './dom.js';

const galleryMarkup = createGalleryMarkup(images);
galleryRef.insertAdjacentHTML('beforeend', galleryMarkup);
galleryRef.addEventListener('click', openModal);

function openModal(event) {
  event.preventDefault();
  let image = event.target;
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  overlayRef.addEventListener('click', closeModal);
  btnModalCloseRef.addEventListener('click', closeModal);
  window.addEventListener('keydown', escapeClose);
  lightboxRef.classList.add('is-open');

  madeImageRef(image);
}

function closeModal() {
  overlayRef.removeEventListener('click', closeModal);
  btnModalCloseRef.removeEventListener('click', closeModal);
  window.removeEventListener('keydown', escapeClose);
  lightboxRef.classList.remove('is-open');

  clearImageRef();
}

function escapeClose(event) {
  if (event.code === 'Escape') {
    closeModal();
  }
}

function madeImageRef(image) {
  imageRef.src = image.dataset.source;
  imageRef.alt = image.alt;
}

function clearImageRef() {
  imageRef.src = ' ';
  imageRef.alt = ' ';
}
