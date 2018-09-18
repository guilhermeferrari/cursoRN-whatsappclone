import React, { Component } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux'
import { modificaAdicionaContatoEmail, adicionaContato } from '../actions/AppActions'
import { styles } from './FormLogin';

class AdicionarContato extends Component {

    renderAdicionarContato() {
        if (!this.props.cadastro_resultado_inclusao) {
            return (
                <View style={{ flex: 1 }}>

                    <View style={stylesAddContact.viewEmailContato}>
                        <TextInput
                            placeholder='E-mail'
                            autoCapitalize="none"
                            style={{ fontSize: 20 }}
                            onChangeText={(texto) => this.props.modificaAdicionaContatoEmail(texto)}
                            value={this.props.adiciona_contato_email}
                        />
                    </View>

                    <View style={stylesAddContact.viewBotaoAdd}>
                        <Button title="Adicionar" color="#115E54"
                            onPress={() => this.props.adicionaContato(this.props.adiciona_contato_email)} />
                    </View>

                    <View style={[styles.viewErro, stylesAddContact.viewErro, { backgroundColor: this.props.error_color }]}>
                        <Text style={styles.txtErro}>{this.props.cadastro_resultado_txt_erro}</Text>
                    </View>

                </View>
            )
        } else {
            return (
                <View style={stylesAddContact.viewContatoAdicionado}>
                    <Text style={stylesAddContact.txtContatoAdicionado}>Contato adicionado com sucesso</Text>
                </View>
            )
        }
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>

                {this.renderAdicionarContato()}

            </View>
        )
    }
}

const stylesAddContact = StyleSheet.create({
    txtContatoAdicionado: {
        fontSize: 20
    },
    viewContatoAdicionado: {

    },
    viewEmailContato: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    viewBotaoAdd: {
        flex: 3,
    },
    viewErro: {
    }
});


const mapStateToProps = state => (
    {
        adiciona_contato_email: state.AppReducer.adiciona_contato_email,
        cadastro_resultado_txt_erro: state.AppReducer.cadastro_resultado_txt_erro,
        error_color: state.AppReducer.error_color,
        cadastro_resultado_inclusao: state.AppReducer.cadastro_resultado_inclusao
    }
)

export default connect(mapStateToProps, {
    modificaAdicionaContatoEmail,
    adicionaContato
})(AdicionarContato)
