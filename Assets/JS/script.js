let formEl = $("#movie-form");
let movieTitleEl = $('input[id="movie-title"]');
let yearEl = $('input[id="year-input"]');
let movieTitle, yearInp, posterElement;
let requestURL;
let apiKey = 'AIzaSyDsqAm-TP-sJdITlkImb4cirbX7zwJUfBI';
let defaultVideoId = 'utntGgcsZWI';

function searchBoth (movieTitle, yearInp) {
  let omdbURL;
  if (yearInp) {
    omdbURL = `http://www.omdbapi.com/?t=${movieTitle}&y=${yearInp}&apikey=f0131303&`

  } else {
    omdbURL = `http://www.omdbapi.com/?t=${movieTitle}&apikey=f0131303&`;
  }

  fetch(omdbURL)
    .then (function (response) {
      return response.json();
    })

    .then (function (data) {
      console.log("OMDB Data", data);
    

      if (data) {
        // searchVideo (movieTitle, yearInp);
        let videoId = data.videoId;

        let iframeHtml = `<iframe width="560" height="300" src="https://www.youtube.com/embed/${videoId}";frameborder="0" allowfullscreen></iframe>`;
  
        $('#video-container').html(iframeHtml);

      }

    })

    .catch (function (error) {
      console.error ("Error fetching data from OMDB", error);
    });
  }
    
function getMovieInfo () {

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
  getMovieInfo();
}

// Load video title and description
function loadVideo (videoId) {
$.ajax({
    url: "https://www.googleapis.com/youtube/v3/videos",
    dataType: 'json',
    data: {
    key: 'AIzaSyDsqAm-TP-sJdITlkImb4cirbX7zwJUfBI',
    part: 'snippet',
    id: videoId
  },

    success: function (data) {
      
      let videoTitle = data.items[0].snippet.title; {
        const snippet = document.getElementById('video-title');
        snippet.innerHTML = videoTitle;
      }
      
      let videoDescription = data.items[0].snippet.description; {
        const description = document.getElementById('video-description');
        description.innerHTML = videoDescription;
      }
  
  
      let iframeHtml = `<iframe width="560" height="300" src="https://www.youtube.com/embed/${videoId}";frameborder="0" allowfullscreen></iframe>`;
  
      $('#video-container').html(iframeHtml);
  
    }
    
  });
  
  }

// Pass search button info from OMDB API to YouTube
$('.btn.btn-block.btn-primary').on('click', function () {
  const movieTitle = movieTitleEl.val().trim().replaceAll(" ", "+");
  const yearInp = yearEl.val().trim();

  if (movieTitle) {
    searchBoth (movieTitle, yearInp);
    const youtubeRequest = {
      key: 'AIzaSyDsqAm-TP-sJdITlkImb4cirbX7zwJUfBI',
      q: movieTitle + yearInp +  'trailer',
      part: 'snippet',
      maxResults: 1,
      type: 'video'
    };

    $.ajax({
      url: "https://www.googleapis.com/youtube/v3/search",
      dataType: 'json',
      data: youtubeRequest,
      success: function (data) {
        if (data.items && data.items.length > 0) {
          const videoItem = data.items[0];
          const videoId = videoItem.id.videoId;
          loadVideo(videoId);

        } else {
          let modal = document.getElementById('modal');
          let btn = document.getElementsByClassName('.btn-block.btn-primary');
        }
      },
      error: function (error) {
        console.error("Error fetching data", error);
      }
    });
  } else {
    let modal = document.getElementById('modal');
    let btn = document.getElementsByClassName('.btn-block.btn-primary');
  }
});

// Load JS after HTML

$(document).ready(function() {
  loadVideo(defaultVideoId);

});

// Submit event on the form
formEl.on("submit", formSubmit)