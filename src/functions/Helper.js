import i18n from "../translations";

export function fn_stripHtml (strip) {
  const regex = /(<([^>]+)>)/ig;
  return strip.replace(regex, '');
}

export function __ (world, prefix = "", sign = ".") {

  let returnWord = world;

  returnWord = returnWord.toString().trim().toLowerCase()
    .replaceAll("    ", "_")
    .replaceAll("   ", "_")
    .replaceAll("  ", "_")
    .replaceAll(" ", "_")
    .replaceAll(" / ", "_and_")
    .replaceAll("/", "_and_")
    .replaceAll(" & ", "_and_")
    .replaceAll("&", "_and_")
    .replaceAll("(", "")
    .replaceAll(")", "")
    .replaceAll("?", "")
    .replaceAll("!", "")
    .replaceAll(".", "")
    .replaceAll(",", "")
    .replaceAll("’", "")
    .replaceAll("²", "")
    .replaceAll("%", "")
    .replaceAll(" - ", "_")
    .replaceAll("-", "_");

  returnWord = prefix? `${prefix}${sign}${returnWord}` : returnWord;

  return returnWord;

}

export function fn_handleLinkClick (url, target) {
  return window.open(url, target);
}

export function fn_set_initial_language (key, lang) {
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

export function fn_set_local_storage (key, value) {
  window.localStorage.setItem(key, value);
}
