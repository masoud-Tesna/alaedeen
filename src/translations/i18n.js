import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
// import Cookies Package:
import { Cookies } from "react-cookie";

const Cookie = new Cookies();
const url = new URL(window.location.href);

// get language from url & local storage in client browser:
const getLangFromCookie = Cookie.get('lang_code');
const getLangFromUrlParam = url.searchParams.get('lang_code');

// if language in url isset, OR in localstorage isset, OR isset 'fa'
const langCode = getLangFromUrlParam || getLangFromCookie || 'fa';

i18n
  // i18next-http-backend
  // loads translations from your server
  // https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: langCode,
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  })
  .then(() => {

    // if lang_code in url and url lang_code !== lang_code local storage => chang local storage lang_code:
    (getLangFromUrlParam && getLangFromCookie !== getLangFromUrlParam) && Cookie.set("lang_code", getLangFromUrlParam,
      {
        path: "/",
        //domain: ".alaedeen.com"
      }
    );

  })
  .then(() => {

    // if not lang_code in local storage set lang_code:
    !Cookie.get('lang_code') && Cookie.set("lang_code", "fa",
      {
        path: "/",
        //domain: ".alaedeen.com"
      }
    );

  });

export default i18n;