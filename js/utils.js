function getRandomToMax(max) {
    return Math.ceil(Math.random()*(max+1))-1
}
function toHour(num) {
    return `${num}`.padStart(2, '0')
}
function toMinuts(num) {
    return String(num).padEnd(2, '0')

}
const kinopoiskapiunofficialRequest = (url) => {
    return fetch(url, {
        headers: {
            'accept': 'application/json',
            'X-API-KEY': '18977bf3-8146-4afe-9205-6dabd925546d'
        },

        cors: 'no-cors'
    });
}

const topFilmsRequest = () => {
    return kinopoiskapiunofficialRequest('https://kinopoiskapiunofficial.tech/api/v2.1/films/top?type=TOP_AWAIT_FILMS&page=1')
}
const filmDetailsRequest = (id) => {
    return kinopoiskapiunofficialRequest(`https://kinopoiskapiunofficial.tech/api/v2.1/films/${id}`)
}