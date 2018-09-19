import {
    MODIFICA_ADICIONA_CONTATO_EMAIL, ADICIONA_CONTATO_ERRO,
    ADICIONA_CONTATO_SUCESSO,
    VOLTAR_CENA_ADDCONTATO,
    ABRIR_PAG_ADDCONTATO,
    LISTA_CONTATO_USUARIO,
    MODIFICA_MENSAGEM,
    LISTA_CONVERSA_USUARIO,
    ENVIA_MENSAGEM_SUCESSO
} from "./types";
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

    if (email == '') return {
        type: ADICIONA_CONTATO_ERRO,
        payload: 'E-mail invalido'
    }
    return dispatch => {


        let emailB64 = b64.encode(email.toLowerCase())

        firebase.database().ref(`/contatos/${emailB64}`)
            .once('value')
            .then(snapshot => {
                if (snapshot.val()) {
                    //email do contato a ser add
                    const dadosUsuario = _.first(_.values(snapshot.val()))

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

export const contatosUsuarioFetch = () => {
    const { currentUser } = firebase.auth()
    return (dispatch) => {
        let emailUsuarioB64 = b64.encode(currentUser.email)
        firebase.database().ref(`/usuario_contatos/${emailUsuarioB64}`)
            .on("value", snapshot => {
                dispatch({
                    type: LISTA_CONTATO_USUARIO,
                    payload: snapshot.val()
                })
            })
    }
}

export const modificaMensagem = (texto) => {
    return {
        type: MODIFICA_MENSAGEM,
        payload: texto
    }
}

export const enviarMensagem = (mensagem, contatoNome, contatoEmail) => {

    //dados do usuario
    const { currentUser } = firebase.auth()
    const usuarioEmail = currentUser.email

    return dispatch => {

        const usuarioEmailB64 = b64.encode(usuarioEmail)
        const contatoEmailB64 = b64.encode(contatoEmail)

        firebase.database().ref(`/mensagens/${usuarioEmailB64}/${contatoEmailB64}`)
            .push({ mensagem, tipo: 'e' })
            .then(() => {
                firebase.database().ref(`/mensagens/${contatoEmailB64}/${usuarioEmailB64}`)
                    .push({ mensagem, tipo: 'r' })
                    .then(() => dispatch({ type: ENVIA_MENSAGEM_SUCESSO }))
            })
            .then(() => {
                firebase.database().ref(`/usuario_conversas/${usuarioEmailB64}/${contatoEmailB64}`)
                    .set({ nome: contatoNome, email: contatoEmail })
            })
            .then(() => {
                firebase.database().ref(`/contatos/${usuarioEmailB64}`)
                    .once("value")
                    .then(snapshot => {
                        const dadosUsuario = _.first(_.values(snapshot.val()))
                        firebase.database().ref(`/usuario_conversas/${contatoEmailB64}/${usuarioEmailB64}`)
                            .set({ nome: dadosUsuario.nome, email: currentUser.email })
                    })


            })
    }

}

export const conversaUsuarioFetch = contatoEmail => {
    const { currentUser } = firebase.auth()
    let usuarioEmailB64 = b64.encode(currentUser.email)
    let contatoEmailB64 = b64.encode(contatoEmail)
    return dispatch => {
        firebase.database().ref(`/mensagens/${usuarioEmailB64}/${contatoEmailB64}`)
            .on("value", snapshot => {
                dispatch({ type: LISTA_CONVERSA_USUARIO, payload: snapshot.val() })
            })
    }
}
