import React, { Component } from 'react';
import { View, TextInput, StatusBar, Button, ImageBackground, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux'
import {
	modificaEmail,
	modificaSenha,
	modificaNome,
	cadastraUsuario
} from '../actions/AutenticacaoActions'
import { styles, PLACEHOLDER_COLOR, COLOR_HTML_P } from './FormLogin'

class formCadastro extends Component {

	_cadastraUsuario() {
		/* const nome = this.props.nome;
		const email = this.props.email;
		const senha = this.props.senha; */
		//ou 
		const { nome, email, senha } = this.props;
		this.props.cadastraUsuario({ nome, email, senha });
	}

	renderBtnCadastro() {
		if (this.props.loading_cadastro) {
			return (
				<ActivityIndicator size="large" />
			)
		}
		return (
			/* <Button title="Cadastrar"
				color="white"
				onPress={() => this._cadastraUsuario()} /> */
				<Text>     CADASTRAR     </Text>)
	}

	render() {
		//<StatusBar backgroundColor={COLOR_HTML_P} translucent={false}/>
		return (
			<ImageBackground style={{ flex: 1 }} source={require('../imgs/bg.png')}>
				
				<View style={{ flex: 1, padding: 5}}>
					<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
						<Text style={{ fontSize: 25, color: 'white' }}></Text>
					</View>
					<View style={[styles.viewDados, stylesC.viewTemp]}>
						<TextInput value={this.props.nome}
							placeholder="Nome"
							style={styles.campoEntrada}
							onChangeText={texto => this.props.modificaNome(texto)}
							placeholderTextColor={PLACEHOLDER_COLOR}
							autoCapitalize='words' />
						<TextInput value={this.props.email}
							placeholder="E-mail"
							style={styles.campoEntrada}
							onChangeText={texto => this.props.modificaEmail(texto)}
							placeholderTextColor={PLACEHOLDER_COLOR}
							autoCapitalize='none' />
						<TextInput secureTextEntry value={this.props.senha}
							placeholder="Senha"
							style={styles.campoEntrada}
							onChangeText={texto => this.props.modificaSenha(texto)}
							placeholderTextColor={PLACEHOLDER_COLOR} />
					</View>
					<View style={{ flex: 1, alignItems: 'center' }}>
						<View style={styles.botaoAcessar}>
							{this.renderBtnCadastro()}
						</View>
					</View>
					<View style={[styles.viewErro, { backgroundColor: this.props.errorColor }]}>
						<Text style={styles.txtErro}>{this.props.erroCadastro}</Text>
					</View>
				</View>
			</ImageBackground>
		)
	}
}

const mapStateToProps = state => (
	{
		nome: state.AutenticacaoReducer.nome,
		email: state.AutenticacaoReducer.email,
		senha: state.AutenticacaoReducer.senha,
		erroCadastro: state.AutenticacaoReducer.erroCadastro,
		errorColor: state.AutenticacaoReducer.errorColor,
		loading_cadastro: state.AutenticacaoReducer.loading_cadastro
	}
)

const stylesC = StyleSheet.create({
	viewTemp: {
		paddingLeft: 10,
		flex: 2,
		justifyContent: 'center',
	}
})

export default connect(
	mapStateToProps,
	{
		modificaEmail,
		modificaSenha,
		modificaNome,
		cadastraUsuario
	})(formCadastro)