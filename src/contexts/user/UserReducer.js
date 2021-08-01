import { AUTH_LOADING, AUTH_LOADING_FALSE, AUTH_LOGOUT, AUTH_SIGN_IN, CHECK_REMEMBER_ME } from "./UserActions";

import { fn_set_date_day } from "../../functions/Helper";
import { Cookies } from "react-cookie";

export function UserReducer(state, action) {
  // use Cookies Class:
  const Cookie = new Cookies();

  switch (action.type) {
    case AUTH_SIGN_IN:
      if (action.update_expiration) {
        // set user_login cookie:
        Cookie.set("user_login", action.user_login,
          {
            path: "/",
            domain: "localhost",
            expires: fn_set_date_day(1)
          }
        );
        // set user_password cookie:
        Cookie.set("user_password", action.user_password,
          {
            path: "/",
            domain: "localhost",
            expires: fn_set_date_day(1)
          }
        );
      }
      return {
        ...state, auth: action.user_data, load: false
      };
    case AUTH_LOGOUT:
      // remove remember_me cookie:
      Cookie.remove("remember_me");
      // remove user_login cookie:
      Cookie.remove("user_login");
      // remove user_password cookie:
      Cookie.remove("user_password");
      return {
        ...state, auth: [], load: false
      };
    case AUTH_LOADING:
      return {
        ...state, load: true
      };
    case AUTH_LOADING_FALSE:
      return {
        ...state, load: false
      };
    case CHECK_REMEMBER_ME:
      // set remember_me cookie:
      Cookie.set("remember_me", "true",
        {
          path: "/",
          domain: "localhost"
        }
      );
      // set user_login cookie:
      Cookie.set("user_login", action.user_login,
        {
          path: "/",
          domain: "localhost"
        }
      );
      // set user_password cookie:
      Cookie.set("user_password", action.user_password,
        {
          path: "/",
          domain: "localhost"
        }
      );
      return state;
    default:
      return state;
  }
}
