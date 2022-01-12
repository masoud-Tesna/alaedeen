import {
  CHANGE_IP,
  CHANGE_COUNTRY,
  CHANGE_COUNTRY_CODE,
  CHANGE_LANGUAGE,
  CHANGE_CLIENT_LANGUAGE,
  CHANGE_CURRENCY
} from './ConfigActions';

// Actions Creator
export const changeIpAction = (ip) => {
  return {
    type: CHANGE_IP,
    payload: ip
  };
};

export const changeCountryAction = (country) => {
  return {
    type: CHANGE_COUNTRY,
    payload: country
  };
};

export const changeCountryCodeAction = (country_code) => {
  return {
    type: CHANGE_COUNTRY_CODE,
    payload: country_code
  };
};

export const changeLanguageAction = (lang) => {
  return {
    type: CHANGE_LANGUAGE,
    payload: lang
  };
};

export const changeClientLanguageAction = (lang) => {
  return {
    type: CHANGE_CLIENT_LANGUAGE,
    payload: lang
  };
};

export const changeCurrencyAction = (currency) => {
  return {
    type: CHANGE_CURRENCY,
    payload: currency
  };
};