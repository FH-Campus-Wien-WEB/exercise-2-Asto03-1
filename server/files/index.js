window.onload = function () {
  const xhr = new XMLHttpRequest()
  xhr.onload = function () {
    const bodyElement = document.querySelector("body")
    if (xhr.status == 200) {
      const movies = JSON.parse(xhr.responseText)
      //JS version of for each
      movies.forEach((movie) => {
        //create HTML Element for each movie
        //"main" Element
        const movieObject = document.createElement("article");
        movieObject.classList.add('movie-card'); //for 1css

        //Runtime hours and minutes
        const runtime_hour = Math.floor(movie.Runtime/60)
        const runtime_minute = movie.Runtime % 60


        //innerHTML = HTML inside of a function
        movieObject.innerHTML = `
                        <img src="${movie.Poster}" alt="${movie.Title}">
                        <h1>${movie.Title}</h1>
                            <button type="button" class="edit">Edit</button>
                            <p>Released on ${movie.Released}</p>
                            <p>Runtime: ${runtime_hour}h ${runtime_minute}min</p>
                            <div class="genres-container">
                                ${movie.Genres.map(e => `<span class="genres-tags">${e}</span>`).join('')}
                            </div>
                        <h2>Plot</h2>
                            <div class="plot-container">
                                <i>${movie.Plot}</i>
                            </div>
                        <h2>${movie.Directors.length > 1 ? 'Directors' : 'Director'}</h2>
                            <div class="directors-container">
                                ${movie.Directors.map(e => `<span>${e}</span>`).join('')}
                            </div>
                        <h2>${movie.Writers.length > 1 ? 'Writers' : 'Writer'}</h2>
                            <div class="writers-container">
                                ${movie.Writers.map(e => `<span>${e}</span>`).join('')}
                            </div>
                        <h2>${movie.Actors.length > 1 ? 'Actors' : 'Actor'}</h2>
                            <div class="actors-container">
                                ${movie.Actors.map(e => `<span>${e}</span>`).join('')}
                            </div>
                        <h2>Ratings</h2>
                            <p>Metascore: ${movie.Metascore}</p>
                            <p>IMDb: ${movie.imdbRating}</p>
                        `;

        bodyElement.append(movieObject);

        const editButton = movieObject.querySelector(".edit"); //create Element for the editButton (because of innerHTML)
        editButton.addEventListener("click", (e) => {  //event on click (similar to JavaFX)
          location.href = `edit.html?imdbID=${movie.imdbID}`;
        })
      })


    } else {
      bodyElement.append("Daten konnten nicht geladen werden, Status " + xhr.status + " - " + xhr.statusText)
    }
  }
  xhr.open("GET", "/movies")
  xhr.send()
};
