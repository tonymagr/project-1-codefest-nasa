let formEl = $("#movie-form");
let movieTitleEl = $('input[id="movie-title"]');
let yearEl = $('input[id="year-input"]');
let movieTitle, yearInp, posterElement;
let requestURL;

function getMovieInfo () {
  // var requestURL = 'http://www.omdbapi.com/?apikey=f0131303&';
  // var requestURL = 'http://www.omdbapi.com/?i=tt3896198&apikey=f0131303';
  // let requestURL = "http://www.omdbapi.com/?t=star+wars&y=1977&apikey=f0131303";
  // requestURL = "http://www.omdbapi.com/?t=star+wars&apikey=f0131303";
  console.log(requestURL);

  fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("Movie Data: Raw data \n----------");
      console.log(data);

      // Display any error from site if present
      if (data.Error === undefined) {
        $("#error-message-d").css("color","#1b89bc");
        $("#error-message-d").html("x");
        // console.log("No error");
      } else {
        $("#error-message-d").css("color","white");
        $("#error-message-d").html(data.Error);
        // console.log(data.Error)
      }
      
      //Populate result fields
      $("#title").text("Title: " + data.Title);
      $("#actors").text("Actors: " + data.Actors);
      $("#awards").text("Awards: " + data.Awards);
      $("#country").text("Country: " + data.Country);
      $("#director").text("Director: " + data.Director);
      $("#genre").text("Genre: " + data.Genre);
      $("#language").text("Language: " + data.Language);
      $("#plot-label").html("Plot:");
      $("#plot").text(data.Plot);
      $("#rated").text("Rated: " + data.Rated);
      $("#imdb-rating").text("IMDb Rating: " + data.imdbRating + " out of 10.0");
      $("#released").text("Released: " + data.Released);
      $("#runtime").text("Run-time: " + data.Runtime);
      // Place poster
      $("#poster-frame").empty();
      posterElement = `<img id="poster" alt="Film Poster" height="250px" width="160px" src="` + data.Poster + `"/>`
      $("#poster-frame").append(posterElement);
    })
    // Catch for internet connection down or similar
    // From https://stackoverflow.com/questions/50330795/fetch-api-error-handling
    .catch(error => {
      if (typeof error.json === "function") {
          error.json().then(jsonError => {
              console.log("Json error from API");
              console.log(jsonError);
          }).catch(error => {
              console.log("Generic error from API");
              console.log(error.statusText);
          });
      } else {
          console.log("Fetch error");
          console.log(error);
      }
    })
}

function formSubmit(event) {
  // Prevent the default behavior
  event.preventDefault();
  movieTitle = movieTitleEl.val().trim().replaceAll(" ", "+");
  yearInp = yearEl.val().trim();
  console.log(movieTitle);
  console.log(yearInp);

  // Clear input fields
  $('input[type="text"]').val("");
  
  // Construct URL for fetch, and Fetch IMDb data for selected movie

  if (yearInp === "" || yearInp === 0) {
    requestURL = "http://www.omdbapi.com/?t=" + movieTitle + "&apikey=f0131303";
  } else {
    requestURL = "http://www.omdbapi.com/?t=" + movieTitle + "&y=" + yearInp + "&apikey=f0131303";
  }

  // requestURL = "http://www.omdbapi.com/?t=star+wars&apikey=f0131303";
  // requestURL = "http://www.omdbapi.com/?t=star+wars&y=1977&apikey=f0131303";
  // requestURL = "http://www.omdbapi.com/?t=the+princess+bride&apikey=f0131303";
  getMovieInfo();
}

// Submit event on the form
formEl.on("submit", formSubmit);
