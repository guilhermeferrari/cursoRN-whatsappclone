import {ERROR_COLOR_PADRAO} from '../components/FormLogin'

const INITIAL_STATE = {
    nome: '',
    email: '',
    senha: '',
    erroCadastro: '',
    errorColor: 'transparent'
}

export default (state = INITIAL_STATE, action) => {
    // switch(action.type){
    //     case 'modifica_email':
    // }
    if(action.type == 'modifica_email'){
        return {...state, email: action.payload}
    }
    if(action.type == 'modifica_senha'){
        return {...state, senha: action.payload}
    }
    if(action.type == 'modifica_nome'){
        return {...state, nome: action.payload}
    }
    if(action.type == 'cadastro_usuario_erro') {
        return{ ...state, erroCadastro: action.payload, errorColor: ERROR_COLOR_PADRAO}
    }
    if(action.type == 'cadastro_usuario_sucesso'){
        return{ ...state, senha:'', errorColor:'transparent', erroCadastro: '' }
    }
    return state
}