// Your API key: 44781462-ae4aaccc0a5ec19c0259ffb3b

// q =  — слово для пошуку. Те, що буде вводити користувач.
//— тип зображення. Потрібні тільки фотографії, тому постав значення photo.//
//орієнтація фотографії. Постав значення horizontal.
//safesearch — фільтр за віком. Постав значення true.
//
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
//
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
//
//
const loader = document.querySelector('#loader');
const form = document.querySelector('#search-form');
const api = 'https://pixabay.com/api/';
const apiKey = '44781462-ae4aaccc0a5ec19c0259ffb3b';
const imageType = 'photo';
const orientation = ' horizontal';
const safeSearch = true;
const gallery = document.querySelector('.gallery');

let lightbox = new SimpleLightbox('.gallery a', {
  cationsData: 'alt',
  captionDelay: 250,
});

function fetchImage(q) {
  const url = `${api}?key=${apiKey}&q=${encodeURIComponent(
    q
  )}&image_type=${imageType}&orientation=${orientation}&safesearch=${safeSearch}`;
  loader.style.display = 'block';

  return fetch(url)
    .then(res => {
      loader.style.display = 'none';
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    })
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
          title: 'Error',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
        return [];
      }
      return data.hits;
    })
    .catch(error => {
      loader.style.display = 'none';
      console.error('Fetching error: ', error);
      iziToast.error({
        title: 'Error',
        message: 'Failed to fetch images. Please try again later.',
      });
      return [];
    });
}

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

  fetchImage(searchQuery).then(images => {
    if (images.length > 0) {
      gallery.innerHTML = '';
      gallery.innerHTML = createModalWindow(images);

      lightbox = new SimpleLightbox('.gallery a ', {
        captionsData: 'alt',
        captionDelay: 250,
      });

      lightbox.refresh();
    } else {
      iziToast.info({
        title: 'Info',
        message: 'No images found for your search query.',
      });
    }
  });
});
function createModalWindow(images) {
  return images
    .map(
      image => `<a href="${image.largeImageURL}" data-lightbox="gallery" data-title="${image.tags}">
        <img src="${image.webformatURL}" alt="${image.tags}" />
      </a>`
    )
    .join('');
}
