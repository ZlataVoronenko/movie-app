const API_KEY = "";
const API_URL_POPULAR = "";
const API_URL_SEARCH = "";
const API_URL_MOVIE_DETALS = "";

getMovies(API_URL_POPULAR);
 
async function getMovies(url) {
    const resp = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
        },
    });
    const respData = await resp.json();
    showMovies(respData);
}

function getClassByRate(vote) {
    if (vote > 7) {
        return "green";
    } else if (vote > 5) {
        return "orange";
    } else {
        return "red";
    }
}

function showMovies(data) {
    const moviesElem = document.querySelector(".movies");

    document.querySelector(".movies").innerHTML = "";

    data.films.forEach(movie => {
        const movieElem = document.createElement("div");
        movieElem.classList.add("movie");
        movieElem.innerHTML = `
        <div class="movie">
            <div class="movie__poster">
                <img class="movie__img darkened" src="${movie.posterUrlPreview}" alt="${movie.nameRu}" >
            </div>
            <div class="movie__info">
                <div class="movie__title">${movie.nameRu}</div>
                <div class="movie__category">${movie.genres.map(genre => ` ${genre.genre}`)}</div>
                <div class=" movie__areage movie__areage--${getClassByRate(movie.rating)}">${movie.rating}</div>
            </div>
        </div>
        `;
        movieElem.addEventListener("click", () => openModal(movie.filmId));
        moviesElem.appendChild(movieElem);
    });
}

const form = document.querySelector(".form");
const search = document.querySelector(".header__search");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;

      if (search.value) {
        getMovies(apiSearchUrl);
        search.value = "";
    }
})

const modalElem = document.querySelector(".modal");

async function openModal(id) {
        const resp = await fetch(API_URL_MOVIE_DETALS + id, {
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": API_KEY,
            },
        });
        const respData2 = await resp.json();

    // console.log(id);
    modalElem.classList.add("modal--show");
    document.body.classList.add("stop-scrolling");

    modalElem.innerHTML = `
    <div class="modal__card">
        <img class="modal__movie-backdrop" src="${respData2.posterUrl}" alt="${respData2.nameRu}">
        <h2>
            <span class="modal__movie-title">${respData2.nameRu}</span>
            <span class="modal__movie-release-year"> - ${respData2.year} год</span>
        </h2>
        <ul class="modal__movie-info">
            <div class="loader"></div>
            
            <li class="modal__movie-genre">Genre: ${respData2.genres.map((el) => `<span> ${el.genre}</span>`)}</li>
            ${respData2.filmLength ? `<li class="modal__movie-runtime">Runtime: ${respData2.filmLength} минут</li>` : ''}
            <li>Site: <a class="modal__movie-site" href="${respData2.webUrl}">${respData2.webUrl}</a></li>
            <li class="modal__movie-overview">Overview: ${respData2.description}</li>
        </ul>
        <button class="modal__button-close" type="button">Close</button>
    </div>
`
    const btnClose = document.querySelector(".modal__button-close");
    btnClose.addEventListener("click", (e) => {
        closeModal()})
}

function closeModal() {
    modalElem.classList.remove("modal--show");
    document.body.classList.remove("stop-scrolling");
}

window.addEventListener("click", (e) => {
    if (e.target === modalElem) {
        closeModal();
    }
})

window.addEventListener("keydown", (e) => {
    if (e.keyCode === 27) {
        closeModal();
    }
})
async function getMovies(url) {
    const resp = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
        },
    });
    const respData = await resp.json();
    showMovies(respData);
}
