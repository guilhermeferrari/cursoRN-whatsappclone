import React, { Component } from 'react';
import FormLogin2, { COLOR_HTML_P } from './components/FormLogin2';
import FormCadastro from './components/FormCadastro';
import BoasVindas from './components/BoasVindas'
import Principal from './components/Principal'
import { Router, Scene } from 'react-native-router-flux';
import { StatusBar, View, Platform, NativeModules } from 'react-native'
import AdicionarContato from './components/AdicionarContato'
import Conversa from './components/Conversa';
import FormLogin from './components/FormLogin'
import CardStackStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator';

const { StatusBarManager } = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
const IOSNAV = 64+STATUSBAR_HEIGHT
const ANDROIDNAV = 56+STATUSBAR_HEIGHT
const NAVBAR_HEIGHT = Platform.OS === 'ios' ? 54 : ANDROIDNAV;

export default props => (
    <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <Router navigationBarStyle={{ backgroundColor: COLOR_HTML_P, paddingTop: STATUSBAR_HEIGHT, height: NAVBAR_HEIGHT}} titleStyle={{ color: '#fff' }} >
            <Scene key="root" transitionConfig={() => ({
                screenInterpolator: (props) => {
                    switch (props.scene.route.params.direction) {
                        case 'vertical':
                            return CardStackStyleInterpolator.forVertical(props);
                        case 'fade':
                            return CardStackStyleInterpolator.forFade(props);
                        case 'none':
                            return CardStackStyleInterpolator.forInitial
                        case 'horizontal':
                        default:
                            return CardStackStyleInterpolator.forHorizontal(props)
                    }
                }
            })}>
                <Scene key="formLogin" component={FormLogin} hideNavBar title="Login" />
                <Scene key="formCadastro" component={FormCadastro} style={{paddingTop:30}} title="Cadastro"/>
                <Scene key="boasVindas" component={BoasVindas} hideNavBar title="Bem Vindo" />
                <Scene key='principal' component={Principal} hideNavBar title="Principal" direction="vertical"/>
                <Scene key='adicionarContato' component={AdicionarContato} back title="Adicionar Contato" />
                <Scene key='conversa' component={Conversa} title="Conversa" />
                <Scene key='loginv2' component={FormLogin2} hideNavBar title="Bem Vindo" />
            </Scene>
        </Router>
    </View>
)