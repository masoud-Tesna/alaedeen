// Initial State:
const clientLangLocalStorage = window.localStorage.getItem('client_lang');

if (!clientLangLocalStorage) {
  window.localStorage.setItem("client_lang", "en");
}

export const ConfigInitialState = {
  ip: null,
  country: null,
  countryCode: null,
  language: clientLangLocalStorage || 'en',
  clientLanguage: null,
  currency: 'USD'
}