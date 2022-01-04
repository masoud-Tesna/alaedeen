// Initial State:
import i18n from "../../translations";

const url = new URL(window.location.href);

// get language from url & local storage in client browser:
const getLangFromLocalStorage = window.localStorage.getItem('lang_code');
const getLangFromUrlParam = url.searchParams.get('lang_code');

// if language in url isset, OR in localstorage isset, OR isset 'fa'
const langCode = getLangFromUrlParam || getLangFromLocalStorage || 'fa';

const clientCurrencyLocalStorage = window.localStorage.getItem('client_currency');

i18n
  .changeLanguage(langCode)
  .then(() => {

    // if lang_code in url and url lang_code !== lang_code local storage => chang local storage lang_code:
    (getLangFromUrlParam && getLangFromLocalStorage !== getLangFromUrlParam) && window.localStorage.setItem("lang_code", getLangFromUrlParam);

  })
  .then(() => {

    // if not lang_code in local storage set lang_code:
    !window.localStorage.getItem('lang_code') && window.localStorage.setItem("lang_code", 'fa');

  });

if (!clientCurrencyLocalStorage) {
  window.localStorage.setItem("client_currency", "USD");
}

export const ConfigInitialState = {
  ip: null,
  country: null,
  countryCode: null,
  language: langCode,
  clientLanguage: null,
  currency: clientCurrencyLocalStorage || 'USD',
  loading: true
}