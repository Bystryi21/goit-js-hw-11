export function createModalWindow(images) {
  return images
    .map(
      image => `<a href="${image.largeImageURL}" data-lightbox="gallery" data-title="${image.tags}">
        <img src="${image.webformatURL}" alt="${image.tags}" />
        <div class="info">
          <p><strong>Likes:</strong> ${image.likes}</p>
          <p><strong>Views:</strong> ${image.views}</p>
          <p><strong>Comments:</strong> ${image.comments}</p>
          <p><strong>Downloads:</strong> ${image.downloads}</p>
        </div>
      </a>`
    )
    .join('');
}
