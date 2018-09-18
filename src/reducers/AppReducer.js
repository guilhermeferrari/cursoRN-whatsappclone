import { MODIFICA_ADICIONA_CONTATO_EMAIL, ADICIONA_CONTATO_ERRO, ADICIONA_CONTATO_SUCESSO, VOLTAR_CENA_ADDCONTATO, ABRIR_PAG_ADDCONTATO } from "../actions/types";
import { ERROR_COLOR_PADRAO } from "../components/FormLogin";

const INITIAL_STATE = {
    adiciona_contato_email: '',
    cadastro_resultado_txt_erro: '',
    error_color: 'transparent',
    cadastro_resultado_inclusao: false
};

export default (state = INITIAL_STATE, action) => {
    console.log(action);
    switch (action.type) {
        case MODIFICA_ADICIONA_CONTATO_EMAIL:
            return { ...state, adiciona_contato_email: action.payload }
        case ADICIONA_CONTATO_ERRO:
            return { ...state, cadastro_resultado_txt_erro: action.payload, error_color: ERROR_COLOR_PADRAO }
        case ADICIONA_CONTATO_SUCESSO:
            return { ...state, cadastro_resultado_inclusao: true }
        case VOLTAR_CENA_ADDCONTATO:
            const { error_color, cadastro_resultado_txt_erro, adiciona_contato_email } = ''
            return { ...state, error_color, cadastro_resultado_txt_erro, adiciona_contato_email }
        case ABRIR_PAG_ADDCONTATO:
            return { ...state, cadastro_resultado_inclusao: false}
        default:
            return state
    }
}