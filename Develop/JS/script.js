
let apiKey = 'AIzaSyDsqAm-TP-sJdITlkImb4cirbX7zwJUfBI';
let defaultVideoId = 'rN7EAneK2ko';

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

// function loadVideo (videoId) {
// $.ajax({
//     url: "https://www.googleapis.com/youtube/v3/videos",
//     dataType: 'json',
//     data: {
//     key: 'AIzaSyDsqAm-TP-sJdITlkImb4cirbX7zwJUfBI',
//     part: 'snippet',
//     id: videoId
//   },
//   success: function (data) {
    
//     let videoTitle = data.items[0].snippet.title; {
//       const snippet = document.getElementById('video-title');
//       snippet.innerHTML = videoTitle;
//     }
    

//     let videoDescription = data.items[0].snippet.description; {
//       const description = document.getElementById('video-description');
//       description.innerHTML = videoDescription;
//     }


//     let iframeHtml = `<iframe width="560" height="300" src="https://www.youtube.com/embed/${videoId}";frameborder="0" allowfullscreen></iframe>`;

    
//     console.log("🚀 ~ file: script.js:53 ~ data:", data);

//     $('#video-container').html(iframeHtml);

//   }
  
// });

// }

// document.getElementById('search-button').addEventListener('click', function () {

//   loadVideo (defaultVideoId);
// });

// document.getElementById('search-button').addEventListener('click', function () {
//   const searchParameters = document.getElementById('search-input').value.trim();
//   const year = document.getElementById('year-input').value.trim();

//   console.log(year);

//   if (searchParameters) {
//     const requestData = {
//       key: 'AIzaSyDsqAm-TP-sJdITlkImb4cirbX7zwJUfBI',
//       q: searchParameters + 'trailers',
//       part: 'snippet',
//       maxResults: 1,
//       type: 'video'
//     };

//     $.ajax ({
//       url: "https://www.googleapis.com/youtube/v3/search",
//       dataType: 'json',
//       data: requestData, 

//       success: function (data) {
//         if (data.items && data.items.length > 0) {

//           const videoItem = data.items.find(item => {
//             const description = item.snippet.description.toLowerCase();
//             return description.includes(year);
            
//           });

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

// const firstDupe = function (arrayOfNumbers) {
//   for (i= 0; i < arrayOfNumbers.length; i++)
//   for (let j=i+1; j < arrayOfNumbers.length; j++) {
//       const iElement = arrayOfNumbers[i];
//       const jElement = arrayOfNumbers[j];{
  
//   if (iElement === jElement) {
//       return iElement;
  
//     }
//     console.log(firstDupe([1,2,3,4,4,4]));
//     }
//   }
// }
