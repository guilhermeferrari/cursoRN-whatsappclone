import React from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux'

export default props => (
    <View style={{ flex: 1, padding: 10 }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 25 }}>WhatsApp Clone</Text>
        </View>
        <View style={{ flex: 2 }}>
            <TextInput style={{ fontSize: 20, height: 45 }} placeholder='E-mail' />
            <TextInput style={{ fontSize: 20, height: 45 }} placeholder='Senha' />
            <TouchableOpacity
                onPress={
                    () => {
                        Actions.formCadastro()
                    }
                }>
                <Text style={{ fontSize: 20 }}>Ainda não tem cadastro? Cadastre-se</Text>
            </TouchableOpacity>
        </View>
        <View style={{ flex: 2 }}>
            <Button title="Acessar" color='#115E54' onPress={() => false} />
        </View>
    </View >
);
