// Components/FilmItem.js

import React from 'react'
import {getImageFromApi} from '../API/TMDBApi'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'

class FilmItem extends React.Component {

  _displayFavoriteImage() {
    if (this.props.isFilmFavorite) {
      // Si la props isFilmFavorite vaut true, on affiche le 🖤
      return (
        <Image
          style={styles.favorite_image}
          source={require('../Images/ic_favorite.png')}
        />
      )
    }
  }
  render() {
   /* console.log(this.props) 
    pour afficher les données qui sont recupéré dans le log
   const film = this.props.film // je cree une variable qui va contenir les donné de ma liste
   const displayDetailForFilm = this.props.displayDetailForFilm
   */
  const {film, displayDetailForFilm} = this.props
    return (
      <TouchableOpacity
      onPress={() => displayDetailForFilm(film.id)}
       style={styles.main_container}>
        <Image
          style={styles.image}
          source={{uri: getImageFromApi(film.poster_path)}}
        />
        <View style={styles.content_container}>
          <View style={styles.header_container}>
            <Text style={styles.title_text}>{film.title}</Text>
            <Text style={styles.vote_text}>{film.vote_average}</Text>
          </View>
          <View style={styles.description_container}>
            <Text style={styles.description_text} numberOfLines={4}>{film.overview}</Text>
            {/* La propriété numberOfLines permet de couper un texte si celui-ci
             est trop long, il suffit de définir un nombre maximum de ligne */}
          </View>
          <View style={styles.date_container}>
            <Text style={styles.date_text}>Sorti le {film.release_date}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  // le nom du style principale  
  main_container: {
    height: 190,
    // les components sont aligné de manieres horizontal
    flexDirection: 'row' 
  },
  // le nom du style du component iImage
  image: {
    width: 100,
    height: 140,
    margin: 5,
    backgroundColor: 'gray'
  },
  // le nom du style du deuxieme component View
  content_container: {
    // veut dire que tu occupe toute l'espace qui t'est alloué  
    flex: 1,
    margin: 5
  },
  // le nom du style du component  qui contient le titre et les votes
  header_container: {
    // veut dire qu'il va occuper les 3 grandes partie
    flex: 3,
    flexDirection: 'row'
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    //permet à notre texte de passer à la ligne si celui-ci est trop long ;
    flexWrap: 'wrap',
    paddingRight: 5
  },
  vote_text: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#666666'
  },
  description_container: {
    flex: 7
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666'
  },
  date_container: {
    flex: 1
  },
  date_text: {
    textAlign: 'right',
    fontSize: 14
  },
  favorite_image: {
    width: 25,
    height: 25,
    marginRight: 5
  }
})

// qui permet d'exporter la classe
export default FilmItem