import { AUTH_SIGN_IN, CHECK_REMEMBER_ME, AUTH_LOGOUT, AUTH_LOADING } from "./UserActions";

// Actions Creator
export const signInAction = (user_data, user_login, user_password) => {
  return {
    type: AUTH_SIGN_IN,
    user_data: user_data,
    user_login: user_login,
    user_password: user_password
  };
};

export const checkRememberAction = (user_data) => {
  return {
    type: CHECK_REMEMBER_ME,
    payload: user_data
  };
};

export const logOutAction = () => {
  return {
    type: CHECK_REMEMBER_ME
  };
};

export const checkSignInLoadingAction = () => {
  return {
    type: AUTH_LOADING
  };
};