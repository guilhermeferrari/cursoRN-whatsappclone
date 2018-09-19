import React, { Component } from 'react';
import { View, Text, ListView, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { contatosUsuarioFetch } from '../actions/AppActions';
import _ from 'lodash'
import { COLOR_HTML_P, COLOR_HTML_S, borderRADIUS_PADRAO } from './FormLogin';
import { Actions } from 'react-native-router-flux'


class Contatos extends Component {

    componentWillMount() {
        this.props.contatosUsuarioFetch()
        this.criaFonteDeDados(this.props.contatos)
    }

    componentWillReceiveProps(nextProps) {
        this.criaFonteDeDados(nextProps.contatos)
    }

    criaFonteDeDados(contatos) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
        this.fonteDeDados = ds.cloneWithRows(contatos)
    }

    renderRow(contato) {
        return (
            <TouchableOpacity
                onPress={() => Actions.conversa({contatoNome: contato.nome, contatoEmail: contato.email, title: contato.nome})}
            >
                <View style={stylesContatos.viewContato}>
                    <Text style={stylesContatos.txtNome}>{contato.nome}</Text>
                    <Text style={stylesContatos.email}>{contato.email}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        
        return (
            // <View style={stylesContatos.viewPrincipal}>
            <ListView
                enableEmptySections
                dataSource={this.fonteDeDados}
                renderRow={data => this.renderRow(data)}
            />
            // </View>
        )
    }
}

const stylesContatos = StyleSheet.create({
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
    viewContato: {
        flex: 1,
        padding: 20,
        borderBottomWidth: 1,
        borderColor: '#CCC'
    }
});

const mapStateToProps = state => {
    const contatos = _.map(state.ListaContatosReducer, (val, uid) => {
        return { ...val, uid }
    })
    return (
        {
            contatos
        }
    )
}

export default connect(mapStateToProps, { contatosUsuarioFetch })(Contatos)