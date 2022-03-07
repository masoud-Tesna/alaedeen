/////----- Initial State -----/////

// import Cookies Package:
import { Cookies } from "react-cookie";

const Cookie = new Cookies();

const url = new URL(window.location.href);

// get language from url & local storage in client browser:
const getLangFromCookie = Cookie.get('lang_code');
const getLangFromUrlParam = url.searchParams.get('lang_code');

// if language in url isset, OR in localstorage isset, OR isset 'fa'
const langCode = getLangFromUrlParam || getLangFromCookie || 'fa';

const clientCurrencyLocalStorage = window.localStorage.getItem('client_currency');

if (!clientCurrencyLocalStorage) {
  window.localStorage.setItem("client_currency", "USD");
}

export const ConfigInitialState = {
  ip: null,
  country: null,
  countryCode: null,
  language: langCode,
  clientLanguage: null,
  currency: clientCurrencyLocalStorage || 'USD'
}