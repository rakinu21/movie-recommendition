  
var API_KEY = "api_key=423b4eefa7b55b75f9ff7691920aaff9";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + '/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&'
+API_KEY;

const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL +'/search/movie?&api_key=423b4eefa7b55b75f9ff7691920aaff9&query="';
const main = document.getElementById('section');

  

const genres = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];
const tags = document.getElementById("tags");
// function for the genra
const selectGenre = [];

  function setGenre() {
  main.innerHTML = '';
  tags.innerHTML = "";
  genres.forEach((genre) => {
    const tag = document.createElement("div");
    tag.classList.add("tag");
    tag.id = genre.id;
    tag.innerText = genre.name;
    tag.addEventListener("click", () => {

      if (selectGenre.length == 0) {
        main.innerHTML = '';
       
        selectGenre.push(genre.id);
      } else {
        if (selectGenre.includes(genre.id)) {
          selectGenre.forEach((id, idx) => {
            if (id == genre.id) {
              main.innerHTML = '';
              selectGenre.splice(idx, 1);
            }
          });
        } else {
          main.innerHTML = '';
          selectGenre.push(genre.id);
        }
      }
      returnMovies(API_URL + "&with_genres=" + encodeURI(selectGenre.join(",")));
    });
   
    tags.append(tag);
  
  });
}
  setGenre(); 

  const home =document.getElementById('home')
  const epenIconGenres =document.getElementById('icon-genre')
  const openGenresNav = document.getElementById('openNav');
  const homepagebtn = document.getElementById('homebtn')

  homepagebtn.addEventListener('click',()=>{
  
    homeView()

    epenIconGenres.classList.remove('active')
  })

openGenresNav.addEventListener('click',()=>{
  document.getElementById("mySidenav").style.width = "200px";
  document.getElementById("main-container").style.marginLeft = "100px";
  document.getElementById("main-container").style.transition = "0.5s";

  

})

function homeView(){
 
  home.classList.remove('animate__animated', 'animate__bounceOutRight')
  home.classList.add('animate__animated', 'animate__backInRight', 'animate__delay-1s')
  main.classList.remove('animate__animated', 'animate__backInRight','animate__delay-1s')
  main.classList.add('animate__animated', 'animate__bounceOutRight')
  returnMovies(API_URL)
  
}


 //Set the width of the side navigation to 0 and the left margin of the page content to 0 
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main-container").style.marginLeft = "0";
}


 function returnMovies(url) {
    
  fetch(url).then(res => res.json()).then(function(data) {
      
     
       console.log(data.results);
      //showMovies(data.results)
      data.results.forEach(element => {
          const div_card = document.createElement('div');
          div_card.setAttribute('class','card');
          const div_row = document.createElement('div');
          div_row.setAttribute('class','container');
          const div_column = document.createElement('div');
          div_column.setAttribute('class','column');
          const image = document.createElement('img');
          image.setAttribute('class','images');
          image.setAttribute('id','images');
          const title = document.createElement('h3');
          title.setAttribute('id','title');
          const div_image = document.createElement('div');
          title.innerHTML =`${element.title}`  
          image.src = IMG_URL + element.poster_path;
          const ratings = document.createElement('span')
          ratings.setAttribute('id','ratings')
          ratings.innerHTML = `${element.vote_average}`
          const titleRatings = document.createElement('div')
          titleRatings.setAttribute('id','title-ratings');
          const playVideo = document.createElement('div')
          const icons = document.createElement('i');
          icons.setAttribute('class','fa-regular fa-circle-play')
          playVideo.setAttribute('id','play', element.id)
          div_image.appendChild(image)
          div_card.appendChild(div_image);
          div_card.appendChild(titleRatings)
          titleRatings.appendChild(title);
          titleRatings.appendChild(ratings)
          div_card.appendChild(playVideo)
          playVideo.appendChild(icons)
          div_column.appendChild(div_card);
          div_row.appendChild(div_column);
          main.appendChild(div_row)
        
          playVideo.addEventListener('click',()=>{
            console.log(playVideo);
            opennewNav(element);
          });
      });
  });
 
}

