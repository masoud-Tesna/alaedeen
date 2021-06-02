// import i18n in translations:
import i18n from "../translations";
import { useTranslation } from "react-i18next";

function fn_stripHtml(strip) {
  const regex = /(<([^>]+)>)/ig;
  return strip.replace(regex, '');
}

function __(world, prefix = "", sign = ".") {

  const { t } = useTranslation();

  let returnWord = world;

  // change to string:
  returnWord = returnWord.toString();

  // trim:
  returnWord = returnWord.trim();

  // lower case:
  returnWord = returnWord.toLowerCase();

  // replace:
  returnWord = returnWord.replaceAll("    ", "_");
  returnWord = returnWord.replaceAll("   ", "_");
  returnWord = returnWord.replaceAll("  ", "_");
  returnWord = returnWord.replaceAll(" ", "_");
  returnWord = returnWord.replaceAll(" / ", "_and_");
  returnWord = returnWord.replaceAll("/", "_and_");
  returnWord = returnWord.replaceAll(" & ", "_and_");
  returnWord = returnWord.replaceAll("&", "_and_");
  returnWord = returnWord.replaceAll("(", "");
  returnWord = returnWord.replaceAll(")", "");
  returnWord = returnWord.replaceAll(".", "");
  returnWord = returnWord.replaceAll(",", "");
  returnWord = returnWord.replaceAll("’", "");
  returnWord = returnWord.replaceAll("²", "");
  returnWord = returnWord.replaceAll("%", "");
  returnWord = returnWord.replaceAll(" - ", "_");
  returnWord = returnWord.replaceAll("-", "_");

  returnWord = prefix? `${prefix}${sign}${returnWord}` : returnWord;

  return t(returnWord);

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

function fn_set_local_storage(key, value) {
  window.localStorage.setItem(key, value);
}

export { fn_stripHtml, __, fn_handleLinkClick, fn_set_initial_language, fn_set_local_storage }