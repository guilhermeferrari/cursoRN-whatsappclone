import React from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { modificaEmail, modificaSenha } from '../actions/AutenticacaoActions'

export const PLACEHOLDER_COLOR = '#CFD8DC'

const COLOR_HTML_P = '#00695C' // P para PRIMARY COLOR
const COLOR_RGBA_P = 'rgba(0,105,92,0.9)'

const COLOR_HTML_S = '#00BFA5'
const COLOR_RGBA_S = 'rgba(0,191,165,0.9)'

const borderRADIUS_PADRAO = 14

const formLogin = props => (
    <ImageBackground style={{ flex: 1, width: null }} source={require('../imgs/bg.png')}>
        <View style={{ flex: 1, padding: 5 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 25, color: 'white' }}>WhatsApp Clone</Text>
            </View>
            <View style={styles.viewDados}>
                <View style={styles.viewEmailSenha}>
                    <TextInput value={props.email} style={styles.campoEntrada} placeholder='E-mail'
                        onChangeText={texto => props.modificaEmail(texto)}
                        placeholderTextColor={PLACEHOLDER_COLOR} />
                    <TextInput secureTextEntry value={props.senha} style={styles.campoEntrada} placeholder='Senha'
                        onChangeText={texto => props.modificaSenha(texto)}
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
            <View style={{ flex: 2, alignItems: 'center' }}>
                <View style={styles.botaoAcessar}>
                    <Button title="Acessar" color='white' onPress={() => false} />
                </View>
            </View>
        </View>
    </ImageBackground>
)

export const styles = StyleSheet.create({
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
        senha: state.AutenticacaoReducer.senha
    }
)

export default connect(mapStateToProps, { modificaEmail, modificaSenha })(formLogin)
