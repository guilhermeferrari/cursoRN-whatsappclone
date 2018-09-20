import React, { Component } from 'react';
import { View, Text, ListView, StyleSheet, TouchableOpacity } from 'react-native';
import { conversasUsuario } from '../actions/AppActions';
import _ from 'lodash'
import { connect } from 'react-redux'
import { COLOR_HTML_P, COLOR_HTML_S, borderRADIUS_PADRAO } from './FormLogin';
import { Actions } from 'react-native-router-flux'

class Conversas extends Component {


    /* ___ TESTES SEM O BD ___ */
    // 1. Em Principal:
    // 1.1. Comentar todas as linhas que sao relacionadas a essa cena (Conversas)
    //      na declaraçao do states. Nesse caso comentar { key: '2', title: 'Contatos' }
    // 1.2. Em _renderScene seguir mesma ideia de 1.1
    //
    // 2. Em Conversas (essa cena):
    // 2.1. Em componentwillmount comentar chamadas relacionadas às Actions
    // 2.2. Em mapStateToProps comentar seçao abaixo do bloco de teste e descomentar o bloco de teste
    //
    // 3. Add tag initial no routes
    //
    // Uma alternativa é criar um método que faça login automaticamente ao abrir o app.
    // Por ser assincrono não consegui de cara ===> Tentar depois do curso

    /* ___ FIM TESTES ___ */

    componentWillMount(props) {
        this.props.conversasUsuario()
        this.criaFonteDeDados(this.props.conversas)
    }

    componentWillReceiveProps(nextProps) {
        this.criaFonteDeDados(nextProps.conversas)
    }

    criaFonteDeDados(conversas) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        })
        this.dataSource = ds.cloneWithRows(conversas)
        console.log("datasource: ", this.dataSource);
    }

    renderRow(conversa) {
        return (
            <TouchableOpacity
                onPress={() => Actions.conversa({contatoNome: conversa.nome, contatoEmail: conversa.email, title: conversa.nome})}
            >
                <View style={stylesConversas.viewConversas}>
                    <Text style={stylesConversas.txtNome}>{conversa.nome}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <ListView
                enableEmptySections
                dataSource={this.dataSource}
                renderRow={data => this.renderRow(data)}
            />
        )
    }
}

const stylesConversas = StyleSheet.create({
    txtNome: {
        fontSize: 25
    },
    txtEmail: {
        fontSize: 18
    },
    viewPrincipal: {
        flex: 1,
        backgroundColor: COLOR_HTML_S
    },
    viewConversas: {
        flex: 1,
        padding: 20,
        borderBottomWidth: 1,
        borderColor: '#CCC'
    }
});

const conversasTeste = [
    { email: "joao@g.com", nome: "Joao", uid: "am9hb0BnLmNvbQ==" },
    { email: "jorge@g.com", nome: "Jorge", uid: "am9yZ2VAZy5jb20=" }]

const mapStateToProps = state => {
    // --- INICIO BLOCO DE TESTES
/* 
    const conversas = conversasTeste
    console.log(conversas);
    return ({
        conversas
    })
 */
    // --- FIM BLOCO DE TESTES


    const conversas = _.map(state.ListaConversasReducer, (val, uid) => {
        return { ...val, uid }
    })
    return ({
        conversas,
    })
}

export default connect(mapStateToProps, { conversasUsuario })(Conversas)