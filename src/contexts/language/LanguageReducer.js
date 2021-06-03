import { CHANGE_LANGUAGE, GET_CLIENT_LANGUAGE, GET_CLIENT_LANGUAGE_LOADING } from "./LanguageActions";
import i18n from "../../translations";
import { fn_set_local_storage } from "../../functions/Helper";

export function LanguageReducer(state, action) {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      i18n
        .changeLanguage(action.payload)
        .then(() => {
          fn_set_local_storage("client_lang", action.payload);
        })
        .then(() => {
          document.documentElement.lang = action.payload;
        });
      return {
        language: action.payload
      };
    default:
      return state;
  }
}

export function getLangApiReducer (state, action) {
  switch (action.type) {
    case GET_CLIENT_LANGUAGE_LOADING:
      return {
        ...state, load: true
      };
    case GET_CLIENT_LANGUAGE:
      fn_set_local_storage("client_lang", action.payload);
      return {
        items: action.payload,
        load: false
      };
    default:
      return state;
  }
}