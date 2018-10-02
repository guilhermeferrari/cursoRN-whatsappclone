import React, { Component } from 'react';
import {
    View, Platform,
    StatusBar, Text, TextInput,
    TouchableOpacity, ImageBackground,
    StyleSheet, ActivityIndicator,
    TouchableNativeFeedback
} from 'react-native';
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { modificaEmail, modificaSenha, autenticarUsuario } from '../actions/AutenticacaoActions'
import { Container, Header, Content, Button } from 'native-base';
import { Fonts } from '../../Fonts'

export const PLACEHOLDER_COLOR = '#CFD8DC'

export const COLOR_HTML_P = '#00695C' // P para PRIMARY COLOR
export const COLOR_RGBA_P = 'rgba(0,105,92,0.9)'

export const COLOR_HTML_S = '#00BFA5'
export const COLOR_RGBA_S = 'rgba(0,191,165,0.9)'

export const borderRADIUS_PADRAO = 14
export const ERROR_COLOR_PADRAO = '#B00020'
let ERROR_COLOR = 'transparent'
let COR_BOTAO_ACESSAR = COLOR_HTML_S
class formLogin_beta extends Component {

    componentWillMount() {
        ERROR_COLOR = this.props.errorColor
    }

    _autenticarUsuario() {
        const { email, senha } = this.props
        this.props.autenticarUsuario({ email, senha })
    }

    renderBtnAcessar() {
        if (this.props.loading_login) {
            return (
                <ActivityIndicator size="large" />
            )
        }
        return (
            <Text style={styles.txtBotao}>            ACESSAR            </Text>
        )
    }

    mudaCor() {
        styles.botaoAcessar.backgroundColor = COLOR_HTML_P
        alert(styles.botaoAcessar.backgroundColor)
    }

    renderBotaoAcessarView() {
        if (Platform.OS == 'android') {
            return (
                <Button rounded style={styles.botaoAcessar}>
                    {this.renderBtnAcessar()}
                </Button>
                /* <TouchableNativeFeedback
                    style={{ borderRadius: borderRADIUS_PADRAO, borderWidth:20,borderColor:'black' }}
                    ref={(ref) => this.touchableNativeFeedback = ref}
                    background={TouchableNativeFeedback.Ripple('red', false)}
                    //useForeground
                    onPress={
                        () => {
                            //this._autenticarUsuario()
                            this.mudaCor()
                        }
                    }>
                    <View style={styles.botaoAcessar}>
                        {this.renderBtnAcessar()}
                    </View>
                </TouchableNativeFeedback> */
            )
        }
        else {
            return (
                <TouchableOpacity
                    ref={(ref) => this.touchableOpacity = ref}
                    onPressIn={
                        () => {
                            this.touchableOpacity.setOpacityTo(0.2, 0.1)
                        }
                    }
                    onPress={
                        () => {
                            //this._autenticarUsuario()

                            this.mudaCor()
                        }
                    }
                //activeOpacity={0.9}
                >
                    <View style={styles.botaoAcessar}>
                        {this.renderBtnAcessar()}
                    </View>
                </TouchableOpacity>
            )
        }
    }

    render() {
        return (
            <ImageBackground style={{ flex: 1, width: null }} source={require('../imgs/bg.png')}>
                <StatusBar backgroundColor='transparent' translucent />
                <View style={{ flex: 1, padding: 5 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.txtTitulo}>WhatsApp Clone</Text>
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
                                <Text style={styles.txtCadastro}>Ainda não tem cadastro? Cadastre-se</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <View>
                            <Button rounded style={styles.botaoAcessar}>
                                {this.renderBtnAcessar()}
                            </Button>
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
        color: PLACEHOLDER_COLOR, 
        fontFamily: Fonts.ProductSans
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
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0,0,0, .4)',
                shadowOffset: { height: 1, width: 1 },
                shadowOpacity: 1,
                shadowRadius: 1,
            },
            android: {
                elevation: 2,
            },
        }),
        marginTop: -21,
        backgroundColor: COR_BOTAO_ACESSAR,
        justifyContent: 'center',
        alignItems: 'center',

        //borderRadius: borderRADIUS_PADRAO
    },
    txtBotao: {
        color: 'white',
        fontWeight: '900',
        fontFamily: Fonts.ProductSansBold
    },
    txtCadastro: {
        fontSize: 20,
        color: '#212121',
        fontFamily: Fonts.ProductSans
    },
    txtTitulo: {
        fontSize: 25,
        color: 'white',
        fontFamily: Fonts.ProductSans
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

export default connect(mapStateToProps, { modificaEmail, modificaSenha, autenticarUsuario })(formLogin_beta)
