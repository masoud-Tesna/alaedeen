import { CHANGE_IP, CHANGE_COUNTRY, CHANGE_COUNTRY_CODE, CHANGE_LANGUAGE, CHANGE_CLIENT_LANGUAGE, CHANGE_CURRENCY } from "./ConfigActions";
import i18n from "../../translations";

export function ConfigReducer(state, action) {
  switch (action.type) {
    case CHANGE_IP:
      return {
        ...state, ip: action.payload
      };

    case CHANGE_COUNTRY:
      return {
        ...state, country: action.payload
      };

    case CHANGE_COUNTRY_CODE:
      return {
        ...state, countryCode: action.payload
      };

    case CHANGE_LANGUAGE:
      i18n
        .changeLanguage(action.payload)
        .then(() => {
          window.localStorage.setItem("lang_code", action.payload);
        })
        .then(() => {
          document.documentElement.lang = action.payload;
        });
      return {
        ...state, language: action.payload
      };

    case CHANGE_CLIENT_LANGUAGE:
      return {
        ...state, clientLanguage: action.payload
      };

    case CHANGE_CURRENCY:
      window.localStorage.setItem("client_currency", action.payload);
      return {
        ...state, currency: action.payload
      };

    default:
      return state;
  }
}