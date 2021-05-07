const tableHeader = `
                    <div class="block03__link"></div>
                    <a href="#" class="block03__link">
                        Начало сеанса
                        <svg class="block03__link-svg" width="9" height="5" viewBox="0 0 9 5" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.49182 0.5L8.49182 5H0.491821L4.49182 0.5Z" fill="white" />
                        </svg>
                    </a>
                    <a href="#" class="block03__link">
                        Название фильма
                        <svg class="block03__link-svg" width="8" height="5" viewBox="0 0 8 5" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 4.5L8 0H0L4 4.5Z" fill="white" />
                        </svg>
                    </a>
                    <a href="#" class="block03__link">
                        <p>Жанр</p>
                    </a>
`
const films =[
    {
        start: '10:00',
        title: ' Человек паук',
        genre: [
            {
                name: 'Фантастика',
            },
            {
                name:'боевик',
            },
            {
                name:'приключения',
            },
        ]
    },{ 
        start: '12:00',
        title: 'Собачья жизнь 2 ',
        genre: [
            {
            name: 'Фэнтэзи',
            },
            {
            name:'драма',
            },
            {
            name:'комедия',
            },
        ]
    },{
        start: '14:00',
        title: ' История игрушек 4',
        genre: [
            {
            name: 'Мультфильм',
            },
            {
            name:'фэнтэзи',
            },
            {
            name:'комедия',
            },
        ]
    },{
        start: '16:00',
        title: ' Люди в чёрном: Интэрнэшнл',
        genre: [
            {
            name: 'фантастика',
            },
            {
            name:'боевик',
            },
            {
            name:'комедия',
            },
        ]
    }
];
const div = document.getElementById('block03__table');
div.innerHTML = tableHeader;
for (let index = 0; index < films.length; index++) {
    const clazz = (index % 2 === 0) ? 'block03__line2' : 'block03__line1';
    const element = films[index];
    div.innerHTML += `
        <p class="block03__line-svg ${clazz} ">
                                <svg width="11" height="9" viewBox="0 0 11 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M4.60581 6.79378L1.46056 3.93033L0.787354 4.66979L4.70255 8.23421L10.8223 0.94099L10.0562 0.298203L4.60581 6.79378Z"
                                        fill="white" />
                                </svg>
                            </p>

        <span class="${clazz}">${element.start}</span>
        <a href="https://www.kinopoisk.ru/film/838/" class="${clazz}" target="_blank">
                            ${element.title}
        </a>
        <span class="${clazz}">${element.genre.map(item => item.name).join(', ')}</span>
    `    
}
