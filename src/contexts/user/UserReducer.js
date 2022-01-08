import { AUTH_LOADING, AUTH_LOADING_FALSE, AUTH_LOGOUT, AUTH_SIGN_IN, CHECK_REMEMBER_ME } from "./UserActions";

import { fn_set_date_day } from "../../functions/Helper";
import { Cookies } from "react-cookie";

export function UserReducer(state, action) {
  // use Cookies Class:
  const Cookie = new Cookies();

  switch (action.type) {
    case AUTH_SIGN_IN:
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
      return {
        ...state, auth: action?.user_data, load: false
      };
    case AUTH_LOGOUT:

      // remove _token cookie:
      Cookie.remove("_token",
        {
          path: "/",
          //domain: ".alaedeen.com"
        });

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
      // set _token cookie:
      Cookie.set("_token", action.token,
        {
          path: "/",
          //domain: ".alaedeen.com"
        }
      );
      return state;
    default:
      return state;
  }
}
