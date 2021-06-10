/*$(".owl-carousel").owlCarousel({
    loop: true,
    nav: true,
    dots: false,
    responsive:{
        0:{
            items:1
        }
      
    }
});
*/
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

const getSimilarFilms = id => {
  return kinopoiskapiunofficialRequest(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}/similars`);
};

const renderBlockForCarousel = (films, containerId) => {
  let html = "";
  films.forEach(item => {
    html += `<div class="block03__row1">
        <div class="block03_second-img">
            <img src="${item.posterUrl}" alt="" />
        </div>
        <p class="block03_second-text1">${item.nameRu}</p>
    </div>`;
  });
  $(containerId).html(html);
};

const fetchBlockFilms1 = async () => {
  console.log('films for carousel');
  const id = new URLSearchParams(window.location.search).get('id');
  const result1 = await getSimilarFilms(id);
  const j = await result1.json();

  if (j.items.length > 0) {
    renderBlockForCarousel(j.items.slice(0, 6), '#block03__movie-carousel');
    renderBlockForCarousel(j.items.slice(6, Math.min(12, j.items.length)), '#block03__movie-carousel2');
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
    $("#car2").owlCarousel({
      loop: true,
      nav: true,
      dots: false,
      responsive: {
        0: {
          items: 1
        }
      }
    });
  } else {
    $('.block03_second').html('');
  }
};

fetchBlockFilms1();
//# sourceMappingURL=movie-carousel.js.map