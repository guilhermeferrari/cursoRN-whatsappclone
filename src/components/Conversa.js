import React, { Component } from 'react';
import { View, Text, ListView, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { modificaMensagem, enviarMensagem, conversaUsuarioFetch } from '../actions/AppActions';
import _ from 'lodash'
import { COLOR_HTML_P, COLOR_HTML_S, borderRADIUS_PADRAO, styles } from './FormLogin';

const btnEnviar = require('../imgs/enviar.png')

class Conversa extends Component {

    componentWillMount() {
        this.props.conversaUsuarioFetch(this.props.contatoEmail)
        this.criaFonteDeDados(this.props.conversa)
    }

    componentWillReceiveProps(nextProps){
        this.criaFonteDeDados(nextProps.conversa)
    }

    _enviarMensagem() {
        const { mensagem, contatoNome, contatoEmail } = this.props
        this.props.enviarMensagem(mensagem, contatoNome, contatoEmail)
    }

    criaFonteDeDados(conversa) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        })
        this.dataSource = ds.cloneWithRows(conversa)
    }

    renderRow(texto){
        return(
            <View>
                <Text>{texto.mensagem}</Text>
                <Text>{texto.tipo}</Text>
            </View>
        )
    }

    render() {
        return (
            <View style={stylesConversa.viewPrincipal}>
                <View style={stylesConversa.viewChat}>
                    <ListView
                        enableEmptySections
                        dataSource={this.dataSource}
                        renderRow={this.renderRow}
                    />
                </View>
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

const mapStateToProps = state => {
    const conversa = _.map(state.ListaConversaReducer, (val, uid) => {
        return { ...val, uid }
    })
    return ({
        conversa,
        mensagem: state.AppReducer.mensagem
    })
}

export default connect(mapStateToProps, { modificaMensagem, enviarMensagem, conversaUsuarioFetch })(Conversa)