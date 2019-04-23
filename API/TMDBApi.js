const API_TOKEN = "ea67cbb23f08ace6111681c0210706f2";

// cette function de retourner un api en fonction de la recherche
export function getFilmsFromApiWithSearchText(text, page){

    // languagefr permet de retourner des films traduit en français et query permet de rechercher les films en fonctions d'un test
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text + '&page=' + page
    return fetch(url)
    .then((response)=> response.json())
    .catch((error) => console.log(erro))
}

//Creation d'une fonction qui permet de recuperer l'image
export function  getImageFromApi(name){
    return 'https://image.tmdb.org/t/p/w300' + name
}

// Récupération du détail d'un film
export function getFilmDetailFromApi (id) {
    return fetch('https://api.themoviedb.org/3/movie/' + id + '?api_key=' + API_TOKEN + '&language=fr')
      .then((response) => response.json())
      .catch((error) => console.error(error));
  }
 