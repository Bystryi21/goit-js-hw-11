import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImage } from './js/pixabay-api';
import { createModalWindow } from './js/render-functions';

const loader = document.querySelector('#loader');
const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

form.addEventListener('submit', function (evt) {
  evt.preventDefault();

  const searchQuery = evt.target.search.value.trim();
  if (!searchQuery) {
    iziToast.error({
      title: 'Error',
      message: 'Search field cannot be empty!',
    });
    return;
  }

  loader.style.display = 'block';

  fetchImage(searchQuery)
    .then(images => {
      loader.style.display = 'none';
      gallery.innerHTML = createModalWindow(images);
      lightbox.refresh();
    })
    .catch(error => {
      loader.style.display = 'none';
      if (error.message === 'No images found') {
        iziToast.error({
          title: 'Error',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
      } else {
        iziToast.error({
          title: 'Error',
          message: 'Failed to fetch images. Please try again later.',
        });
      }
    });
});
