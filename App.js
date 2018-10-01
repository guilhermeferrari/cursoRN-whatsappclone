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
import { createStore, applyMiddleware } from 'redux'
import reducers from './src/reducers/index'
import {key as apiKey} from './firebaseconfig.json'
import ReduxThunk from 'redux-thunk'

export default class App extends Component {

	componentWillMount(){
		const firebase = require("firebase");
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
		console.disableYellowBox = true;
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <Routes />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
});
