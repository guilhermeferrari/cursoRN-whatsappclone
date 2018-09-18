import React from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux'
import { modificaAdicionaContatoEmail, adicionaContato } from '../actions/AppActions'
import { styles } from './FormLogin';

const AdicionarContato = props => (
    <View style={{ flex: 1, justifyContent: 'center' }}>

        <View style={stylesAddContact.viewEmailContato}>
            <TextInput
                placeholder='E-mail'
                autoCapitalize="none"
                style={{ fontSize: 20 }}
                onChangeText={(texto) => props.modificaAdicionaContatoEmail(texto)}
                value={props.adiciona_contato_email}
            />
        </View>

        <View style={stylesAddContact.viewBotaoAdd}>
            <Button title="Adicionar" color="#115E54"
                onPress={() => props.adicionaContato(props.adiciona_contato_email)} />
        </View>

        <View style={[styles.viewErro, stylesAddContact.viewErro, {backgroundColor: props.error_color}]}>
            <Text style={styles.txtErro}>{props.cadastro_resultado_txt_erro}</Text>
        </View>

    </View>
);

const stylesAddContact = StyleSheet.create({
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
        error_color: state.AppReducer.error_color
    }
)

export default connect(mapStateToProps, {
    modificaAdicionaContatoEmail,
    adicionaContato
})(AdicionarContato)