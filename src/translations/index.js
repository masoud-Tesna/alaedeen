import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// import Language Variables File:
import en from "./locales/en";
import fa from "./locales/fa";
import ar from "./locales/ar";

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: en
  },
  fa: {
    translation: fa
  },
  ar: {
    translation: ar
  }
};

i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });


export default i18n;
