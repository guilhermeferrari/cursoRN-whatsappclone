import React, { Component } from 'react';
import { View, Text, ListView, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { modificaMensagem, enviarMensagem } from '../actions/AppActions';
import _ from 'lodash'
import { COLOR_HTML_P, COLOR_HTML_S, borderRADIUS_PADRAO, styles } from './FormLogin';

const btnEnviar = require('../imgs/enviar.png')

class Conversa extends Component {

    _enviarMensagem(){
        const {mensagem, contatoNome, contatoEmail} = this.props
        this.props.enviarMensagem(mensagem, contatoNome, contatoEmail)
    }

    render() {
        return (
            <View style={stylesConversa.viewPrincipal}>
                <View style={stylesConversa.viewChat}></View>
                <View style={stylesConversa.viewEntrada}>
                    <TextInput
                        style={stylesConversa.entrada}
                        value={this.props.mensagem}
                        onChangeText={texto => this.props.modificaMensagem(texto)}
                    />
                    <TouchableOpacity
                        onPress={this._enviarMensagem.bind(this)}
                    >
                        <Image source={btnEnviar} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const stylesConversa = StyleSheet.create({
    viewPrincipal: {
        flex: 1,
        backgroundColor: '#eee4dc',
        padding: 10
    },
    viewChat: {
        flex: 1,
        paddingBottom: 20
    },
    viewEntrada: {
        flexDirection: 'row',
        height: 60
    },
    entrada: {
        paddingLeft: 20,
        paddingRight: 20,
        flex: 4,
        backgroundColor: '#fff',
        fontSize: 18,
        borderRadius: 30
    }
});

const mapStateToProps = state => ({
    mensagem: state.AppReducer.mensagem
})

export default connect(mapStateToProps, { modificaMensagem, enviarMensagem })(Conversa)