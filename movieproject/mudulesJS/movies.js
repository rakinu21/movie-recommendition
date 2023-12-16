 export const main = document.getElementById('section');


 export function returnMovies(url) {

    
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
          const comment = document.createElement('div');
          comment.setAttribute('class','comment')
          const commentIcon = document.createElement('i')
          commentIcon.setAttribute('class','fa-regular fa-comment')
          div_image.appendChild(image)
          div_card.appendChild(div_image);
          div_card.appendChild(titleRatings)
          div_card.appendChild(comment)
          titleRatings.appendChild(title);
          titleRatings.appendChild(ratings)
          div_card.appendChild(playVideo)
          playVideo.appendChild(icons)
          comment.appendChild(commentIcon)
          div_column.appendChild(div_card);
          div_row.appendChild(div_column);
          main.appendChild(div_row)
        //    comment.onclick = () => dialog.show();
          playVideo.addEventListener('click',()=>{
            console.log(playVideo);
            opennewNav(element);
          });
      });
  });
 
}