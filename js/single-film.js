const searchParams = new URLSearchParams(location.search);
const likes = document.getElementById('sf-likes');
const stars = document.querySelectorAll('.rating-star');

const filmId = searchParams.get('id');

const fetchKinopoiskFilmData = async () => {
    const answer = await filmDetailsRequest(filmId);
    const {data: filmData} = await answer.json();

    const header = document.getElementById('sf-header');
    const description = document.querySelector('#sf-description');
    const posterImage = document.querySelector('#sf-poster');
    const premiere = document.getElementById('sf-premiere');

    header.textContent = filmData.nameRu;
    description.textContent = filmData.description;
    posterImage.src = filmData.posterUrl;
    premiere.textContent = filmData.premiereRu;
}

const fetchFilmMeta = async () => {
    const answer = await fetch(`http://inno-ijl.ru/multystub/stc-21-03/film/${filmId}`);
    const {body} = await answer.json();

    const views = document.getElementById('sf-views');
    const likes = document.getElementById('sf-likes');
    const ratingNumber = document.getElementById('sf-rating-number');
    const stars = document.querySelectorAll('.rating-star')

    views.textContent = `${body.views} Views`;
    likes.textContent = `${body.likes} Likes`;
    const rating = body.ratings.reduce((a, b) => parseInt(a) + parseInt(b), 0) / body.ratings.length;
    const intRating = Math.round(rating);
    if (isNaN(intRating)) {
        ratingNumber.textContent = '0.0'
    } else {
        ratingNumber.textContent = Math.floor(rating * 10) / 10;
    }



    for (let i = 0; i < stars.length; i++) {
        if (i >= intRating) break;

        const star = stars[i];
        star.classList.add('star-selected')
    }
}

const likeIcon = document.getElementById('like-icon');
const FILM_KEY = `film-${filmId}`;
const liked = localStorage.getItem(FILM_KEY);

if (liked !== null) {
    likeIcon.classList.add('like-icon--liked');
}
likeIcon.addEventListener('click', () => {
   
    if (!likeIcon.classList.contains('like-icon--liked')) {
        localStorage.setItem(FILM_KEY, true)
        const likeCount = parseInt(likes.textContent, 10) + 1;


        likes.innerText = `${likeCount} Likes`;
        likeIcon.classList.add('like-icon--liked');
        likes.classList.add('like-icon--liked');


        fetch(
            `http://inno-ijl.ru/multystub/stc-21-03/film/${filmId}/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        )
    }
});

// for (const star of stars) {
//     star.addEventListener('click', () => {

//         fetch(`http://inno-ijl.ru/multystub/stc-21-03/film/${filmId}/rating`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 rating: +star.dataset.value
//             })
//         });

//         fetchFilmMeta();

//     });
// };


$('.stars-wrapper').on('click', '.rating-star', async function () {
   console.log('stars');
    await fetch(`http://inno-ijl.ru/multystub/stc-21-03/film/${filmId}/rating`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            rating: +this.dataset.value
        })
    });
    fetchFilmMeta();
})

fetchKinopoiskFilmData();
fetchFilmMeta();