import React, { Component } from 'react';
import { View, Text, ListView, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { modificaMensagem, enviarMensagem, conversaUsuarioFetch } from '../actions/AppActions';
import _ from 'lodash'
import { COLOR_HTML_P, COLOR_HTML_S, borderRADIUS_PADRAO, styles } from './FormLogin';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const btnEnviar = require('../imgs/enviar.png')

class Conversa extends Component {

    componentWillMount() {
        this.props.conversaUsuarioFetch(this.props.contatoEmail)
        this.criaFonteDeDados(this.props.conversa)
    }

    componentWillReceiveProps(nextProps) {
        this.criaFonteDeDados(nextProps.conversa)
    }

    criaFonteDeDados(conversa) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        })
        this.dataSource = ds.cloneWithRows(conversa)
    }

    _enviarMensagem() {
        const { mensagem, contatoNome, contatoEmail } = this.props
        this.props.enviarMensagem(mensagem, contatoNome, contatoEmail)
    }

    renderRow(texto) {
        if (texto.tipo === 'e') {
            return (
                <View style={stylesConversa.viewMsgEnviada}>
                    <Text style={stylesConversa.txtEnviado}>{texto.mensagem}</Text>
                </View>
            )
        } else {
            return (
                <View style={stylesConversa.viewMsgRecebida}>
                    <Text style={stylesConversa.txtRecebido}>{texto.mensagem}</Text>
                </View>
            )
        }
    }

    render() {
        return (
            <View style={stylesConversa.viewPrincipal}>
                <View style={stylesConversa.viewChat}>
                    <ListView
                        enableEmptySections
                        dataSource={this.dataSource}
                        renderRow={this.renderRow}
                        ref={(ref) => this.scrollView = ref}
                        onContentSizeChange={() => {
                            this.scrollView.scrollToEnd({ animated: false })
                        }}
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
    viewMsgRecebida: {
        alignItems: 'flex-start',
        marginTop: 5,
        marginBottom: 5,
        marginRight: 40
    },
    viewMsgEnviada: {
        alignItems: 'flex-end',
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 40
    },
    txtEnviado: {
        fontSize: 18,
        color: '#000',
        padding: 10,
        backgroundColor: '#dbf5b4',
        //elevation: 30
    },
    txtRecebido: {
        fontSize: 18,
        color: '#000',
        padding: 10,
        backgroundColor: '#F7F7F7',
        //elevation: 30
    },
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