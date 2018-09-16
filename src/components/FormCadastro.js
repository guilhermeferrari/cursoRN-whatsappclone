import React from 'react';
import { View, TextInput, Button, ImageBackground, StyleSheet,Text } from 'react-native';
import { connect } from 'react-redux'
import { modificaEmail, modificaSenha, modificaNome } from '../actions/AutenticacaoActions'
import { styles, PLACEHOLDER_COLOR } from './FormLogin'

const formCadastro = props => (
    <ImageBackground style={{ flex: 1, width: null }} source={require('../imgs/bg.png')}>
        <View style={{ flex: 1, padding: 5 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 25, color: 'white' }}>Seus dados</Text>
            </View>
            <View style={[styles.viewDados, stylesC.viewTemp]}>
                <TextInput value={props.nome} placeholder="Nome" style={styles.campoEntrada}
                    onChangeText={texto => props.modificaNome(texto)}
                    placeholderTextColor={PLACEHOLDER_COLOR} />
                <TextInput value={props.email} placeholder="E-mail" style={styles.campoEntrada}
                    onChangeText={texto => props.modificaEmail(texto)}
                    placeholderTextColor={PLACEHOLDER_COLOR} />
                <TextInput secureTextEntry value={props.senha} placeholder="Senha" style={styles.campoEntrada}
                    onChangeText={texto => props.modificaSenha(texto)}
                    placeholderTextColor={PLACEHOLDER_COLOR} />
            </View>
            <View style={{ flex: 2, alignItems: 'center' }}>
                <View style={styles.botaoAcessar}>
                    <Button title="Cadastrar" color="white" onPress={() => false} />
                </View>
            </View>
        </View>
    </ImageBackground>
);

const mapStateToProps = state => (
    {
        nome: state.AutenticacaoReducer.nome,
        email: state.AutenticacaoReducer.email,
        senha: state.AutenticacaoReducer.senha
    }
)

const stylesC = StyleSheet.create({
    viewTemp: {
        paddingLeft: 10,
        flex: 2,
        justifyContent: 'center',
    }
})

export default connect(mapStateToProps, { modificaEmail, modificaSenha, modificaNome })(formCadastro)