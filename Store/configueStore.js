import { createStore } from 'redux'
import  toggleFavorite  from './Reducers/favoriteReducer'

export default createStore(toggleFavorite)

/**
 * Une fois le store creer il faut importer dans notre fichier App.js,  provider
 */