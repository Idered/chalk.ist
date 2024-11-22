export function svgToFilterUrl(svgString: string, filterId = "myFilter") {
  const cleanSvg = svgString.replace(/\s+/g, " ").trim();
  const base64 = btoa(cleanSvg);
  return `url("data:image/svg+xml;base64,${base64}#${filterId}")`;
}
