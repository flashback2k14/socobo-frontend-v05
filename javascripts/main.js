function isAuthTokenAvailable() {
  return (getCookie() !== null);
}

function setCookie() {
  window.authToken = getCookieFromDOM();
}

function getCookie() {
  return window.authToken;
}

function getCookieFromDOM() {
  var name = "authToken=";
  var ca = document.cookie.split(';');
  if(ca.length > 0) {
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1);
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
  }
  return "";
}