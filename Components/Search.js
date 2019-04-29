import React from 'react' //Import de la librairie React
import {StyleSheet, View, TextInput, Button, FlatList,ScrollView,ActivityIndicator, Text} from 'react-native'
import films from '../Helpers/filmsData'
import FilmItem from './filmItems';
import { getFilmsFromApiWithSearchText } from '../API/TMDBApi';
import { connect } from 'react-redux' // afin de conncter notre component au store

//Creation d'une class qui herite de React.Component
class Search extends React.Component {
  constructor(props){
    super(props)
    // pour le nombre de page
    this.page = 0
    // pour le nombre total de chien
    this.totalPage = 0
     this.state = { 
       films: [],
       isLoading :  false 
       }
       this.searchText = ""
      
     }

  
    //Methode du button rechercher
  _loadFIlms(){
   this.setState({isLoading: true})
   if(this.searchText.length > 0){
      getFilmsFromApiWithSearchText(this.searchText, this.page+1).then(data => {
        this.page = data.page
        this.totalPage = data.total_pages
      this.setState({ 
        films: [ ...this.state.films, ...data.results ], // ... Permet de dire que je cree une copie et puis je fais concatenation
        isLoading:false })
  })
   }
  }

  //Methode Pour  afficher le chargerment
  _displayLoading(){
    if (this.state.isLoading){
      return(
        <View style = {styles.loading_container}>
        <ActivityIndicator size='large'/>
        </View>
      )
    }
  }

  // Methode du Input Text
  _searchTextInputChanged(text){
    this.searchText = text

  }

  // Methode pour Relancer la Recherche 
  _searchFilms() {
    this.page = 0
    this.totalPage = 0
    this.setState({
      films: []
    },() => {
      this._loadFIlms()
    } )
   
  }

  //Methode pour afficher les informations d'un Film
  _displayDetailForFilm = (idFilm) => {
    this.props.navigation.navigate("FilmDetails", {idFilm: idFilm})
   // console.log("Display film with id" + idFilm);
  }
 
  
  

  render(){
      return (
        <View style={styles.main_container}>
          <TextInput 
                // cette fonction de taper sur entrer du clavier
                 onSubmitEditing={() => this._searchFilms()}
                 onChangeText={(text)=> this._searchTextInputChanged(text)}
                 style={styles.textInput} placeholder="Titre du Film">
          </TextInput>
          <Button 
                style={{height: 50}} title="rechercher" onPress={()=> this._searchFilms()}>
          </Button>
          <FlatList
                onEndReachedThreshold={0.5}
                onEndReached={() => {
                  if(this.page < this.totalPage) {
                    this._loadFIlms()
                  }
                }}
                //  qui correspond aux données affichées dans la liste. Ici, on renseignera nos films ;
                data={this.state.films}
                renderItem={({item}) =>
            <FilmItem
              film={item}
              // Ajout d'une props isFilmFavorite pour indiquer à l'item d'afficher un 🖤 ou non
              isFilmFavorite={(this.props.favoritesFilm.findIndex(film => film.id === item.id) !== -1) ? true : false}
              displayDetailForFilm={this._displayDetailForFilm}
            />
          }
                /* qui correspond au fait que notre item doit etre identifié de maniere unique
                *Depuis les dernières versions de React Native, la propriété key du keyExtractor doit être une chaîne de caractères. 
                C'est pourquoi j'ai ajouté la fonction  .toString()  ici, pour convertir notre identifiant de film en chaîne de caractères.*/
                keyExtractor={(item) => item.id.toString()}
                // qui correspond au rendu des données de la liste. Ici, on définira un template pour afficher nos films.
                renderItem={({item}) => <FilmItem film={item} 
                displayDetailForFilm={this._displayDetailForFilm}/>}
                />
                {this._displayLoading()}
        </View>
       

    )
  }
}

const styles = StyleSheet.create( {
  main_container: {
    marginTop: 10, 
   flex: 1 
  },

  textInput: {
  marginLeft: 5,
  marginRight: 5,
  height: 50,
  borderColor: '#000000',
  borderWidth: 1,
  paddingLeft: 5
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

// On connecte le store Redux, ainsi que les films favoris du state de notre application, à notre component Search
const mapStateToProps = state => {
  return {
    favoritesFilm: state.favoritesFilm
  }
}
// Afin d'exporter notre application
export default connect(mapStateToProps)(Search)