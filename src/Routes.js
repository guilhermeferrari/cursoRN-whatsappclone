import React, { Component } from 'react';
import FormLogin from './components/FormLogin';
import FormCadastro from './components/FormCadastro';
import BoasVindas from './components/BoasVindas'
import { Router, Scene } from 'react-native-router-flux';

export default props => (
    <Router>
        <Scene key="root">
            <Scene key="formLogin" component={FormLogin} title="Login" />
            <Scene key="formCadastro" component={FormCadastro} title="Cadastro" />
            <Scene key="boasVindas" component={BoasVindas} title="Bem Vindo" />
        </Scene>
    </Router>
)