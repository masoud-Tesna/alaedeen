import { createContext, useContext, useEffect, useReducer, useState } from "react";

// import user reducer:
import { UserReducer } from './UserReducer';

// import user initial state:
import { UserInitialState } from './UserInitialState';

import { signInAction, logOutAction, checkSignInLoadingAction, signInLoadingFalseAction } from './UserActionCreators';
import axios from "axios";

import LoaderSpinner from '../../layouts/blocks/static_templates/LoadSpinner';
import { fn_get_local_storage_with_expiry, fn_set_local_storage } from "../../functions/Helper";
import { useGetLanguageState } from "../language/LanguageContext";
import { getUserLoginFromHornDomain } from "../../functions/accessExternalLocalStorage";


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

  const [getUserLoginStatusHorn, setGetUserLoginStatusHorn] = useState("loading");

  useEffect(() => {

    console.log('start');

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
      console.log('start with local storage');
      signIn(clientUserLoginLocalStorage, clientPasswordLocalStorage, language)
        .then(res => {
          dispatch(signInAction(res.data.auth, clientUserLoginLocalStorage, clientPasswordLocalStorage, false));
        });

    }else {

      getUserLoginFromHornDomain.get('remember_me', function (rememberMeError, rememberMe) { // get remember_me from hornb2b domain local storage
        if (rememberMe) { // if remember_me is true:
          fn_set_local_storage("remember_me", 'true'); // set remember_me in to local storage
          //setGetUserLoginStatusHorn('get remember_me'); // set userLogin status
        }

        getUserLoginFromHornDomain.get('user_login', function (userLoginError, userLogin) { // get user_login from hornb2b domain local storage
          if (userLogin) {

            fn_set_local_storage("user_login", userLogin); // set user_login in to local storage
            //setGetUserLoginStatusHorn('get user_login'); // set userLogin status

            getUserLoginFromHornDomain.get('user_password', function (userPasswordError, userPassword) { // get user_password from hornb2b domain local storage
              if (userPassword) {

                fn_set_local_storage("user_password", userPassword); // set user_password in to local storage
                setGetUserLoginStatusHorn('get user_password'); // set userLogin status

              }
            });

          }
        });

      });

    }

    return () => {
      mounted = false;
      dispatch(signInLoadingFalseAction());
    }

  }, [language, getUserLoginStatusHorn]);


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
    .then(() => {
      dispatch(logOutAction());
      window.localStorage.removeItem('user_login');
      window.localStorage.removeItem('user_password');
      window.localStorage.removeItem('remember_me');
    })
    .then(() => {
      getUserLoginFromHornDomain.remove('user_login', function(userLoginErrorRemove, userLoginRemove) {
        getUserLoginFromHornDomain.remove('user_password', function(userPasswordErrorRemove, userPasswordRemove) {
          getUserLoginFromHornDomain.remove('remember_me', function(rememberMeErrorRemove, rememberMeRemove) {
            // foo is now removed
          });
        });
      });
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