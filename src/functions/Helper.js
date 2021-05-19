// import i18n in translations:
import i18n from "../translations";

function fn_stripHtml(strip) {
  const regex = /(<([^>]+)>)/ig;
  return strip.replace(regex, '');
}

function fn_handleLinkClick(url, target) {
  return window.open(url, target);
}

function fn_set_initial_language(key, lang) {
  let storageLang;
  // Get from local storage by key
  const item = window.localStorage.getItem(key);
  if (item) {
    storageLang = item;
    i18n.changeLanguage(item);
  } else {
    window.localStorage.setItem(key, lang);
    i18n.changeLanguage(key);
  }
  return storageLang;
}

export { fn_stripHtml, fn_handleLinkClick, fn_set_initial_language }