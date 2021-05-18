class Film {
  constructor(filmData, clazz) {
    console.log('constructor');
    this.data = filmData;
    this.start = `${toHour(getRandomToMax(14) + 9)}:${toMinuts(getRandomToMax(5))}`;
    this.id = filmData.id || filmData.title.replaceAll(' ', '-');
    this.clazz = clazz;
  }

  getId() {
    return this.id;
  }

  getStart() {
    return this.start;
  }

  getTitle() {
    return this.data.title;
  }

  getClazz() {
    return this.clazz;
  }

  isNotForAdult() {
    return !this.data.adult;
  }

  getGenre() {
    return this.data.genre.map(g => g.name).join(', ');
  }

  renderFilmTableItem() {
    return `
        <p class=" block03__line-svg ${this.getClazz()}" > 
        <input type="checkbox" class="block_03_checkbox" id="${this.getId()}">
            <label for="${this.getId()}">
                <svg width="11" height="9" viewBox="0 0 11 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M4.60581 6.79378L1.46056 3.93033L0.787354 4.66979L4.70255 8.23421L10.8223 0.94099L10.0562 0.298203L4.60581 6.79378Z"
                        fill="white" />
                </svg>
            </label>
        </p>
    
        <span class="${this.getClazz()}">${this.getStart()}</span>
        <a href="https://www.kinopoisk.ru/film/838/" class="${this.getClazz()}" target="_blank">
            ${this.getTitle()}
        </a>
         <span class="${this.getClazz()}">${this.getGenre()}</span>
    `;
  }

}