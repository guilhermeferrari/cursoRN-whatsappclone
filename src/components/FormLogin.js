import React, { Component } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, ImageBackground, StyleSheet, ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { modificaEmail, modificaSenha, autenticarUsuario } from '../actions/AutenticacaoActions'

export const PLACEHOLDER_COLOR = '#CFD8DC'

export const COLOR_HTML_P = '#00695C' // P para PRIMARY COLOR
export const COLOR_RGBA_P = 'rgba(0,105,92,0.9)'

export const COLOR_HTML_S = '#00BFA5'
export const COLOR_RGBA_S = 'rgba(0,191,165,0.9)'

export const borderRADIUS_PADRAO = 14
export const ERROR_COLOR_PADRAO = '#B00020'
let ERROR_COLOR = 'transparent'

class formLogin extends Component {

    componentWillMount() {
        ERROR_COLOR = this.props.errorColor
    }

    _autenticarUsuario() {
        const { email, senha } = this.props
        this.props.autenticarUsuario({ email, senha })
    }

    renderBtnAcessar() {
        if(this.props.loading_login){
            return (
                <ActivityIndicator size="large"/>
            )
        }
        return (
            <Button title="Acessar" color='white'
                onPress={() => this._autenticarUsuario()} />
        )
    }

    render() {
        return (
            <ImageBackground style={{ flex: 1, width: null }} source={require('../imgs/bg.png')}>
                <View style={{ flex: 1, padding: 5 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 25, color: 'white' }}>WhatsApp Clone</Text>
                    </View>
                    <View style={styles.viewDados}>
                        <View style={styles.viewEmailSenha}>
                            <TextInput value={this.props.email} style={styles.campoEntrada} placeholder='E-mail'
                                onChangeText={texto => this.props.modificaEmail(texto)}
                                placeholderTextColor={PLACEHOLDER_COLOR}
                                autoCapitalize="none" />
                            <TextInput secureTextEntry value={this.props.senha} style={styles.campoEntrada} placeholder='Senha'
                                onChangeText={texto => this.props.modificaSenha(texto)}
                                placeholderTextColor={PLACEHOLDER_COLOR} />
                        </View>
                        <View style={styles.viewCadastrar}>
                            <TouchableOpacity
                                onPress={
                                    () => {
                                        Actions.formCadastro()
                                    }
                                }>
                                <Text style={{ fontSize: 20, color: '#212121' }}>Ainda não tem cadastro? Cadastre-se</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <View style={styles.botaoAcessar}>
                                {this.renderBtnAcessar()}
                        </View>
                    </View>
                    <View style={[styles.viewErro, { backgroundColor: this.props.errorColor }]}>
                        <Text style={styles.txtErro}>{this.props.erroLogin}</Text>
                    </View>
                </View>
            </ImageBackground>
        )
    }
}

export const styles = StyleSheet.create({
    viewErro: {
        marginBottom: -20,
        flex: 2,
        backgroundColor: ERROR_COLOR,
        borderRadius: borderRADIUS_PADRAO
    },
    txtErro: {
        margin: 10,
        color: 'white',
        fontSize: 18
    },
    campoEntrada: {
        fontSize: 20,
        height: 45,
        color: PLACEHOLDER_COLOR
    },
    viewEmailSenha: {
        flex: 1,
        marginTop: 50,
        marginLeft: 10
    },
    viewCadastrar: {
        flex: 1,
        alignItems: 'center',
        marginTop: 20
    },
    viewDados: {
        flex: 2,
        backgroundColor: COLOR_RGBA_P,
        borderRadius: borderRADIUS_PADRAO
    },
    botaoAcessar: {
        marginTop: -21,
        height: 42,
        width: 150,
        backgroundColor: COLOR_HTML_S,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: borderRADIUS_PADRAO
    }
})

const mapStateToProps = state => (
    {
        email: state.AutenticacaoReducer.email,
        senha: state.AutenticacaoReducer.senha,
        errorColor: state.AutenticacaoReducer.errorColor,
        erroLogin: state.AutenticacaoReducer.erroLogin,
        loading_login: state.AutenticacaoReducer.loading_login
    }
)

export default connect(mapStateToProps, { modificaEmail, modificaSenha, autenticarUsuario })(formLogin)
