export function setCookie(cname, cvalue, exdays = 100) {
  const da = new Date();
  da.setTime(da.getTime() + (exdays * 24 * 60 * 60 * 1000));
  const expires = 'expires=' + da.toUTCString();
  document.cookie = cname + '=' + cvalue + '; ' + expires;
}

export function getCookie(cname) {
  const name = cname + '=';
  const ca = document.cookie.split(';');
  for (let index = 0; index < ca.length; index++) {
    let cookie = ca[index];
    while (cookie.charAt(0) === ' ') cookie = cookie.substring(1);
    if (cookie.indexOf(name) === 0) return cookie.substring(name.length, cookie.length);
  }
  return '';
}
