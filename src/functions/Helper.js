function fn_stripHtml(strip) {
  const regex = /(<([^>]+)>)/ig;
  return strip.replace(regex, '');
}

function fn_handleLinkClick(url, target) {
  return window.open(url, target);
}
export { fn_stripHtml, fn_handleLinkClick }