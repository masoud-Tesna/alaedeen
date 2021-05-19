import { createContext, useContext, useReducer } from "react";

// import language actions and action creator:
import { CHANGE_LANGUAGE } from './LanguageActions';

// import custom hooks:
import { useLocalStorage } from '../../functions';

// import i18n in translations:
import i18n from "../../translations";

// Initial State:
const InitialLanguageState = {
  language: useLocalStorage("lang", "en")
};

// Language Context Create:
const languageContext = createContext();

// create Language Context Provide:
function LanguageProvider({ children }) {
  const [language, setLanguage] = useReducer(
    useLanguageReducer,
    InitialLanguageState
  );
  return (
    <languageContext.Provider value={{ language, setLanguage }}>
      {children}
    </languageContext.Provider>
  );
}

// get language context and show...
function useLanguageState() {
  return useContext(languageContext);
}

function useLanguageReducer(state, action) {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      i18n
        .changeLanguage(action.payload)
        .then(() => {
          useLocalStorage("lang", action.payload);
        });
      return {
        language: action.payload
      };
    default:
      return state;
  }
}

export { changeLanguageAction } from './LanguageActionCreators';

export {
  LanguageProvider,
  useLanguageState,
  useLanguageReducer
};