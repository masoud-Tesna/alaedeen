import { useLocation } from "react-router-dom";



export function fn_stripHtml(strip) {
  const regex = /(<([^>]+)>)/ig;
  return strip.replace(regex, '');
}

export function __(world, prefix = "", sign = ".") {

  let returnWord = world;

  returnWord = returnWord.toString().trim().toLowerCase()
    .replaceAll(" / ", "_or_")
    .replaceAll("/", "_or_")
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

// get url and add parameter to url or update parameter by new value (no change url! return string new url)
export function appendQueryParameter(key, value) {

  const url = window.location.href;

  let k;

  if(value!==undefined){
    value = encodeURI(value);
  }
  let hashIndex = url.indexOf("#")|0;
  if (hashIndex === -1) hashIndex = url.length|0;
  let urls = url.substring(0, hashIndex).split('?');
  let baseUrl = urls[0];
  let parameters = '';
  let outPara = {};
  if(urls.length>1){
    parameters = urls[1];
  }
  if(parameters!==''){
    parameters = parameters.split('&');
    for(k in parameters){
      let keyVal = parameters[k];
      keyVal = keyVal.split('=');
      let ekey = keyVal[0];
      let evalue = '';
      if(keyVal.length>1){
        evalue = keyVal[1];
      }
      outPara[ekey] = evalue;
    }
  }

  if(value!==undefined){
    outPara[key] = value;
  }else{
    delete outPara[key];
  }
  parameters = [];
  for(let k in outPara){
    parameters.push(k + '=' + outPara[k]);
  }

  let finalUrl = baseUrl;

  if(parameters.length>0){
    finalUrl += '?' + parameters.join('&');
  }

  return finalUrl + url.substring(hashIndex);

}

export const useAppendRouteParameter = (name, value) => {

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const pathName = location.pathname;

  if (queryParams.has(name)) {
    queryParams.delete(name);
    queryParams.set(name, value);
  } else {
    queryParams.set(name, value);
  }

  return pathName+ "?"+ queryParams;

}