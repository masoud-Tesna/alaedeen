import { CHANGE_LANGUAGE } from './LanguageActions';

// Actions Creator
export const changeLanguageAction = (lang) => {
  return {
    type: CHANGE_LANGUAGE,
    payload: lang
  };
};