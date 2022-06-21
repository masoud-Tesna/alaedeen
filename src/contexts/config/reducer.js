import {
  CHANGE_IP,
  CHANGE_COUNTRY,
  CHANGE_COUNTRY_CODE,
  CHANGE_LANGUAGE,
  CHANGE_CLIENT_LANGUAGE,
  CHANGE_CURRENCY
} from "./actions";

export const reducer = (state, { type, payload }) => {
  const mappedAction = actionMap.get(type);
  return mappedAction ? mappedAction(state, payload) : state;
}

const actionMap = new Map([
  
  [CHANGE_IP, (state, payload) => ({...state, ip: payload})],
  
  [CHANGE_COUNTRY, (state, payload) => ({...state, country: payload})],
  
  [CHANGE_COUNTRY_CODE, (state, payload) => ({...state, countryCode: payload})],
  
  [CHANGE_LANGUAGE, (state, payload) => ({...state, language: payload})],
  
  [CHANGE_CLIENT_LANGUAGE, (state, payload) => ({...state, clientLanguage: payload})],
  
  [CHANGE_CURRENCY, (state, payload) => ({...state, currency: payload})],

]);
