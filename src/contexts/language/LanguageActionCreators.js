import { CHANGE_LANGUAGE, GET_CLIENT_LANGUAGE, GET_CLIENT_LANGUAGE_LOADING } from './LanguageActions';

// Actions Creator
export const changeLanguageAction = (lang) => {
  return {
    type: CHANGE_LANGUAGE,
    payload: lang
  };
};

export const getClientLanguageAction = (lang) => {
  return {
    type: GET_CLIENT_LANGUAGE,
    payload: lang
  };
};

export const getClientLanguageLoadingAction = () => {
  return {
    type: GET_CLIENT_LANGUAGE_LOADING
  };
};