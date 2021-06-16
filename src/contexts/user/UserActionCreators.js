import { AUTH_SIGN_IN, CHECK_REMEMBER_ME, AUTH_LOGOUT, AUTH_LOADING, AUTH_LOADING_FALSE } from "./UserActions";

// Actions Creator
export const signInAction = (user_data, user_login, user_password, update_expiration = true) => {
  return {
    type: AUTH_SIGN_IN,
    user_data: user_data,
    user_login: user_login,
    user_password: user_password,
    update_expiration: update_expiration
  };
};

export const checkRememberAction = (user_login, user_password) => {
  return {
    type: CHECK_REMEMBER_ME,
    user_login: user_login,
    user_password: user_password
  };
};

export const logOutAction = () => {
  return {
    type: AUTH_LOGOUT
  };
};

export const checkSignInLoadingAction = () => {
  return {
    type: AUTH_LOADING
  };
};

export const signInLoadingFalseAction = () => {
  return {
    type: AUTH_LOADING_FALSE
  };
};
