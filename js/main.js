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

  updateAttr(image.dataset.source, image.alt);
}

function closeModal() {
  overlayRef.removeEventListener('click', closeModal);
  btnModalCloseRef.removeEventListener('click', closeModal);
  window.removeEventListener('keydown', escapeClose);
  lightboxRef.classList.remove('is-open');
  
  updateAttr();
}

function escapeClose(event) {
  if (event.code === 'Escape') {
    closeModal();
  }
}

function updateAttr(src = '', alt = '') {
  imageRef.src = src;
  imageRef.alt = alt;
}
