// Initial State:
const clientLangLocalStorage = window.localStorage.getItem('client_lang');

const clientCurrencyLocalStorage = window.localStorage.getItem('client_currency');

if (!clientLangLocalStorage) {
  window.localStorage.setItem("client_lang", "en");
}

if (!clientCurrencyLocalStorage) {
  window.localStorage.setItem("client_currency", "USD");
}

export const ConfigInitialState = {
  ip: null,
  country: null,
  countryCode: null,
  language: clientLangLocalStorage || 'en',
  clientLanguage: null,
  currency: clientCurrencyLocalStorage || 'USD'
}