import React from 'react'
import { Image , StyleSheet } from 'react-native' 
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from  'react-navigation'
import  Search  from  '../Components/Search'
import  FilmDetails  from  '../Components/FilmDetails'
import  Favorites  from  '../Components/Favorites'

const  SearchStackNavigator = createStackNavigator ({
    Search: {
        screen: Search,
        navigationOptions: {
            title: "Rechercher"
        }
    },
    FilmDetails: {
        screen: FilmDetails,
        navigationOptions: {
            title: "Detail du Film"
        }
    }

})

// pour la creation de TabNavigator , puis nous l'avons remplacé
const MoviesTabNavigator = createBottomTabNavigator({
    Search: {
        screen: SearchStackNavigator,
        navigationOptions: {
            tabBarIcon: () => {
                return <Image
                source= {require('../Images/ic_search.png')}
                style={styles.icon}/>
            }
        }
    },
    Favorites: {
        screen: Favorites, navigationOptions: {
            tabBarIcon: () => {
                return <Image
                source= {require('../Images/ic_favorite.png')}
                style={styles.icon}/>
            }
        }
    }
}, 
{
    tabBarOptions:{
        showLable: true,
        showIcon: true,
        activeBackgroundColor: '#DDDDDD',
        inactiveBackgroundColor: '#FFFFFF'
    }
}
)

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30 
    }
})

export default createAppContainer(MoviesTabNavigator)