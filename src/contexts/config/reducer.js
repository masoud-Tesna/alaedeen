import {
  CHANGE_IP,
  CHANGE_COUNTRY,
  CHANGE_COUNTRY_CODE,
  CHANGE_LANGUAGE,
  CHANGE_CLIENT_LANGUAGE,
  CHANGE_CURRENCY
} from "./actions";
import i18n from "../../utilities/i18n";
// import Cookies Package:
import { Cookies } from "react-cookie";

export const reducer = (state, { type, payload }) => {
  const mappedAction = actionMap.get(type);
  return mappedAction ? mappedAction(state, payload) : state;
}

const changeLanguage = (state, payload) => {
  // use Cookies Class:
  const Cookie = new Cookies();
  
  i18n
    .changeLanguage(payload)
    .then(() => {
      Cookie.set("lang_code", payload,
        {
          path: "/",
          //domain: ".alaedeen.com"
        }
      )
    })
    .then(() => {
      document.documentElement.lang = payload;
    });
  
  return {...state, language: payload};
}

const actionMap = new Map([
  
  [CHANGE_IP, (state, payload) => ({...state, ip: payload})],
  
  [CHANGE_COUNTRY, (state, payload) => ({...state, country: payload})],
  
  [CHANGE_COUNTRY_CODE, (state, payload) => ({...state, countryCode: payload})],
  
  [CHANGE_LANGUAGE, changeLanguage],
  
  [CHANGE_CLIENT_LANGUAGE, (state, payload) => ({...state, clientLanguage: payload})],
  
  [CHANGE_CURRENCY, (state, payload) => ({...state, currency: payload})],

]);