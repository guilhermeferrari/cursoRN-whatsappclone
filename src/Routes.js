import React, { Component } from 'react';
import FormLogin, { COLOR_HTML_P } from './components/FormLogin';
import FormCadastro from './components/FormCadastro';
import BoasVindas from './components/BoasVindas'
import Principal from './components/Principal'
import { Router, Scene } from 'react-native-router-flux';
import { StatusBar, View } from 'react-native'
import AdicionarContato from './components/AdicionarContato'

export default props => (
    <View style={{flex:1}}>
        <StatusBar barStyle="light-content" />
        <Router navigationBarStyle={{ backgroundColor: COLOR_HTML_P }} titleStyle={{ color: '#fff' }} >
            <Scene key="root">
                <Scene key="formLogin" component={FormLogin} hideNavBar title="Login" />
                <Scene key="formCadastro" component={FormCadastro} title="Cadastro" />
                <Scene key="boasVindas" component={BoasVindas} hideNavBar title="Bem Vindo" />
                <Scene key='principal' component={Principal} hideNavBar title="Principal" />
                <Scene key='adicionarContato' component={AdicionarContato} back title="Adicionar Contato" />
            </Scene>
        </Router>
    </View>
)