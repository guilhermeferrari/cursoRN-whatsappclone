import { MODIFICA_ADICIONA_CONTATO_EMAIL, ADICIONA_CONTATO_ERRO } from "../actions/types";
import { ERROR_COLOR_PADRAO } from "../components/FormLogin";

const INITIAL_STATE = {
    adiciona_contato_email: '',
    cadastro_resultado_txt_erro: '',
    error_color: 'transparent'
};

export default (state = INITIAL_STATE, action) => {
    console.log(action);
    switch (action.type) {
        case MODIFICA_ADICIONA_CONTATO_EMAIL:
            return { ...state, adiciona_contato_email: action.payload }
        case ADICIONA_CONTATO_ERRO:
            return { ...state, cadastro_resultado_txt_erro: action.payload, error_color: ERROR_COLOR_PADRAO }
        default:
            return state
    }
}