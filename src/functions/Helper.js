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

export function fn_set_date_day (day) {
  const date = new Date();

  date.setTime(date.getTime() + (day*24*60*60*1000));
  return date;
}
