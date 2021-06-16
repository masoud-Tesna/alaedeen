import { AUTH_SIGN_IN, CHECK_REMEMBER_ME, AUTH_LOGOUT, AUTH_LOADING } from "./UserActions";


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
        ...state, user_data: action.user_data, load: false
      };
    case AUTH_LOGOUT:
      return {
        ...state, user_data: [], load: false
      };
    case AUTH_LOADING:
      return {
        ...state, load: true
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
