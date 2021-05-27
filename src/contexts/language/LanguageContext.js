import { createContext, useContext, useEffect, useReducer } from "react";

// import language reducer:
import { LanguageReducer, getLangApiReducer } from './LanguageReducer';

// import language initial state:
import { LanguageInitialState } from './LanguageInitialState';

import { changeLanguageAction, getClientLanguageAction, getClientLanguageLoadingAction } from './LanguageActionCreators';
import axios from "axios";

import LoaderSpinner from '../../layouts/blocks/static_templates/LoadSpinner';


// Language Context Create:
const languageContext = createContext();

// create Language Context Provide:
function LanguageProvider({ children }) {

  // useReducer For Language use in app
  const [lang, dispatch] = useReducer(
    LanguageReducer,
    LanguageInitialState
  );

  const language = lang.language;

  // useReducer for get client language from API
  const [langItem, dispatchItem] = useReducer(
    getLangApiReducer,
    { items: '', load: false }
  );

  async function getApi(url) {
    return await axios.get(url);
  }

  useEffect(() => {

    let mounted  = true;

    const clientLangLocalStorage = window.localStorage.getItem('client_lang');
    if (clientLangLocalStorage) {
      dispatch(changeLanguageAction(clientLangLocalStorage));
      mounted  = false;
      return () => mounted = false;
    }

      if (mounted) {
        dispatchItem(getClientLanguageLoadingAction());
        getApi('https://hornb2b.com/horn/client-language-api/')
          .then(res => {
            dispatchItem(getClientLanguageAction(res.data.client_language));
            dispatch(changeLanguageAction(res.data.client_language))
          })
      }
    return () => mounted = false;
  }, []);

  return (
    <languageContext.Provider value={{ language, dispatch }}>
      <div className={ `${ langItem.load ? 'd-block' : 'd-none' }` }>
        <LoaderSpinner spinner={'default'} spinnerColor={'#2e8339'}/>
      </div>
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