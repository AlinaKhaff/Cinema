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
`;
const filmsData = [{
  title: ' XXX ',
  adult: true,
  genre: []
}, {
  title: ' Человек паук',
  adult: false,
  genre: [{
    name: 'Фантастика'
  }, {
    name: 'боевик'
  }, {
    name: 'приключения'
  }]
}, {
  title: 'Собачья жизнь 2 ',
  genre: [{
    name: 'Фэнтэзи'
  }, {
    name: 'драма'
  }, {
    name: 'комедия'
  }]
}, {
  title: ' История игрушек 4',
  genre: [{
    name: 'Мультфильм'
  }, {
    name: 'фэнтэзи'
  }, {
    name: 'комедия'
  }]
}, {
  title: ' Люди в чёрном: Интэрнэшнл',
  genre: [{
    name: 'фантастика'
  }, {
    name: 'боевик'
  }, {
    name: 'комедия'
  }]
}];
const div = document.getElementById('block03__table');
div.innerHTML = tableHeader;

for (let index = 0; index < filmsData.length; index++) {
  const clazz = index % 2 === 0 ? 'block03__line2' : 'block03__line1';
  const film = new Film(filmsData[index], clazz);

  if (film.isNotForAdult()) {
    div.innerHTML += film.renderFilmTableItem();
  }
}
//# sourceMappingURL=film-table.js.map