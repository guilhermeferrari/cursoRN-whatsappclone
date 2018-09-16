/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Routes from './src/Routes'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './src/reducers/index'
import firebase from 'firebase'
import {key as apiKey} from './firebaseconfig.json'

export default class App extends Component {

	componentWillMount(){
		let config = {
			apiKey: apiKey,
			authDomain: "whatsapp-clone-e01f1.firebaseapp.com",
			databaseURL: "https://whatsapp-clone-e01f1.firebaseio.com",
			projectId: "whatsapp-clone-e01f1",
			storageBucket: "whatsapp-clone-e01f1.appspot.com",
			messagingSenderId: "653398324919"
		};
		firebase.initializeApp(config);
	}

  render() {
    return (
      <Provider store={createStore(reducers)}>
        <Routes />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
});
