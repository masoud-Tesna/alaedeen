import { useLocation } from "react-router-dom";

export function fn_stripHtml(strip) {
  const regex = /(<([^>]+)>)/ig;
  return strip.replace(regex, '');
}

export function __(world, prefix = "", sign = ".") {

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

export function fn_set_date_day(day) {
  const date = new Date();

  date.setTime(date.getTime() + (day*24*60*60*1000));
  return date;
}

export const useParsPathName = () => {
  // Get Location pathName:
  const pathName = useLocation().pathname;
  const pathNameExplode = (pathName.split("/").slice(1));
  return pathNameExplode[0] || 'homePage';
}

// split array for example: $array=[1,2,3,4,5,6,7] splitArray($array, 2) = [[1,2],[3,4],[5,6],[7]] => 2-item arrays in an array :
export const splitArray = (arr, len) => {
  let chunks = [], i = 0, n = arr.length;
  while (i < n) {
    chunks.push(arr.slice(i, i += len));
  }
  return chunks;
}

// partition array for example: $array=[1,2,3,4,5,6,7] splitArray($array, 2) = [[1,2,3,4],[5,6,7]] => Items in two arrays:
export const partitionArray = (list = [], n = 1) => {
  const isPositiveInteger = Number.isSafeInteger(n) && n > 0;
  if (!isPositiveInteger) {
    throw new RangeError('n must be a positive integer');
  }

  const partitions = [];
  const partitionLength = Math.ceil(list.length / n);

  for (let i = 0; i < list.length; i += partitionLength) {
    const partition = list.slice(i, i+partitionLength);
    partitions.push( partition );
  }

  return partitions;
}
