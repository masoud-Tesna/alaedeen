import { AUTH_SIGN_IN, CHECK_REMEMBER_ME, AUTH_LOGOUT, AUTH_LOADING } from "./UserActions";


import { fn_set_local_storage } from "../../functions/Helper";

export function UserReducer(state, action) {
  switch (action.type) {
    case AUTH_SIGN_IN:
      fn_set_local_storage("user_login", action.user_login);
      fn_set_local_storage("user_password", action.user_password);
      return {
        ...state, user_data: action.user_data, load: false
      };
    case AUTH_LOGOUT:
      return {
        user_data: []
      };
    case AUTH_LOADING:
      return {
        ...state, load: true
      };
    case CHECK_REMEMBER_ME:
      fn_set_local_storage("user_login", action.payload);
      return {
        items: action.payload,
        load: false
      };
    default:
      return state;
  }
}
