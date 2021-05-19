import { createContext, useContext, useReducer } from "react";

// import language reducer:
import { LanguageReducer } from './LanguageReducer';

// import language initial state:
import { LanguageInitialState } from './LanguageInitialState';

// Language Context Create:
const languageContext = createContext(undefined);

// create Language Context Provide:
function LanguageProvider({ children }) {
  const [lang, dispatch] = useReducer(
    LanguageReducer,
    LanguageInitialState
  );

  const language = lang.language;

  return (
    <languageContext.Provider value={{ language, dispatch }}>
      {children}
    </languageContext.Provider>
  );
}

// get current language
function useGetLanguageState() {
  const language = useContext(languageContext).language
  return { language };
}

function useDispatchLanguageState() {
  const languageDispatch = useContext(languageContext).dispatch
  return { languageDispatch };
}

export { changeLanguageAction } from './LanguageActionCreators';

export {
  LanguageProvider,
  useGetLanguageState,
  useDispatchLanguageState
};