import { MODIFICA_ADICIONA_CONTATO_EMAIL, ADICIONA_CONTATO_ERRO } from "./types";
import b64 from 'base-64'
import firebase from 'firebase'

export const modificaAdicionaContatoEmail = texto => {
    return {
        type: MODIFICA_ADICIONA_CONTATO_EMAIL,
        payload: texto
    }
}

export const adicionaContato = email => {

    return dispatch => {
        
        let emailB64 = b64.encode(email.toLowerCase())

        firebase.database().ref(`/contatos/${emailB64}`)
            .once('value')
            .then(snapshot => {
                if (snapshot.val()) {
                    console.log('USUARIO EXISTE');
                } else {
                    dispatch({
                        type: ADICIONA_CONTATO_ERRO,
                        payload: 'E-mail não corresponde a usuário válido.'
                    })
                }
            })
    }
}