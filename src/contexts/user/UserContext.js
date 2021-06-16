import { createContext, useContext, useEffect, useReducer } from "react";

// import user reducer:
import { UserReducer } from './UserReducer';

// import user initial state:
import { UserInitialState } from './UserInitialState';

import { signInAction, checkRememberAction, logOutAction, checkSignInLoadingAction } from './UserActionCreators';
import axios from "axios";

import LoaderSpinner from '../../layouts/blocks/static_templates/LoadSpinner';
import {
  changeLanguageAction,
  getClientLanguageAction,
  getClientLanguageLoadingAction
} from "../language/LanguageActionCreators";


// User Context Create:
const userContext = createContext();

// create User Context Provide:
export function UserProvider ({ children }) {

  // useReducer For Language use in app
  const [auth, dispatch] = useReducer(
    UserReducer,
    UserInitialState
  );



  useEffect(() => {

    let mounted  = true;

    const clientUserLoginLocalStorage = window.localStorage.getItem('user_login');
    const clientPasswordLocalStorage = window.localStorage.getItem('user_password');
    if (clientUserLoginLocalStorage && clientPasswordLocalStorage) {
      signIn(clientUserLoginLocalStorage, clientPasswordLocalStorage)
        .then(res => {
          dispatch(signInAction(res.data.auth, clientUserLoginLocalStorage, clientPasswordLocalStorage));
        });
      mounted  = false;
      return () => mounted = false;
    }

    return () => mounted = false;
  }, []);

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
export async function signIn(user_login, password) {
  return await axios.post(`https://hornb2b.com/horn/login-api`, { user_login: user_login, password: password });
}

export async function useLogout() {
  const { AuthDispatch } = useDispatchAuthState();
  AuthDispatch(logOutAction);
  window.localStorage.removeItem('user_login');
  window.localStorage.removeItem('user_password');
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

export { signInAction, checkSignInLoadingAction } from './UserActionCreators';