const blockFilmsWrapper = document.getElementById('block05-films-wrapper');



function renderFilmBlock(posterUrl, filmName, id) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('block05__movie1');

    const link = document.createElement('a');
    link.href = `/single/?id=${id}`

    const imagesWrapper = document.createElement('div');
    imagesWrapper.classList.add('block05__bg');
    const images = document.createElement('img');
    images.src = posterUrl;
    images.alt = 'Изображение постера';

    imagesWrapper.append(images);

    const shadow = document.createElement('div');
    shadow.classList.add('block05__shadow');

    const descWrapper = document.createElement('div');
    descWrapper.classList.add('block05__descr');


    const title = document.createElement('div');
    title.classList.add('block05__text2');
    title.textContent = filmName;

    const desc = document.createElement('div')
    desc.classList.add('block05__text3');
    desc.textContent = '...Loading';

    descWrapper.append(title, desc);
    link.append(imagesWrapper, shadow, descWrapper);
    wrapper.append(link);


    return [wrapper, desc];


}

const fetchBlockFilms = async () => {
    const result = await topFilmsRequest();
    const {
        films
    } = await result.json();

    const request = [];
    const filmBlockMap = new Map();

    films.forEach((film) => {
        const [filmBlock, desc] = renderFilmBlock(film.posterUrlPreview, film.nameRu, film.filmId);
        filmBlockMap.set(film.filmId, filmBlock);

        request.push(new Promise(async (resolve, reject) => {
            const detailResult = await filmDetailsRequest(film.filmId);
            const detailsData = await detailResult.json();


            const description = detailsData.data.description;

            if (!description) {
                filmBlockMap.delete(film.filmId)
            } else {
                desc.textContent = description;
            }
            resolve();
        }));

    })

    await Promise.all(request);

    const element = [...filmBlockMap.values()].slice(0, 9);
    blockFilmsWrapper.innerHTML = '';
    blockFilmsWrapper.append(...element);

}

fetchBlockFilms();


// blockFilmsWrapper.innerHTML = '';
// const apiHeaders = {
//   'accept': 'application/json',
//   'X-API-KEY': '18977bf3-8146-4afe-9205-6dabd925546d'
// };
// fetch('https://kinopoiskapiunofficial.tech/api/v2.1/films/top?type=TOP_AWAIT_FILMS&page=1', {
//   headers: { ...apiHeaders
//   },
//   cors: 'no-cors'
// }).then(data => data.json()).then(data => {
//   data.films.forEach((film, index) => {
//     const id = `block05-films-desc-${film.filmId}`;
//     blockFilmsWrapper.innerHTML += `
//                 <div class="block05__movie1"> 
//                     <div class = "block05__bg" >
//                     <div class="block05__shadow"></div>
//                        <img src = ${film.posterUrlPreview} alt = ""/></div>
//                            <div class = "block05__descr">
//                               <div class = "block05__text2">${film.nameRu} </div> 
//                                  <div id=${id} class = "block05__text3"> ...Loading
//                    </div> 
//                   </div>

//                 </div>`;
//     fetch(`https://kinopoiskapiunofficial.tech/api/v2.1/films/${film.filmId}`, {
//       headers: { ...apiHeaders
//       },
//       cors: 'no-cors'
//     }).then(data => data.json()).then(({
//       data: {
//         description
//       }
//     }) => {
//       const desc = document.getElementById(id);
//       desc.innerText = description;

//       if (!description) {
//         const root = desc.parentNode.parentNode;
//         blockFilmsWrapper.removeChild(root);
//       }
//     });
//   });
// });