// FUNCTION FOR THE HOME PAGE 

const homeplaybtn = document.getElementById('free');
  homeplaybtn.addEventListener('click',()=>{
    main.innerHTML = " ";
    home.classList.remove('animate__animated', 'animate__backInRight', 'animate__delay-1s')
    main.classList.remove('animate__animated', 'animate__backInRight','animate__delay-1s')
      main.classList.remove('animate__animated', 'animate__bounceOutRight')
    home.classList.add('animate__animated', 'animate__bounceOutRight')
    epenIconGenres.classList.add('active')
   main.style.zIndex = 10;
  
    main.classList.add('animate__animated', 'animate__backInRight','animate__delay-1s') 
    returnMovies(API_URL)
   
  })

function opennewNav(movie) {
  const id = movie.id;
  const navElement = document.getElementById("myNav");
  const overlayContent = document.getElementById("overlay-content");

 

  fetch(`${BASE_URL}/movie/${id}/videos?${API_KEY}`)
 
    .then((res) => res.json())
    .then((videoData) => {
      console.log(videoData);

      if (videoData && videoData.results.length > 0) {
        
        const youtubeEmbeds = videoData.results
          .filter((video) => video.site === "YouTube")
          .map((video) => {
            const { name, key } = video;
          
            return `
              <iframe width="300px" height="200px" src="https://www.youtube.com/embed/${key}"
                title="${name}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;
                picture-in-picture; web-share" allowfullscreen></iframe>`;
          });
        // cast
        
        if (youtubeEmbeds.length >0)  {
          const content = document.getElementById('popup-container')
          content.innerHTML =  ` <div class="content">
          <div class="left">
              
                  <img src="${IMG_URL + movie.poster_path}" alt="${movie.title}" width="300" height="400" class="popupimage">
             
            
          </div>
          <div class="right">
              <h1 class="title-popup">${movie.title}</h1>
              <div class="single-info-container">
                
                
                  <div class="single-info">
                      <span>Rate:</span>
                      <span>${movie.vote_average} / 10</span>
             
                      <span>Release Date:</span>
                      <span>${movie.release_date}</span>
                  </div>
                  <span class="trialer-container" id="trialer-container">
                  <i class="fa-solid fa-circle-play"></i>
                     Trailer
                  </span>
                  <span class="comment-span" id="comment-span">
                  <i class="fa-regular fa-comments"></i>
                  </span>
              </div>
              
              <div class="overview">
                  <h2 class="overview-text">Overview</h2>
                  <p>${movie.overview}</p>
              </div>
            
          </div>
          <div id="comment-dialog">
          <div class="button" id="close"><i class="fa-solid fa-x"></i></div>
        
          <div class="movie" data-id="1">
          <h1 class="title-movies-comment">${movie.title}</h1>
          <textarea class="comment-input" placeholder="Add a comment"></textarea>
          <button class="submit-comment">Submit</button>
          <div class="comments">
          <div class="comment-tag">
          <i class="fa-solid fa-user"></i>
          </div>
          </div>
        </div>
        
      </div>
        
      </div> 
      
    
      
      `
      const commentInput = document.querySelector('.comment-input');
      const submitButton = document.querySelector('.submit-comment');
      const commentsDiv = document.querySelector('.comments');
      
      submitButton.addEventListener('click', function() {
        const commentText = commentInput.value.trim();
             
        if (commentText !== '') {
          addComment(commentText.substring(0, 50)); // Add the comment up to 50 characters
          commentInput.value = ''; // Clear the input field after adding the comment
        } else {
          alert('Please enter a comment!');
        }
      });
      
      function addComment(commentText) {
        // Create a new comment element
        const newComment = document.createElement('div');
        newComment.classList.add('comment');
          newComment.style.color = '#000000';
    newComment.style.height = '4.1rem'
    newComment.style.width = '800px'
        newComment.style.border = 'none'
        newComment.style.boxShadow = '5px 5px 15px #131313'
    newComment.style.display = "flex"
    newComment.style.justifyContent = 'flex-start'
    newComment.style.alignItems = 'center'
    newComment.style.fontSize = '1rem'
    newComment.style.paddingLeft = '10px'
    newComment.style.background = 'transparent';
    newComment.style.borderRadius = '10px';
        newComment.style.fontWeight = 700;

        // Create the comment content
        const commentContent = document.createElement('div');
        commentContent.textContent = commentText;
      
        // Create the like button for the comment
        const likeButton = document.createElement('button');
        likeButton.textContent = 'Like';
        likeButton.classList.add('like-button');
        likeButton.dataset.likes = '0'; // Initial number of likes
        likeButton.style.marginRight = '20px'
        likeButton.style.marginLeft = '20px'
        likeButton.style.width = '80px'
        likeButton.style.height = '1.2rem'
        likeButton.style.background = '#e9c9c9';
        likeButton.style.border = 'none'
        likeButton.style.boxShadow = '5px 5px 15px #131313'
        // Create the dislike button for the comment
        const dislikeButton = document.createElement('button');
        dislikeButton.textContent = 'Dislike';
        dislikeButton.classList.add('dislike-button');
        dislikeButton.dataset.dislikes = '0'; // Initial number of dislikes
        dislikeButton.style.width = '80px'
        dislikeButton.style.height = '1.2rem'
        dislikeButton.style.background = '#e9c9c9';
        dislikeButton.style.border = 'none'
        dislikeButton.style.boxShadow = '5px 5px 15px #131313'
        // Append the content and buttons to the comment element
        newComment.appendChild(commentContent);
        newComment.appendChild(likeButton);
        newComment.appendChild(dislikeButton);
      
        // Append the new comment to the comments section
        commentsDiv.appendChild(newComment);
      
        // Save the comments in localStorage
        const existingComments = JSON.parse(localStorage.getItem('movieComments')) || [];
        existingComments.push({ text: commentText, likes: 0, dislikes: 0 });
        localStorage.setItem('movieComments', JSON.stringify(existingComments));
      
        // Event listener for the like button
        likeButton.addEventListener('click', function() {
          const currentLikes = parseInt(likeButton.dataset.likes);
          const updatedLikes = currentLikes + 1;
          likeButton.dataset.likes = updatedLikes;
          likeButton.textContent = `Like (${updatedLikes})`;
      
          // Update the like count in localStorage
          updateCommentCount(commentText, 'likes', updatedLikes);
        });
      
        // Event listener for the dislike button
        dislikeButton.addEventListener('click', function() {
          const currentDislikes = parseInt(dislikeButton.dataset.dislikes);
          const updatedDislikes = currentDislikes + 1;
          dislikeButton.dataset.dislikes = updatedDislikes;
          dislikeButton.textContent = `Dislike (${updatedDislikes})`;
      
          // Update the dislike count in localStorage
          updateCommentCount(commentText, 'dislikes', updatedDislikes);
        });
      }
      
      function updateCommentCount(commentText, type, count) {
        const commentsInStorage = JSON.parse(localStorage.getItem('movieComments'));
        const commentIndex = commentsInStorage.findIndex(comment => comment.text === commentText);
        if (commentIndex !== -1) {
          commentsInStorage[commentIndex][type] = count;
          localStorage.setItem('movieComments', JSON.stringify(commentsInStorage));
        }
      }
      
      // Function to load comments from localStorage when the page loads
      window.addEventListener('load', function() {
        const existingComments = JSON.parse(localStorage.getItem('movieComments')) || [];
      
        existingComments.forEach(comment => {
          addComment(comment.text);
        });
      });
      

  // Function to add a comment to the movie section
  // const commentInput = document.querySelector('.comment-input');
  // const submitButton = document.querySelector('.submit-comment');
  // const commentsDiv = document.querySelector('.comments');
  
  // submitButton.addEventListener('click', function() {
  //   const commentText = commentInput.value.trim();
  
  //   if (commentText !== '') {
  //     addComment(commentText.substring(0, 50)); // Add the comment up to 50 characters
  //     commentInput.value = ''; // Clear the input field after adding the comment
  //   } else {
  //     alert('Please enter a comment!');
  //   }
  // });
  
  // // Function to add a comment to the movie section and store it in localStorage
  // function addComment(commentText) {
  //   // Create a new comment element
  //   const newComment = document.createElement('comment-tag');
    
  //   newComment.classList.add('comment');
  //   newComment.textContent = commentText;
  //   newComment.style.color = '#000000';
  //   newComment.style.height = '4.1rem'
  //   newComment.style.width = '800px'
  //   newComment.style.border = '2px solid'
  //   newComment.style.display = "flex"
  //   newComment.style.justifyContent = 'flex-start'
  //   newComment.style.alignItems = 'center'
  //   newComment.style.fontSize = '1rem'
  //   newComment.style.paddingLeft = '10px'
  //   newComment.style.background = '#ffffff';
  //   newComment.style.borderRadius = '10px';
  //   newComment.style.fontWeight = 700;
  //   // Append the new comment to the comments section
  //   commentsDiv.appendChild(newComment);
  
  //   // Save the comments in localStorage
  //   const existingComments = JSON.parse(localStorage.getItem('movieComments')) || [];
  //   existingComments.push(commentText);
  //   localStorage.setItem('movieComments', JSON.stringify(existingComments));
  // }
  
  // // Function to load comments from localStorage when the page loads
  // window.addEventListener('load', function() {
  //   const existingComments = JSON.parse(localStorage.getItem('movieComments')) || [];
  
  //   existingComments.forEach(comment => {
  //     addComment(comment);
  //   });
  // });
  
  

      const dialog = document.getElementById("dialog-overlay")
      const btnCloseDialog = document.getElementById('close-dialogBtn')
      btnCloseDialog.onclick = () => {
        dialog.classList.add("close-animate");
        setTimeout(() => {
          dialog.close();
          dialog.classList.remove("close-animate");
        }, 300);
      }
     
    const  trialer_container = document.getElementById('trialer-container')
        trialer_container.addEventListener('click',()=>{
          dialog.showModal()
        }) // end for the trailer movies dialog function
     
        const commentBtn = document.getElementById('comment-span')
        const dialogComment = document.getElementById('comment-dialog')
          const commentBtnClose = document.getElementById('close')
          
            commentBtn.addEventListener('click',()=>{
               dialogComment.classList.add('active')

            })
          commentBtnClose.addEventListener('click', () => {
         
          dialogComment.classList.toggle('active')
        })
          
          overlayContent.innerHTML = youtubeEmbeds.join("");
        } else {
          overlayContent.innerHTML = "<h1>No YouTube videos found</h1>";
        }
      } else {
       overlayContent.innerHTML = "<h1>No videos found</h1>";
      } 
    overlayContent.style.backgroundImage = `url(${IMG_URL + movie.poster_path})`;
    overlayContent.style.backgroundRepeat=`no-repeat`;
    overlayContent.style.backgroundPosition = `center`;
    overlayContent.style.backgroundSize = `cover`;
    overlayContent.style.paddingTop = '50px'
    overlayContent.style.height = '100%'
      
      navElement.style.zIndex = 20;
      navElement.classList.add('animate__animated', 'animate__backInRight');
      navElement.style.transition = '0.5s'
      navElement.style.width = "100%";
    });
}

  const homeNavigation = document.getElementById('closebtn');
        homeNavigation.addEventListener('click',()=>{
          document.getElementById("myNav").style.width = "0%";
        })

  // function  for the search movies
        const form = document.getElementById('form');
        const search = document.getElementById('input');
form.addEventListener('submit',(e)=>{
e.preventDefault();

home.classList.add('animate__animated', 'animate__bounceOutRight')
main.classList.add('animate__animated', 'animate__backInRight','animate__delay-1s')
main.style.zIndex = '15'
epenIconGenres.classList.add('active')
main.innerHTML = ''; // display null sa akong movie container
  const searchItem = search.value;

  if(searchItem){
    returnMovies(searchURL + searchItem);
  
    search.value = "";
  }
  
});  // end of the search movies







// end for the add comment function


