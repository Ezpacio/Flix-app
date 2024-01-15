const global = {
    currentPage: window.location.pathname,
    api:{
        API_KEY : 'd087f4c33449d2dc1505b6a5b29961e1',
        API_URL : 'https://api.themoviedb.org/3/'
    }
}

// Display 20 most populer TV shows
const displayPopularTvshows = async () => {
    const { results } = await fetchApiData('/tv/popular');
    results.forEach(pop_shows => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
        <div class="card">
            <a href="tv-details.html?id=${pop_shows.id}">
            ${pop_shows.poster_path
                ? `<img src=
                "https://image.tmdb.org/t/p/w500${pop_shows.poster_path}" 
            class="card-img-top" alt="${pop_shows.name}" />`
                : `<img src="images/no-image.jpg" class="card-img-top" alt="${pop_shows.name}" />`
            }
            </a>
            <div class="card-body">
            <h5 class="card-title">${pop_shows.name}</h5>
            <p class="card-text">
                <small class="text-muted">Air Date: ${pop_shows.first_air_date}</small>
            </p>
            </div>
        </div>
        `;

        document.getElementById('popular-shows').appendChild(div)
    })
};

// Display tv shows details
const displayTvshowsDetails = async () =>{
    const showsId = window.location.search.split('=')[1];

    const shows = await fetchApiData(`tv/${showsId}`);
    
    displayBackgroundImage('shows', shows.backdrop_path);
    
    // Create a div
    const detailsTop = document.createElement('div');
    const detailsBottom = document.createElement('div');

    detailsTop.classList.add('details-top');
    detailsBottom.classList.add('details-bottom');

    detailsTop.innerHTML = `
    <div>
    ${shows.poster_path
        ? `<img src=
        "https://image.tmdb.org/t/p/w500${shows.poster_path}" 
    class="card-img-top" alt="${shows.name}" />`
        : `<img src="images/no-image.jpg" class="card-img-top" alt="${shows.name}" />`
    }
    </div>
    <div>
        <h2>${shows.name}</h2>
        <p>
            <i class="fas fa-star text-primary"></i>
            ${shows.vote_average.toFixed(1)} / 10
        </p>
        <p class="text-muted">Release Date: ${shows.first_air_date}</p>
        <p>
            ${shows.overview}
        </p>
        <h5>Genres</h5>
        <ul class="list-group">
        ${shows.genres.map((genre)=> `<li>${genre.name}</li>`).join('')}
        </ul>
        <a href="${shows.homepage}" target="_blank" class="btn">Visit Show Homepage</a>
    </div>
    `;

    detailsBottom.innerHTML = `
    <h2>Show Info</h2>
        <ul>
            <li><span class="text-secondary">Number Of Episodes:</span> ${shows.number_of_episodes}</li>
            <li>
                <span class="text-secondary">Last Episode To Air:</span> ${shows.last_episode_to_air.name}
            </li>
            <li><span class="text-secondary">Status:</span> ${shows.status}</li>
        </ul>
        <h4>Production Companies</h4>
    <div class="list-group">${shows.production_companies.map((company)=> `<span>${company.name}</span>`).join(', ')}</div>
    `

    document.getElementById('show-details').appendChild(detailsTop);
    document.getElementById('show-details').appendChild(detailsBottom);

    console.log(shows);
};


// Display 20 most populer movie shows
const displayPopularMovies = async () => {
    const { results } = await fetchApiData('movie/popular');
    // console.log(results);
    results.forEach(pop_movie => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
        <a href="movie-details.html?id=${pop_movie.id}">
        ${pop_movie.poster_path
                ? `<img src=
                "https://image.tmdb.org/t/p/w500${pop_movie.poster_path}" 
            class="card-img-top" alt="${pop_movie.title}" />`
                : `<img src="images/no-image.jpg" class="card-img-top" alt="${pop_movie.title}" />`
            }
            </a>
        <div class="card-body">
            <h5 class="card-title">
                ${pop_movie.title}
            </h5>
            <p class="card-text">
                <small class="text-muted">
                Release: ${pop_movie.release_date}
                </small>
            </p>
        </div>
        `;
        document.getElementById('popular-movies').appendChild(div)
    })
}

