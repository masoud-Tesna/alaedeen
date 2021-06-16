import i18n from "../translations";

export function fn_stripHtml (strip) {
  const regex = /(<([^>]+)>)/ig;
  return strip.replace(regex, '');
}

export function __ (world, prefix = "", sign = ".") {

  let returnWord = world;

  returnWord = returnWord.toString().trim().toLowerCase()
    .replaceAll(" / ", "_and_")
    .replaceAll("/", "_and_")
    .replaceAll(" & ", "_and_")
    .replaceAll("&", "_and_")
    .replaceAll("(", "")
    .replaceAll(")", "")
    .replaceAll("?", "")
    .replaceAll("!", "")
    .replaceAll(".", "")
    .replaceAll("'", "")
    .replaceAll(",", "")
    .replaceAll("’", "")
    .replaceAll("²", "")
    .replaceAll("%", "")
    .replaceAll("    ", "_")
    .replaceAll("   ", "_")
    .replaceAll("  ", "_")
    .replaceAll(" ", "_")
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

export function fn_set_local_storage_with_expiry(key, value, ttl) {
  const now = new Date();

  const setTime = ttl*60*60*1000;

  // `item` is an object which contains the original value
  // as well as the time when it's supposed to expire
  const item = {
    value: value,
    expiry: now.getTime() + setTime,
  }
  localStorage.setItem(key, JSON.stringify(item))
}

export function fn_get_local_storage_with_expiry(key) {
  const itemStr = localStorage.getItem(key)
  // if the item doesn't exist, return null
  if (!itemStr) {
    return null
  }
  const item = JSON.parse(itemStr)
  const now = new Date()
  // compare the expiry time of the item with the current time
  if (now.getTime() > item.expiry) {
    // If the item is expired, delete the item from storage
    // and return null
    localStorage.removeItem(key)
    return null
  }
  return item.value
}
