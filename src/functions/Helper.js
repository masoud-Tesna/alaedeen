import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

export function fn_stripHtml(strip) {
  const regex = /(<([^>]+)>)/ig;
  return strip.replace(regex, '');
}

export function __(world, suffix = "", sign = ".") {

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
    .replaceAll("$", "")
    .replaceAll(".", "")
    .replaceAll("'", "")
    .replaceAll(",", "")
    .replaceAll("’", "")
    .replaceAll("²", "")
    .replaceAll("%", "")
    .replaceAll(" - ", "_")
    .replaceAll(" -", "_")
    .replaceAll("- ", "_")
    .replaceAll("-", "_")
    .replaceAll("    ", "_")
    .replaceAll("   ", "_")
    .replaceAll("  ", "_")
    .replaceAll(" ", "_")
  ;

  returnWord = suffix? `${returnWord}${sign}${suffix}` : returnWord;

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

export const SeoGenerator = (
  {
    title,
    description,
    keywords,
    ogImage = "https://alaedeen.com/alaedeen-xs.png",
    canonical,
    children
  }
) => {

  // object for languages link tag:
  const languageLinks = [
    {title: "فارسی", dir: 'rtl', hrefLang: 'x-default', href: window.location.origin + window.location.pathname},
    {title: "English", dir: 'ltr', hrefLang: 'en', href: appendQueryParameter("lang_code", "en")},
    {title: "العربية", dir: 'rtl', hrefLang: 'ar', href: appendQueryParameter("lang_code", "ar")},
    {title: "فارسی", dir: 'rtl', hrefLang: 'fa', href: appendQueryParameter("lang_code", "fa")},
  ];

  return (
    <Helmet
      title={title}
      meta={[
        {
          name: `description`,
          content: description,
        },
        {
          name: `keywords`,
          content: keywords,
        },
        {
          itemprop: `name`,
          content: title,
        },
        {
          itemprop: `description`,
          content: description,
        },
        {
          itemprop: `image`,
          content: ogImage,
        },
        {
          property: `og:url`,
          content: window.location.origin + window.location.pathname,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: description,
        },
        {
          property: `og:image`,
          content: ogImage,
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:domain`,
          content: window.location.host,
        },
        {
          name: `twitter:url`,
          content: window.location.origin + window.location.pathname,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: description,
        },
        {
          name: `twitter:image`,
          content: ogImage,
        },
      ]}
    >
      {children}

      {canonical &&
        <link rel="canonical" href={ canonical } />
      }

      { languageLinks?.map((languageLink, i) => {
        return(
          <link
            key={`langTag_${i}`}
            title = { languageLink.title }
            dir = { languageLink.dir }
            type = "text/html"
            rel = "alternate"
            hrefLang = { languageLink.hrefLang }
            href = { languageLink.href }
          />
        )
      }) }
    </Helmet>
  );
}

export function scrollIntoViewIfTargetNotOnDisplay(target) {
  if (target.getBoundingClientRect().bottom > window.innerHeight) {
    target.scrollIntoView(false);
  }

  if (target.getBoundingClientRect().top < 0) {
    target.scrollIntoView({
      behavior: 'smooth',
      inline: 'nearest',
    });
  }
}

export function scrollTop() {
  window.scroll({ top: 0, behavior: 'smooth' });
}

export function isEven(n) {
  return n % 2 === 0;
}

export function isOdd(n) {
  return Math.abs(n % 2) === 1;
}

export function fn_get_base64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export function fn_discount(price, percent) {
  const discount = (percent / 100) * price;
  return (price - discount);
}

export function fn_after_discount(price, percent) {
  return (percent / 100) * price;
}

/**
 * This function is same as PHP's nl2br() with default parameters.
 *
 * @param {string} str Input text
 * @param {boolean} replaceMode Use replace instead of insert
 * @param {boolean} isXhtml Use XHTML
 * @return {string} Filtered text
 */
export function nl2br (str, replaceMode, isXhtml) {

  let breakTag = (isXhtml) ? '<br />' : '<br>';
  let replaceStr = (replaceMode) ? '$1'+ breakTag : '$1'+ breakTag +'$2';
  return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, replaceStr);
}

export function fn_deadline(min) {
  return Date.now() + min * 60000;
}

export const fn_alternation = (x, y, extra) => {
  return extra ? (x * y) + 1 :  x * y;
}

export const fn_date_to_timestamp = strDate => {
  const datum = Date.parse(strDate);
  return datum / 1000;
}

export const fn_get_lines_count = element => {
  const prevLH = element.style.lineHeight;
  const factor = 1000;
  element.style.lineHeight = factor + 'px';
  
  const height = element.getBoundingClientRect().height;
  element.style.lineHeight = prevLH;
  
  return Math.floor(height / factor);
}

export function countLines(target) {
  let style = window.getComputedStyle(target, null),
    height = parseInt(style.getPropertyValue("height")),
    font_size = parseInt(style.getPropertyValue("font-size")),
    line_height = parseInt(style.getPropertyValue("line-height")),
    box_sizing = style.getPropertyValue("box-sizing");
  
  if(isNaN(line_height)) line_height = font_size * 1.2;
  
  if(box_sizing=='border-box')
  {
    let padding_top = parseInt(style.getPropertyValue("padding-top"));
    let padding_bottom = parseInt(style.getPropertyValue("padding-bottom"));
    let border_top = parseInt(style.getPropertyValue("border-top-width"));
    let border_bottom = parseInt(style.getPropertyValue("border-bottom-width"));
    height = height - padding_top - padding_bottom - border_top - border_bottom
  }
  
  return Math.ceil(height / line_height);
}
