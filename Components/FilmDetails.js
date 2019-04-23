// Components/FilmDetail.js

import React from 'react'
import {getFilmDetailFromApi, getImageFromApi} from '../API/TMDBApi';
import { StyleSheet, View, ActivityIndicator, Text,Image, ScrollView} from 'react-native'
import moment from 'moment'
import numeral from 'numeral'

class FilmDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      film: undefined, // Pour l'instant on n'a pas les infos du film, on initialise donc le film à undefined.
      isLoading: true // A l'ouverture de la vue, on affiche le chargement, le temps de récupérer le détail du film
    }
  }
  componentDidMount() {
    getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(data => {
      this.setState({
        film: data,
        isLoading: false
      })
    })
}

_displayFilm() {
  if (this.state.film != undefined) {
    return (
      <ScrollView style={styles.scrollview_container}>
       <Image
            style={styles.image}
            source={{uri: getImageFromApi(this.state.film.backdrop_path)}}
          />
       
        <Text style={styles.title_text}>{this.state.film.title}</Text>
          <Text style={styles.description_text}>{this.state.film.overview}</Text>
          <Text style={styles.default_text}>Sorti le {moment(new Date(this.state.film.release_date)).format('DD/MM/YYYY')}</Text>
          <Text style={styles.default_text}>Note : {this.state.film.vote_average} / 10</Text>
          <Text style={styles.default_text}>Nombre de votes : {this.state.film.vote_count}</Text>
      </ScrollView>
    )
  }
}


  _displayLoading() {
    if (this.state.isLoading) {
      // Si isLoading vaut true, on affiche le chargement à l'écran
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

  render() {
    return (
      <View style={styles.main_container}>
        {this._displayFilm()}
        {this._displayLoading()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    height: 169,
    margin: 5
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 35,
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: '#000000',
    textAlign: 'center'
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
    margin: 5,
    marginBottom: 15
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  }
})

export default FilmDetails