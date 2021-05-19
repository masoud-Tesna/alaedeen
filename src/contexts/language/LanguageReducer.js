import { CHANGE_LANGUAGE } from "./LanguageActions";
import i18n from "../../translations";
import { fn_set_local_storage } from "../../functions/Helper";

export function LanguageReducer(state, action) {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      i18n
        .changeLanguage(action.payload)
        .then(() => {
          fn_set_local_storage("lang", action.payload);
        });
      return {
        language: action.payload
      };
    default:
      return state;
  }
}