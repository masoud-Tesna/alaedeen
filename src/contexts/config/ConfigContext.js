import { createContext, useContext, useReducer } from "react";

// import Config reducer:
import { reducer } from './reducer';

// import Config initial state:
import { initialState } from './initialState';

import { changeIpAction, changeCountryAction, changeCountryCodeAction, changeClientLanguageAction } from './actionCreators';
import axios from "axios";

import { useQuery } from "react-query";
import { isLoadingAction, useSpinnerDispatch } from "../spiner/SpinnerContext";


// Config Context Create:
const configContext = createContext({});

// create Config Context Provide:
function ConfigProvider({ children }) {

  // spinner dispatch context:
  const { spinnerDispatch } = useSpinnerDispatch();

  // useReducer For Language use in app
  const [config, configDispatch] = useReducer(
    reducer,
    initialState
  );

  async function getConfigApi() {
    // show spinner (spinner context):
    spinnerDispatch(isLoadingAction(true));
    const url = "https://alaedeen.com/horn/config-api";
    const { data } = await axios.get(url);
    return data;
  }

  useQuery('config', getConfigApi, {
    onSuccess: (data) => {
      configDispatch(changeIpAction(data?.ip));
      configDispatch(changeCountryAction(data?.country));
      configDispatch(changeCountryCodeAction(data?.country_code));
      configDispatch(changeClientLanguageAction(data?.client_language));

      // hidden spinner (spinner context):
      spinnerDispatch(isLoadingAction(false));
    },
    refetchOnWindowFocus: false
  });



  return (
    <configContext.Provider value={{ config, configDispatch }}>
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

export { changeLanguageAction, changeCurrencyAction } from './actionCreators';

export {
  ConfigProvider,
  useGetConfig,
  useConfigDispatch
};
