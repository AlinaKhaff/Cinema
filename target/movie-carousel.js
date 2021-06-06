$(".owl-carousel").owlCarousel({
  loop: true,
  nav: true,
  dots: false,
  responsive: {
    0: {
      items: 1
    }
  }
});
const blockMoviesWrapper = document.getElementById('block03__movie-carousel');
blockMoviesWrapper.innerHtml = '';

const kinopoiskapiunofficial1Request = url => {
  return fetch(url, {
    headers: {
      'accept': 'application/json',
      'X-API-KEY': '18977bf3-8146-4afe-9205-6dabd925546d'
    },
    cors: 'no-cors'
  });
};

const topFilms1Request = () => {
  return kinopoiskapiunofficialRequest('https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_AWAIT_FILMS&page=1');
};

const film1DetailsRequest = id => {
  return kinopoiskapiunofficial1Request(`https://kinopoiskapiunofficial.tech/api/v2.1/films/${id}`);
};

function renderFilmBlock(posterUrl, filmName, id) {
  const wrapper1 = document.createElement('div');
  wrapper1.classList.add('block03__row1');
  const imagesWrapper1 = document.createElement('div');
  imagesWrapper1.classList.add('block03_second-img');
  const images1 = document.createElement('img');
  images1.src = posterUrl;
  images1.alt = 'Изображение постера';
  imagesWrapper1.append(images);
  const title1 = document.createElement('div');
  title1.classList.add('block03_second-text1');
  title1.textContent = filmName;
  const desc1 = document.createElement('div');
  desc1.classList.add('block03_second-text2');
  descWrapper.append(title1, desc1);
  link.append(imagesWrapper1);
  wrapper1.append(link);
  return [wrapper1, desc1];
}

const fetchBlockFilms1 = async () => {
  const result1 = await topFilms1Request();
  const {
    films1
  } = await result1.json();
  const request1 = [];
  const filmBlockMap1 = new Map();
  films1.forEach(film => {
    const [filmBlock1, desc1] = renderFilmBlock(film.posterUrlPreview, film.nameRu, film.filmId);
    filmBlockMap1.set(film.filmId, filmBlock);
    request1.push(new Promise(async (resolve, reject) => {
      const detailResult1 = await filmDetailsRequest(film.filmId);
      const detailsData1 = await detailResult1.json();
      const description1 = detailsData1.data.description1;

      if (!description1) {
        filmBlockMap1.delete(film.filmId);
      } else {
        desc1.textContent = description1;
      }

      resolve();
    }));
  });
  await Promise.all(request1);
  const element1 = [...filmBlockMap1.values()].slice(0, 6);
  blockMoviesWrapper.innerHTML = '';
  blockMoviesWrapper.append(...element1);
};

fetchBlockFilms();
//# sourceMappingURL=movie-carousel.js.map