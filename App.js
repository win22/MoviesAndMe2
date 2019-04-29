import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './Navigation/Navigation';
import { Provider } from 'react-redux' //  apres ceci faudrait importer le store afin de le distribuer partout dans notre application
import Store from './Store/configueStore'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={Store}>
           <Navigation/> 
      </Provider>
     /**
      * On encapsule notre application dans le store , A present il faut connecté lui et son state globla à notre component
      */
    );
  }
}
