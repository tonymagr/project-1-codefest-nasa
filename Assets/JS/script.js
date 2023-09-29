const titleFormEl = $("#movie-form");
const searchesFormEl = $("#searches-form");
const prevSearchEl = $("#previous-searches");
let savedMovieEl;
let movieTitleEl = $('input[id="movie-title"]');
let yearEl = $('input[id="year-input"]');
let searchNameEl = $('input[id="search-name"]');
let element, movieTitle, yearInp, posterElement, searchName, i, requestURL, savedMovie;
let defaultVideoId = 'rN7EAneK2ko';

//Local storage variables
let locStorArray = [];
let movieEntry = {schName:"", movTitle:"", yr:"", omdbUrl:""};

// Save select movie attributes for use in functions
let mTitle = "";
let mYear, mRequestURL;

function getMovieInfo () {
  // let requestURL = "http://www.omdbapi.com/?t=star+wars&y=1977&apikey=f0131303";
  fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Display any error from site if present
      if (data.Error === undefined) {
        // No error - display nothing
        $("#error-message-d").css("color","#1b89bc");
        $("#error-message-d").html("x");
      } else {
        // Error found
        $("#error-message-d").css("color","white");
        $("#error-message-d").html(data.Error);
      }
      
      //Populate result fields
      $("#title").text("Title: " + data.Title);
      mTitle = data.Title;
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
      mYear = data.Year;
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

function titleFormSubmit(event) {
  // Prevent the default behavior
  event.preventDefault();
  movieTitle = movieTitleEl.val().trim().replaceAll(" ", "+");
  yearInp = yearEl.val().trim();

  // Clear input fields
  $('input[type="text"]').val("");
  
  // Construct URL for fetch, and Fetch IMDb data for selected movie

  if (yearInp === "" || yearInp === 0) {
    requestURL = "http://www.omdbapi.com/?t=" + movieTitle + "&apikey=f0131303";
  } else {
    requestURL = "http://www.omdbapi.com/?t=" + movieTitle + "&y=" + yearInp + "&apikey=f0131303";
  }

  // Make OMDb API call
  getMovieInfo();
  // Call to render same video from search at the top
  console.log("Ready to render");
  renderVideo();
}

prevSearchEl.on("click", function(event) {
  element = event.target;

  if (element.matches("button") && element.className.substring(10,30).trim() === "view-button") {
    // View movie info
    // Button IDs are in format btnx0 or btnx1 where x is the li row. Element/buttonid[3] is the 4th character.
    i = element.id[3];
    requestURL = locStorArray[i].omdbUrl

    getMovieInfo();
  }

  if (element.matches("button") && element.className.substring(10,30).trim() === "delete-button") {
    // Delete saved search (li) row
    // Button IDs are in format btnx0 or btnx1 where x is the li row. Element/buttonid[3] is the 4th character.
    i = element.id[3];
    locStorArray.splice(i,1);
    // Call to remove item from local storage
    resetLocalStorage();

    // Redisplay form
    renderPrevSearches();
  }
});

function renderPrevSearches () {
  // Retrieve movie-searches array of "movie search" objects from storage
  locStorArray = JSON.parse(localStorage.getItem("movie-searches"));
  if (locStorArray === null) {
    locStorArray = []
  }
  // Clear previous searches (UL) display
  prevSearchEl.html("");
  prevSearchEl.html("Previous Searches");
  prevSearchEl.addClass("strong-ovrd");

  // If there were any stored movies, render them 
  $.each(locStorArray, function(i) {
    savedMovie = locStorArray[i].schName + " | " + locStorArray[i].movTitle + " | " + locStorArray[i].yr;

    prevSearchEl.append('<li id="li' + i + '">' + savedMovie + '</li>');
    savedMovieEl = $("#li"+i);
    savedMovieEl.css("font-weight","normal");
    savedMovieEl.data("data-index",i);

    // Create buttons on li
    savedMovieEl.append('<button id="btn' + i + '0">View Info</button>');
    $("#btn" + i + "0").addClass("btn-basic view-button");
    savedMovieEl.append('<button id="btn' + i + '1">Delete Item</button>');
    $("#btn" + i + "1").addClass("btn-basic delete-button");
  })
}

function searchNameFormSubmit(event) {
  // Prevent the default behavior
  event.preventDefault();
  searchName = searchNameEl.val().trim();
  // Clear input fields
  $('input[type="text"]').val("");

  // ----------------------------
  // Save search in local storage
  // ----------------------------

  // Check for input errors...
  // No movie selected
  if (mTitle === "") {
    $("#error-message-d").css("color","white");
    $("#error-message-d").html("No movie selected.");
    return;
  }
  // No search name entered
  if (searchName === "") {
    $("#error-message-d").css("color","white");
    $("#error-message-d").html("No search name selected.");
    return;
  }
  // Name already used
  for (i = 0; i < locStorArray.length; i++) {
    // Case insensitive compare (localeCompare returns 0 if equal and non-0 if not. Must bang it for truthy.)
    if (!searchName.localeCompare(locStorArray[i].schName,undefined,{sensitivity: "accent"})) {
      $("#error-message-d").css("color","white");
      $("#error-message-d").html("Search name already used.");
      return;
    }
  }
  // Max saves reached
  if (locStorArray.length >= 7) {
    $("#error-message-d").css("color","white");
    $("#error-message-d").html("Maximum 7 saved searches.");
    return;
  }
  // No error - clear display
  $("#error-message-d").css("color","#1b89bc");
  $("#error-message-d").html("x");

  // Save in local storage and internal array
  movieEntry.schName = searchName;
  movieEntry.movTitle = mTitle;
  movieEntry.yr = mYear;
  movieEntry.omdbUrl = requestURL;
  locStorArray.push(movieEntry);
  
  localStorage.setItem("movie-searches", JSON.stringify(locStorArray));

  // Clear and call to display updated movie searches
  renderPrevSearches();
}

function resetLocalStorage () {
  // Delete local storage, to be reloaded from saved array
  localStorage.removeItem("movie-searches");

  // Reload local storage, at present with one less row after delete button
  for (i = 0; i < locStorArray.length; i++) {
    movieEntry.schName = locStorArray[i].schName;
    movieEntry.movTitle = locStorArray[i].movTitle;
    movieEntry.yr = locStorArray[i].yr;
    movieEntry.omdbUrl = locStorArray[i].omdbUrl;
  
    localStorage.setItem("movie-searches", JSON.stringify(locStorArray));
  }
}

function searchBoth (movieTitle, yearInp) {
  let omdbURL;
  console.log(yearInp);
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
        const videoId = data.videoId;
        let iframeHtml = `<iframe width="560" height="300" src="https://www.youtube.com/embed/${videoId}";frameborder="0" allowfullscreen></iframe>`;
        $('#video-container').html(iframeHtml);
      }
    })
}

