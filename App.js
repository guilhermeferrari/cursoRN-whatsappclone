/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import FormLogin from './src/components/FormLogin';
import FormCadastro from './src/components/FormCadastro';
export default class App extends Component {
  render() {
    return (
      <FormCadastro />
    );
  }
}

const styles = StyleSheet.create({
});
