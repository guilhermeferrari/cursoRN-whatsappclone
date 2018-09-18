import { MODIFICA_ADICIONA_CONTATO_EMAIL, ADICIONA_CONTATO_ERRO, ADICIONA_CONTATO_SUCESSO, VOLTAR_CENA_ADDCONTATO, ABRIR_PAG_ADDCONTATO } from "./types";
import b64 from 'base-64'
import firebase from 'firebase'
import _ from 'lodash'

export const abrirAddContato = () => {
    return {
        type: ABRIR_PAG_ADDCONTATO
    }
}

export const voltarCena = () => {
    return {
        type: VOLTAR_CENA_ADDCONTATO
    }
}

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
                    const dadosUsuario = _.first(_.values(snapshot.val()))
                    console.log(dadosUsuario);

                    //email do usuario conectado
                    const { currentUser } = firebase.auth()
                    let emailUsuarioB64 = b64.encode(currentUser.email)

                    firebase.database().ref(`/usuario_contatos/${emailUsuarioB64}`)
                        .push({ email: email, nome: dadosUsuario.nome })
                        .then(() => adicionaContatoSucesso(dispatch))
                        .catch((erro) => adicionaContatoErro(erro.message, dispatch))
                } else {
                    dispatch({
                        type: ADICIONA_CONTATO_ERRO,
                        payload: 'E-mail não corresponde a usuário válido.'
                    })
                }
            })
    }
}

const adicionaContatoErro = (erro, dispatch) => (
    dispatch({
        type: ADICIONA_CONTATO_ERRO,
        payload: erro
    })
)

const adicionaContatoSucesso = (dispatch) => (
    dispatch({
        type: ADICIONA_CONTATO_SUCESSO
    })
)