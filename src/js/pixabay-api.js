const api = 'https://pixabay.com/api/';
const apiKey = '44781462-ae4aaccc0a5ec19c0259ffb3b';
const imageType = 'photo';
const orientation = 'horizontal';
const safeSearch = true;

export function fetchImage(q) {
  const url = `${api}?key=${apiKey}&q=${encodeURIComponent(
    q
  )}&image_type=${imageType}&orientation=${orientation}&safesearch=${safeSearch}`;

  return fetch(url)
    .then(res => {
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    })
    .then(data => {
      if (data.hits.length === 0) {
        throw new Error('No images found');
      }
      return data.hits;
    });
}
