export default function baseUrl(url) {
  if (url.charAt(0) === "/") url = url.substring(1);
  return `${process.env.assetPrefix ?? "/"}${url}`;
}

export function image(url) {
  return baseUrl(`images/${url}`)
}
