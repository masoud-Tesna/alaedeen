import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";

// import use reducer:
import { UserReducer } from './UserReducer';

// import user initial state:
import { UserInitialState } from './UserInitialState';

// import Action Creator:
import { signInAction, logOutAction, checkSignInLoadingAction, signInLoadingFalseAction } from './UserActionCreators';

// import LoaderSpinner:
import LoaderSpinner from '../../layouts/blocks/static_templates/LoadSpinner';

// import language state:
import { useGetLanguageState } from "../language/LanguageContext";

// import Cookies Package:
import { Cookies } from "react-cookie";


// User Context Create:
const userContext = createContext();

// create User Context Provide:
export function UserProvider ({ children }) {

  // use Cookies Class:
  const Cookie = new Cookies();

  // initial state for language:
  const { language } = useGetLanguageState();

  // useReducer For Language use in app
  const [auth, dispatch] = useReducer(
    UserReducer,
    UserInitialState
  );

  const userLoginCookie = Cookie.get('user_login');
  const userPasswordCookie = Cookie.get('user_password');

  useEffect(() => {

    let mounted  = true;

    if (userLoginCookie && userPasswordCookie) {
      dispatch(checkSignInLoadingAction());
      console.log('start with local storage');
      signIn(userLoginCookie, userPasswordCookie, language)
        .then(res => {
          dispatch(signInAction(res.data.auth, userLoginCookie, userPasswordCookie, false));
        });

    }

    return () => {
      mounted = false;
      dispatch(signInLoadingFalseAction());
    }

  }, [language, userLoginCookie, userPasswordCookie]);


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
  return await axios.post(`https://alaedeen.com/horn/login-api/?lang_code=${language}`, { user_login: user_login, password: password });
}

async function signOutAxios() {
  return await axios.get(`https://alaedeen.com/horn/logout-api/`);
}

export async function logout(dispatch) {
  dispatch(checkSignInLoadingAction());

  signOutAxios()
    .then(() => {
      dispatch(logOutAction());
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
