import React, { Component } from 'react';
import { View, TextInput, Button, ImageBackground, StyleSheet, Text, Image } from 'react-native';
import { connect } from 'react-redux'
import {
    modificaEmail,
    modificaSenha,
    modificaNome,
    cadastraUsuario
} from '../actions/AutenticacaoActions'
import { styles, PLACEHOLDER_COLOR } from './FormLogin'
import { COLOR_HTML_S, borderRADIUS_PADRAO, COLOR_HTML_P, COLOR_RGBA_P } from './FormLogin'
import { Actions } from 'react-native-router-flux'

export class boasVindas extends Component {
    render() {
        return (
            <ImageBackground style={{ flex: 1, width: null }} source={require('../imgs/bg.png')}>
                <View style={{ flex: 1, padding: 0 }}>
                    <View style={stylesB.view1}>
                        <Image source={require('../imgs/logo.png')} />
                    </View>
                    <View style={stylesB.view2}>
                        <View style={stylesB.txtView}>
                            <Text style={stylesB.txtOla}>Olá {this.props.nome}!</Text>
                            <Text style={stylesB.txtLogin}>Conta criada com sucesso.</Text>
                            <Text style={stylesB.txtLogin}>Faça login para se conectar.</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={stylesB.botaoAcessar}>
                                <Button color='white' title='Fazer Login' onPress={() => Actions.formLogin()} />
                            </View>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        )
    }
}

const mapStateToProps = state => (
    {
        nome: state.AutenticacaoReducer.nome,
        email: state.AutenticacaoReducer.email,
        senha: state.AutenticacaoReducer.senha,
        erroCadastro: state.AutenticacaoReducer.erroCadastro,
        errorColor: state.AutenticacaoReducer.errorColor
    }
)

const stylesB = StyleSheet.create({
    botaoAcessar: {
        height: 42,
        width: 150,
        backgroundColor: COLOR_HTML_S,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: borderRADIUS_PADRAO,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 10
    },
    txtView: {
        flex: 2,
        alignItems: 'center',
        marginTop: 20
    },
    txtOla: {
        paddingBottom: 10,
        fontSize: 40,
        color: 'black',
        fontWeight: '200'
    },
    txtLogin: {
        fontSize: 15,
        color: 'black',
        fontWeight: '400'
    },
    view1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    view2: {
        marginBottom: -15,
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: borderRADIUS_PADRAO
    },
    view3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    viewTemp: {
        paddingLeft: 10,
        flex: 2,
        justifyContent: 'center',
    }
})

export default connect(
    mapStateToProps,
    {
        modificaEmail,
        modificaSenha,
        modificaNome,
        cadastraUsuario
    })(boasVindas)