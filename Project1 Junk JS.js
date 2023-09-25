Project1 Junk JS

// function searchBoth (title, year) {
//   let omdbURL;
//   if (year) {
//     omdbURL = `http://www.omdbapi.com/?t=${title}&y=${year}&apikey=f0131303&`

//   } else {
//     omdbURL = `http://www.omdbapi.com/?t=${title}&apikey=f0131303&`;
//   }

//   fetch(omdbURL)
//     .then (function (response) {
//       return response.json();
//     })

//     .then (function (data) {
//       console.log("OMDB Data", data);
    

//       if (data.Title) {
//         searchVideo (data.Title, year);
//       }

//     })

//     .catch (function (error) {
//       console.error ("Error fetching data from OMDB", error);
//     });
//   }

//   function searchVideo () {
//     $.ajax ({ 
//       url: "https://www.googleapis.com/youtube/v3/search",
//       dataType: 'json',
//       data: {
//         key: 'AIzaSyDsqAm-TP-sJdITlkImb4cirbX7zwJUfBI',
//         q: searchParameters,
//         part: 'snippet',
//         maxResults: 1,
//         type: 'video'
//       },
    
//       success: function (data) {
//         if (data.items && data.items.length > 0) {
//           const videoId = data.items[0].id.videoId;
//           loadVideo(videoId);
//         } else {
//           alert ('No trailer found');
//         }
//         },
//       error: function (error) {
//         console.error("Error fetching data", error);

//       }
//     });
//   }


  // var requestURL = 'http://www.omdbapi.com/?apikey=f0131303&';
  // var requestURL = 'http://www.omdbapi.com/?i=tt3896198&apikey=f0131303';
  // let requestURL = "http://www.omdbapi.com/?t=star+wars&y=1977&apikey=f0131303";
  // requestURL = "http://www.omdbapi.com/?t=star+wars&apikey=f0131303";

  // Full screen button
// function requestFullScreen (element) {
//   if (element.requestFullScreen) {
//     element.requestFullScreen();
//   } else if (element.mozRequestFullScreen) {
//   element.mozRequestFullScreen();
// } else if (element.webkitRequestFullscreen) {
//   element.webkitRequestFullscreen();
// } else if (element.msRequestFullscreen) {
//   element.msRequestFullscreen();
// }
// }
// document.getElementById('fullscreen-button').addEventListener ('click', function() {

//   const videoContainer = document.getElementById('video-container');
//   requestFullScreen(videoContainer);
// });


// Load video ID & populate video title / description
// function loadVideo (videoId) {
// $.ajax({
//     url: "https://www.googleapis.com/youtube/v3/videos",
//     dataType: 'json',
//     data: {
//     key: 'AIzaSyDsqAm-TP-sJdITlkImb4cirbX7zwJUfBI',
//     part: 'snippet',
//     id: videoId
//   },

//     success: function (data) {
      
//       let videoTitle = data.items[0].snippet.title; {
//         const snippet = document.getElementById('video-title');
//         snippet.innerHTML = videoTitle;
//       }
      
  
//       let videoDescription = data.items[0].snippet.description; {
//         const description = document.getElementById('video-description');
//         description.innerHTML = videoDescription;
//       }
  
  
//       let iframeHtml = `<iframe width="560" height="300" src="https://www.youtube.com/embed/${videoId}";frameborder="0" allowfullscreen></iframe>`;
  
      
//       console.log("🚀 ~ file: script.js:53 ~ data:", data);
  
//       $('#video-container').html(iframeHtml);
  
//     }
    
//   });
  
//   }

  // Add default video
// document.getElementById('search-button').addEventListener('click', function () {

//   loadVideo (defaultVideoId);
// });

// document.getElementById('search-button').addEventListener('click', function () {
  // const searchParameters = document.getElementById('title').value.trim();
  // const searchParameters = document.getElementById('OmdbParameters');
  // OmdbResults.innerHTML = JSON.stringify;
  // const title = document.getElementById('title').value.trim();
  // const year = document.getElementById('released').value.trim();


  // if (searchParameters) {
  //   const requestData = {
  //     key: 'AIzaSyDsqAm-TP-sJdITlkImb4cirbX7zwJUfBI',
  //     q: searchParameters + '1962' + 'trailer',
  //     // q: searchParameters + data.Released,
  //     part: 'snippet',
  //     maxResults: 1,
  //     type: 'video'
  //   };
  //   console.log(requestData);


    // $.ajax ({
    //   url: "https://www.googleapis.com/youtube/v3/search",
    //   dataType: 'json',
    //   data: requestData, 

    //   success: function (data) {
    //     if (data.items && data.items.length > 0) {

    //       const videoItem = data.items.find(item => {
    //         const description = item.snippet.description.toLowerCase();
    //         return description.includes(year);
            
    //       });

//           if (videoItem) {
//           const videoId = videoItem.id.videoId;
//           loadVideo(videoId);

//         } else {
//           alert ('No results found in year.');

//         }
//       } else {
        
//         alert ('No results founds.');
//       }
//     },

//   error: function (error) {
//     alert ('An error occurred while fetching YouTube data');
//     console.error(error);

//       }
//   });

// } else {
//   alert ('Please enter search parameters.');

//   }

// });

// $(document).ready(function() {
//   loadVideo(defaultVideoId);


// }); 

// Submit event on the form

  // requestURL = "http://www.omdbapi.com/?t=star+wars&apikey=f0131303";
  // requestURL = "http://www.omdbapi.com/?t=star+wars&y=1977&apikey=f0131303";
  // requestURL = "http://www.omdbapi.com/?t=the+princess+bride&apikey=f0131303";

        //Populate result fields
      // Use data.Title