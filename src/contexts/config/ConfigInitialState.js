// Initial State:


// get language from url or local storage in client browser:
const getLangFromLocalStorage = window.localStorage.getItem('lang_code');
const url = new URL(window.location.href);
const getLangFromUrlParam = url.searchParams.get('lang_code');

// if language in url isset, in localstorage isset, else isset 'en
const langCode = getLangFromUrlParam || getLangFromLocalStorage || 'en';

const clientCurrencyLocalStorage = window.localStorage.getItem('client_currency');

// if lang_code in url and url Lang code !== lang_code local storage => chang local storage lang_code:
if (getLangFromUrlParam && getLangFromLocalStorage !== getLangFromUrlParam) {

  window.localStorage.setItem("lang_code", getLangFromUrlParam);

}

// if not lang code in local storage set lang_code:
if (!getLangFromLocalStorage) {

  window.localStorage.setItem("lang_code", 'en');

}


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