const blockFilmsWrapper = document.getElementById('block05-films-wrapper');
blockFilmsWrapper.innerHTML = ''

const apiHeaders = {
    'accept': 'application/json',
    'X-API-KEY': '18977bf3-8146-4afe-9205-6dabd925546d',
};

fetch('https://kinopoiskapiunofficial.tech/api/v2.1/films/top?type=TOP_AWAIT_FILMS&page=1', {
        headers: {
            ...apiHeaders
        },
        cors: 'no-cors'
    })
    .then(data => data.json()
    )
    .then(data => {
        data.films.forEach((film, index) => {
            const id = `block05-films-desc-${film.filmId}`;
            blockFilmsWrapper.innerHTML += `
                <div class="block05__movie1"> 
                    <div class = "block05__bg" >
                    <div class="block05__shadow"></div>
                       <img src = ${film.posterUrlPreview} alt = ""/></div>
                           <div class = "block05__descr">
                              <div class = "block05__text2">${film.nameRu} </div> 
                                 <div id=${id} class = "block05__text3"> ...Loading
                   </div> 
                  </div>
                
                </div>`


            fetch(`https://kinopoiskapiunofficial.tech/api/v2.1/films/${film.filmId}`, {
                    headers: {
                        ...apiHeaders
                    },
                    cors: 'no-cors'
                })

                .then(data => data.json())
                .then(({
                    data: {
                        description
                    }
                }) => {
                    const desc = document.getElementById(id);
                    desc.innerText = description;

                    if (!description) {
                        const root = desc.parentNode.parentNode;

                        blockFilmsWrapper.removeChild(root);

                    }

                })
        })
    });