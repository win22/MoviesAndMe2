function reducerProfil(state, action) {
    let nextState
    
    switch (action.key) {
        case 'ADD_PROFIL':
        nextState = {
            ...state,
            profil: action.value 
        }
            return nextState
        case 'UPDATE_PROFIL':
            return nextState
        case 'DELETE_PROFIL':
            return nextState 
            
            break;
    
        default:
            break;
    }
}