var normalizedMovies = movies.map(function (movie) {
  return {
    title: movie.Title.toString(),
    year: movie.movie_year,
    categories: movie.Categories.split('|'),
    summary: movie.summary,
    imageUrl: `http://i3.ytimg.com/vi/${movie.ytid}/hqdefault.jpg`,
    bigImageUrl: `http://i3.ytimg.com/vi/${movie.ytid}/maxresdefault.jpg`,
    imdbId: movie.imdb_id,
    imdbRating: movie.imdb_rating,
    runtime: movie.runtime,
    language: movie.language,
    trailerLink: `https://youtube.com/watch?v=${movie.ytid}`
  };
});

var searchResults = [];

var elSearchForm = $_('.search-form');
var elSortForm = $_('.sort-form');
var elSearchInput = $_('.movie-input', elSearchForm);
var elSearchOption = $_('.movie-select', elSearchForm);
var elSortOption = $_('.movie-sort', elSearchForm);
var elSearchResults = $_('.movies-list');
var elSearchResultTemplate = $_('#movies-item').content;

var createMovieElement = function (movie) {
  var movieElement = elSearchResultTemplate.cloneNode(true);

  $_('.movie-title', movieElement).textContent = movie.title;
  $_('.movie-img', movieElement).src = movie.imageUrl;
  $_('.movie-rating', movieElement).textContent = movie.imdbRating;
  $_('.movie-genres', movieElement).textContent = movie.categories;
  $_('.movie-year', movieElement).textContent = movie.year;
  $_('.movie-trailer-link', movieElement).href = movie.trailerLink;

  return movieElement;
};

var renderMovies = function (movies) {
  elSearchResults.innerHTML = '';

  var elResultsFragment = document.createDocumentFragment();

  movies.forEach(function (movie) {
    elResultsFragment.appendChild(createMovieElement(movie));
  });

  elSearchResults.appendChild(elResultsFragment);
};

var searchForMovies = function (evt) {
  evt.preventDefault();

  var searchQuery = new RegExp(elSearchInput.value.trim(), 'gi');

  normalizedMovies.forEach(function (movie) {
    if (movie.categories.includes(elSearchOption.value) && movie.title.match(searchQuery)) {
      searchResults.push(movie);
    }
  });



  renderMovies(searchResults);
};


elSearchForm.addEventListener('submit', searchForMovies);

elSortOption.addEventListener('input', function () {
  var elSort = elSortOption.value.trim();

  if (elSort === "alphabetical") {
    searchResults.sort(function (a, b) {
      return a.rating - b.rating;
    });
    renderMovies(searchResults);
  }



});

elSortOption.addEventListener('change', function () {
  var elSort = elSortOption.value.trim();
  console.log(searchResults);
  if (elSort === 'alphabetical') {
    searchResults.sort(function (a, b) {
      var a = a.title.toLowerCase(), b = b.title.toLowerCase();
      if (a < b)
        return -1;
      if (a > b)
        return 1;
      return 0;
    });
  }
  else if (elSort === 'reverse') {
    searchResults.sort(function (a, b) {
      var a = a.title.toLowerCase(), b = b.title.toLowerCase();
      if (a < b)
        return 1;
      if (a > b)
        return -1;
      return 0;
    });
  }
  else if (elSort === 'rating') {
    searchResults.sort(function (a, b) {
      return b.imdbRating - a.imdbRating;
    });
  } else if (elSort === 'date') {
    searchResults.sort(function (a, b) {
      return b.year - a.year;
    });
  }
  renderMovies(searchResults);
});