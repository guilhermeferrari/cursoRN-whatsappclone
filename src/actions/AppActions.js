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
    firebase.auth().signInWithEmailAndPassword('guilherme@g.com', 'azeazeaze')
    return dispatch => {


        let emailB64 = b64.encode(email.toLowerCase())

        firebase.database().ref(`/contatos/${emailB64}`)
            .once('value')
            .then(snapshot => {
                if (snapshot.val()) {
                    //email do contato a ser add

                    //email do usuario conectado
                    const { currentUser } = firebase.auth()
                    let emailUsuarioB64 = b64.encode(currentUser.email)

                    firebase.database().ref(`/usuario_contatos/${emailUsuarioB64}`)
                        .push({ email: email, nome: 'Nome do contato' })
                        .then(() => console.log("sucesso"))
                        .catch((erro) => console.log(erro))
                } else {
                    dispatch({
                        type: ADICIONA_CONTATO_ERRO,
                        payload: 'E-mail não corresponde a usuário válido.'
                    })
                }
            })
    }
}