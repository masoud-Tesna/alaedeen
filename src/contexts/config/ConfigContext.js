import { createContext, useContext, useEffect, useReducer } from "react";

// import Config reducer:
import { ConfigReducer } from './ConfigReducer';

// import Config initial state:
import { ConfigInitialState } from './ConfigInitialState';

import { changeIpAction, changeCountryAction, changeCountryCodeAction, changeLanguageAction, changeClientLanguageAction, changeCurrencyAction } from './ConfigActionCreators';
import axios from "axios";

import LoaderSpinner from '../../layouts/blocks/static_templates/LoadSpinner';
import { useQuery } from "react-query";


// Config Context Create:
const configContext = createContext();

// create Config Context Provide:
function ConfigProvider({ children }) {

  // useReducer For Language use in app
  const [config, configDispatch] = useReducer(
    ConfigReducer,
    ConfigInitialState
  );

  async function getConfigApi() {
    const url = "https://alaedeen.com/horn/config-api";
    const { data } = await axios.get(url);
    return data;
  }

  const { isLoading } =  useQuery('config', getConfigApi, {
    onSuccess: (data) => {
      configDispatch(changeIpAction(data?.ip));
      configDispatch(changeCountryAction(data?.country));
      configDispatch(changeCountryCodeAction(data?.country_code));
      configDispatch(changeClientLanguageAction(data?.client_language));
    }
  });

  useEffect(() => {
    // get language from local storage in client browser:
    const clientLangLocalStorage = window.localStorage.getItem('lang_code');

    // get currency from local storage in client browser:
    const clientCurrencyLocalStorage = window.localStorage.getItem('client_currency');

    // if language client isset: language app isset from local storage
    if (clientLangLocalStorage) {
      configDispatch(changeLanguageAction(clientLangLocalStorage));
    }

    // if currency client isset: currency app isset from local storage
    if (clientLangLocalStorage) {
      configDispatch(changeCurrencyAction(clientCurrencyLocalStorage));
    }
  }, [])

  return (
    <configContext.Provider value={{ config, configDispatch }}>

      {isLoading &&
        <LoaderSpinner spinner={'default'} spinnerColor={'#2e8339'}/>
      }

      {children}
    </configContext.Provider>
  );
}

// get current Config
function useGetConfig() {
  const config = useContext(configContext).config;
  return { config };
}

function useConfigDispatch() {
  const configDispatch = useContext(configContext).configDispatch
  return { configDispatch };
}

export { changeLanguageAction, changeCurrencyAction } from './ConfigActionCreators';

export {
  ConfigProvider,
  useGetConfig,
  useConfigDispatch
};