// Pass search button info from OMDB API to YouTube

// $('.btn.btn-block.btn-primary').on('click', function () {

function renderVideo () {
  // const movieTitle = movieTitleEl.val().trim().replaceAll(" ", "+");
  // const yearInp = yearEl.val().trim();

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
    $("#error-message-d").css("color","white");
    $("#error-message-d").html("Please enter search parameters.");
  }
}


function loadVideo (videoId) {
$.ajax({
    url: "https://www.googleapis.com/youtube/v3/videos",
    dataType: 'json',
    data: {
    key: 'AIzaSyDsqAm-TP-sJdITlkImb4cirbX7zwJUfBI',
    part: 'snippet',
    id: videoId
  },

// function loadVideo (videoId) {
//   $.ajax({
//       url: "https://www.googleapis.com/youtube/v3/videos",
//       dataType: 'json',
//       data: {
//       key: 'AIzaSyDsqAm-TP-sJdITlkImb4cirbX7zwJUfBI',
//       part: 'snippet',
//       id: videoId
//     },

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
  
      
      console.log("🚀 ~ file: script.js:53 ~ data:", data);
  
      $('#video-container').html(iframeHtml);
  
    }
    
  });
  
  }


// -------
// MAIN
// -------

// Load video
$(document).ready(function() {
  loadVideo(defaultVideoId);
}); 
// Call to display prior movie searches
renderPrevSearches();

// Listen for submit events on the forms
titleFormEl.on("submit", titleFormSubmit);
searchesFormEl.on("submit",searchNameFormSubmit);