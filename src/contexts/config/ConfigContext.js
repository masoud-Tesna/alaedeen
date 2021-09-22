import { createContext, useContext, useEffect, useReducer } from "react";

// import Config reducer:
import { ConfigReducer } from './ConfigReducer';

// import Config initial state:
import { ConfigInitialState } from './ConfigInitialState';

import { changeIpAction, changeCountryAction, changeCountryCodeAction, changeClientLanguageAction } from './ConfigActionCreators';
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

  const { isLoading, data, status } =  useQuery('config', getConfigApi);

  useEffect(() => {

    if (status && data) {
      configDispatch(changeIpAction(data?.ip));
      configDispatch(changeCountryAction(data?.country));
      configDispatch(changeCountryCodeAction(data?.country_code));
      configDispatch(changeClientLanguageAction(data?.client_language));
    }

  }, [status]);

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

export { changeLanguageAction } from './ConfigActionCreators';

export {
  ConfigProvider,
  useGetConfig,
  useConfigDispatch
};
