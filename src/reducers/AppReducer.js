import {
    MODIFICA_ADICIONA_CONTATO_EMAIL,
    ADICIONA_CONTATO_ERRO,
    ADICIONA_CONTATO_SUCESSO,
    VOLTAR_CENA_ADDCONTATO, ABRIR_PAG_ADDCONTATO, MODIFICA_MENSAGEM
} from "../actions/types";
import { ERROR_COLOR_PADRAO } from "../components/FormLogin";

const INITIAL_STATE = {
    adiciona_contato_email: '',
    cadastro_resultado_txt_erro: '',
    error_color: 'transparent',
    cadastro_resultado_inclusao: false,
    mensagem: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case MODIFICA_ADICIONA_CONTATO_EMAIL:
            return { ...state, adiciona_contato_email: action.payload }
        case ADICIONA_CONTATO_ERRO:
            return { ...state, cadastro_resultado_txt_erro: action.payload, error_color: ERROR_COLOR_PADRAO }
        case ADICIONA_CONTATO_SUCESSO:
            return { ...state, cadastro_resultado_inclusao: true, adiciona_contato_email: '' }
        case VOLTAR_CENA_ADDCONTATO:
            return { ...state, error_color: 'transparent', cadastro_resultado_txt_erro: '', adiciona_contato_email: '' }
        case ABRIR_PAG_ADDCONTATO:
            return { ...state, cadastro_resultado_inclusao: false }
        case MODIFICA_MENSAGEM:
            return { ...state, mensagem: action.payload }
        default:
            return state
    }
}