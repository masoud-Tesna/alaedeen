import { AUTH_LOADING, AUTH_LOADING_FALSE, AUTH_LOGOUT, AUTH_SIGN_IN, CHECK_REMEMBER_ME } from "./actions";

import { fn_set_date_day } from "../../utilities/functions/Helper";
import { Cookies } from "react-cookie";
import {
  CHANGE_CLIENT_LANGUAGE,
  CHANGE_COUNTRY,
  CHANGE_COUNTRY_CODE, CHANGE_CURRENCY,
  CHANGE_IP,
  CHANGE_LANGUAGE
} from "../config/actions";

// use Cookies Class:
const Cookie = new Cookies();

export const reducer = (state, action) => {
  const mappedAction = actionMap.get(action.type);
  return mappedAction ? mappedAction(state, action) : state;
}

const signIn = (state, action) => {
  if (action.update_expiration) {
    // add _token cookie:
    Cookie.set("_token", action.token,
      {
        path: "/",
        //domain: ".alaedeen.com",
        expires: fn_set_date_day(1)
      }
    )
  }
  
  return {...state, auth: action?.user_data, load: false};
}

const logOut = (state) => {
  Cookie.remove("_token",
    {
      path: "/",
      //domain: ".alaedeen.com"
    });
  
  return {...state, auth: [], load: false};
}

const rememberMe = (state, action) => {
  Cookie.set("_token", action.token,
    {
      path: "/",
      //domain: ".alaedeen.com"
    }
  );
  
  return state;
}

const actionMap = new Map([
  
  [AUTH_SIGN_IN, signIn],
  
  [AUTH_LOGOUT, logOut],
  
  [AUTH_LOADING, state => ({...state, load: true})],
  
  [AUTH_LOADING_FALSE, state => ({...state, load: false})],
  
  [CHECK_REMEMBER_ME, rememberMe],

]);
