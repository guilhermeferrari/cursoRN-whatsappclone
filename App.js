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

export default class App extends Component {
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
