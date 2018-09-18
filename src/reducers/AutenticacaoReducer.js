import { ERROR_COLOR_PADRAO } from '../components/FormLogin'
import {
    MODIFICA_EMAIL,
    MODIFICA_SENHA,
    MODIFICA_NOME,
    CADASTRO_USUARIO_SUCESSO,
    CADASTRO_USUARIO_ERRO,
    LOGIN_USUARIO_SUCESSO,
    LOGIN_USUARIO_ERRO,
    LOGIN_EM_ANDAMENTO,
    CADASTRO_EM_ANDAMENTO
} from '../actions/types'

const INITIAL_STATE = {
    nome: '',
    email: 'guilherme@g.com',
    senha: 'azeazeaze',
    erroCadastro: '',
    errorColor: 'transparent',
    erroLogin: '',
    loading_login: false,
    loading_cadastro: false
}

export default (state = INITIAL_STATE, action) => {
    // switch(action.type){
    //     case 'modifica_email':
    // }
    switch (action.type) {
        case MODIFICA_EMAIL:
            return { ...state, email: action.payload }
        case MODIFICA_SENHA:
            return { ...state, senha: action.payload }
        case MODIFICA_NOME:
            return { ...state, nome: action.payload }
        case CADASTRO_USUARIO_ERRO:
            return { ...state, erroCadastro: action.payload, errorColor: ERROR_COLOR_PADRAO, loading_cadastro: false }
        case CADASTRO_USUARIO_SUCESSO:
            return { ...state, senha: '', errorColor: 'transparent', erroCadastro: '', loading_cadastro: false }
        case LOGIN_USUARIO_ERRO:
            return { ...state, erroLogin: action.payload, errorColor: ERROR_COLOR_PADRAO, loading_login: false }
        case LOGIN_USUARIO_SUCESSO:
            return { ...state, erroLogin: '', errorColor: 'transparent', loading_login: false }
        case LOGIN_EM_ANDAMENTO:
            return { ...state, loading_login: true }
        case CADASTRO_EM_ANDAMENTO:
            return { ...state, loading_cadastro: true }
        default:
            return state
    }

}