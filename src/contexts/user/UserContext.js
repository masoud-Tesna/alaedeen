import { createContext, useContext, useEffect, useReducer } from "react";

// import user reducer:
import { UserReducer } from './UserReducer';

// import user initial state:
import { UserInitialState } from './UserInitialState';

import { signInAction, logOutAction, checkSignInLoadingAction, signInLoadingFalseAction } from './UserActionCreators';
import axios from "axios";

import LoaderSpinner from '../../layouts/blocks/static_templates/LoadSpinner';
import { fn_get_local_storage_with_expiry } from "../../functions/Helper";
import { useGetLanguageState } from "../language/LanguageContext";

// User Context Create:
const userContext = createContext();

// create User Context Provide:
export function UserProvider ({ children }) {

  // initial state for language:
  const { language } = useGetLanguageState();

  // useReducer For Language use in app
  const [auth, dispatch] = useReducer(
    UserReducer,
    UserInitialState
  );

  useEffect(() => {

    let mounted  = true;

    const checkRememberMe = localStorage.getItem('remember_me');

    let clientUserLoginLocalStorage,
        clientPasswordLocalStorage;

    if (checkRememberMe) {
      clientUserLoginLocalStorage = localStorage.getItem('user_login');
      clientPasswordLocalStorage = localStorage.getItem('user_password');
    }else {
      clientUserLoginLocalStorage = fn_get_local_storage_with_expiry('user_login');
      clientPasswordLocalStorage = fn_get_local_storage_with_expiry('user_password');
    }

    if (clientUserLoginLocalStorage && clientPasswordLocalStorage) {
      dispatch(checkSignInLoadingAction());
      signIn(clientUserLoginLocalStorage, clientPasswordLocalStorage, language)
        .then(res => {
          dispatch(signInAction(res.data.auth, clientUserLoginLocalStorage, clientPasswordLocalStorage, false));
        });
      mounted  = false;
      return () => mounted = false;
    }else {
      dispatch(signInLoadingFalseAction());
    }

    return () => mounted = false;
  }, [language]);

  return (
    <userContext.Provider value={{ auth, dispatch }}>
      <div className={ `${ auth.load ? 'd-block' : 'd-none' }` }>
        <LoaderSpinner spinner={'default'} spinnerColor={'#2e8339'}/>
      </div>
      {children}
    </userContext.Provider>
  );
}

// function for sign in:
export async function signIn(user_login, password, language) {
  return await axios.post(`https://hornb2b.com/horn/login-api/?lang_code=${language}`, { user_login: user_login, password: password });
}

async function signOutAxios() {
  return await axios.get(`https://hornb2b.com/horn/logout-api/`);
}

export async function logout(dispatch) {
  dispatch(checkSignInLoadingAction());

  signOutAxios()
    .then(res => {
      dispatch(logOutAction());
      window.localStorage.removeItem('user_login');
      window.localStorage.removeItem('user_password');
      window.localStorage.removeItem('remember_me');
    });

}

// get current user data
export function useGetAuthState() {
  const user_data = useContext(userContext).auth;
  return { user_data };
}

export function useDispatchAuthState() {
  const AuthDispatch = useContext(userContext).dispatch;
  return { AuthDispatch };
}

export { signInAction, checkSignInLoadingAction, checkRememberAction } from './UserActionCreators';