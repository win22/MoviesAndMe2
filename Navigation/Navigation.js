import { createStackNavigator, createAppContainer } from  'react-navigation'
import  Search  from  '../Components/Search'
import  FilmDetails  from  '../Components/FilmDetails'

const  SearchStackNavigator = createStackNavigator ({
    Search: {
        screen: Search,
        navigationOptions: {
            title: "Rechercher"
        }
    },
    FilmDetails: {
        screen: FilmDetails
    }

})

export default createAppContainer(SearchStackNavigator)