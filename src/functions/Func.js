function StripHtml(strip) {
  const regex = /(<([^>]+)>)/ig;
  return strip.replace(regex, '');
}
export { StripHtml }