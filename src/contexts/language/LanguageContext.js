import { createContext, useContext, useReducer } from "react";

// import custom hooks:
import { fn_set_initial_language, fn_set_local_storage } from '../../functions/Helper';

// import language actions and action creator:
import { CHANGE_LANGUAGE } from './LanguageActions';

// import i18n in translations:
import i18n from "../../translations";



// Initial State:
const InitialLanguageState = {
  language: fn_set_initial_language("lang", "en")
};

// Language Context Create:
const languageContext = createContext(undefined);

// create Language Context Provide:
function LanguageProvider({ children }) {
  const [lang, dispatch] = useReducer(
    useLanguageReducer,
    InitialLanguageState
  );

  const language = lang.language;

  return (
    <languageContext.Provider value={{ language, dispatch }}>
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
          fn_set_local_storage("lang", action.payload);
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