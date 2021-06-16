import { AUTH_SIGN_IN, CHECK_REMEMBER_ME, AUTH_LOGOUT, AUTH_LOADING, AUTH_LOADING_FALSE } from "./UserActions";


import { fn_set_local_storage, fn_set_local_storage_with_expiry } from "../../functions/Helper";

export function UserReducer(state, action) {
  switch (action.type) {
    case AUTH_SIGN_IN:
      if (action.update_expiration) {
        fn_set_local_storage_with_expiry("user_login", action.user_login, 1);
        fn_set_local_storage_with_expiry("user_password", action.user_password, 1);
      }
      /*fn_set_local_storage("user_login", action.user_login);
      fn_set_local_storage("user_password", action.user_password);*/
      return {
        ...state, auth: action.user_data, load: false
      };
    case AUTH_LOGOUT:
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
      fn_set_local_storage("user_login", action.user_login);
      fn_set_local_storage("user_password", action.user_password);
      fn_set_local_storage("remember_me", 'true');
      return state;
    default:
      return state;
  }
}