// Display movie details
const displayMovieDetails = async () =>{
    const movieId = window.location.search.split('=')[1];

    const movie = await fetchApiData(`movie/${movieId}`)
    // Overlay for background image
    displayBackgroundImage('movie', movie.backdrop_path);


    // Create divs 
    const detailsTop = document.createElement('div');
    const detailsBottom = document.createElement('div');

    detailsTop.classList.add('details-top');
    detailsBottom.classList.add('details-bottom');

    detailsTop.innerHTML = `
    <div>
    ${movie.poster_path
        ? `<img src=
        "https://image.tmdb.org/t/p/w500${movie.poster_path}" 
    class="card-img-top" alt="${movie.title}" />`
        : `<img src="images/no-image.jpg" class="card-img-top" alt="${movie.title}" />`
    }
    </div>
    <div>
        <h2>${movie.title}</h2>
        <p>
            <i class="fas fa-star text-primary"></i>
            ${movie.vote_average.toFixed(1)} / 10
        </p>
        <p class="text-muted">Release Date: ${movie.release_date}</p>
        <p>
            ${movie.overview}
        </p>
        <h5>Genres</h5>
        <ul class="list-group">
        ${movie.genres.map((genre)=> `<li>${genre.name}</li>`).join('')}
        </ul>
        <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
    </div>
    `;
    
    detailsBottom.innerHTML = `
    <h2>Movie Info</h2>
    <ul>
        <li><span class="text-secondary">Budget:</span> $${numberWithCommas(movie.budget)}</li>
        <li><span class="text-secondary">Revenue:</span> $${numberWithCommas(movie.revenue)}</li>
        <li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes</li>
        <li><span class="text-secondary">Status:</span> ${movie.status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">${movie.production_companies.map((company)=> `<span>${company.name}</span>`).join(', ')}</div>
    `;
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }

    document.getElementById('movie-details').appendChild(detailsTop);
    document.getElementById('movie-details').appendChild(detailsBottom);
};

// Display Slider Movies
const displaySlider = async () => {
    const {results} = await fetchApiData('movie/now_playing');

    results.forEach((movie) => {
        const div = document.createElement('div');
        div.classList.add('swiper-slide');
        div.innerHTML = `
        <a href="movie-details.html?id=${movie.id}">
              <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
        </a>
        <h4 class="swiper-rating">
            <i class="fas fa-star text-secondary"></i>
            ${movie.vote_average.toFixed(1)} / 10
        </h4>
        `;
        document.querySelector('.swiper-wrapper').appendChild(div);
        initSwiper();
    })
}

function initSwiper(){
    const swiper = new Swiper('.swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        freeMode: true,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },
        breakpoints: {
            500: {
                slidesPerView: 2
            },
            700: {
                slidesPerView: 3
            },
            1200: {
                slidesPerView: 4
            }
        }
    });
}


// Display backdrop pn details pages
function displayBackgroundImage(type, backgroundPath){
    const overlayDiv = document.createElement('div');
    overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
    overlayDiv.style.backgroundSize = 'cover';
    overlayDiv.style.backgroundPosition = 'center';
    overlayDiv.style.backgroundRepeat = 'no-repeat';
    overlayDiv.style.height = '100vh';
    overlayDiv.style.width = '100vw';
    overlayDiv.style.position = 'absolute';
    overlayDiv.style.top = '0';
    overlayDiv.style.left = '0';
    overlayDiv.style.zIndex = '-1';
    overlayDiv.style.opacity = '0.1';

    if (type === 'movie') {
        document.getElementById('movie-details').appendChild(overlayDiv);
    }else{
        document.getElementById('show-details').appendChild(overlayDiv);
    }
}

// Api ===>
const fetchApiData = async (endpoint) => {
    const API_KEY = global.api.API_KEY;
    const API_URL = global.api.API_URL;
    showSpinner()
    const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`)
    const data = await response.json();
    hideSpinner()
    return data;
}

function showSpinner(){
    document.querySelector('.spinner').classList.add('show');
}

function hideSpinner(){
    document.querySelector('.spinner').classList.remove('show');
}

function highlightCurrentLink() {
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        if (link.getAttribute('href') === global.currentPage) {
            link.classList.add('active')
        }
    })
}
// Api ===>


// Init App
function init() {
    switch (global.currentPage) {
        case '/':
        case '/index.html':
            displaySlider();
            displayPopularMovies();
            break;
        case '/shows.html':
            displayPopularTvshows();
            break;
        case '/movie-details.html':
            displayMovieDetails();
            break;
        case '/tv-details.html':
            displayTvshowsDetails();
            break;
        case '/search.html':
            console.log('Search');
            break;
    }
    highlightCurrentLink();
};

document.addEventListener('DOMContentLoaded', init)
