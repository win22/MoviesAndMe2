const initialState = { favoritesFilm : []} //  creation d'une variable initial dans la quelle on va initialiser une variable avec un tableau vide

//initialer le reducer
function toggleFavorite (state = initialState, action){
    let nextState
    switch (action.type) {
        case 'TOGGLE_FAVORITE':
            
            //creation d'un index qui correspond au state favorite et qui va chercher l'index en cours
            const favoritesFilmIndex =  state.favoritesFilm.findIndex(item => item.id === action.value.id)
            // si favoritesFilm n'est pas = -1
            if ( favoritesFilmIndex !== -1)
            {
                // ça signifie que le film est deja present dans la favorie, alors on le supprime
                nextState = {
                    ...state,
                    favoritesFilm:state.favoritesFilm.filter((item, index) =>index !==  favoritesFilmIndex)
                }
            }
            else {
                //AJouter
                nextState = {
                    ...state,
                    favoritesFilm: [ ...state.favoritesFilm, action.value]
                }
            }
            // si nextState renvoi undefind on renvoi alors le state et vice versa
            return nextState || state
        default:
            return state
    }
}
// on export afin de l'utilisé partout dans l'application
export default toggleFavorite   

















//https://www.youtube.com/watch?v=DSLrpwZoqrA