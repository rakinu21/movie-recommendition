
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
 const main = document.getElementById('section');
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