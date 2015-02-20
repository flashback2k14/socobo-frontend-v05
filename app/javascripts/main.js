function isAuthTokenAvailable() {
  return getCookie() !== null;
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

/**
 * Workaround
 */
function setUserNameGlobal(value) {
  if (window.userNameGlobal === undefined) window.userNameGlobal = 'username-global';
  else if (window.userNameGlobal !== value) window.userNameGlobal = value;
  else window.userNameGlobal = undefined;
}

function getUserNameGlobal() {
  return window.userNameGlobal ? window.userNameGlobal : undefined;
}

function setEmailAddressGlobal(value) {
  if (window.emailAddressGlobal === undefined) window.emailAddressGlobal = 'username-global@test.com';
  else if (window.emailAddressGlobal !== value) window.emailAddressGlobal = value;
  else window.emailAddressGlobal = undefined;
}

function getEmailAddressGlobal() {
  return window.emailAddressGlobal ? window.emailAddressGlobal : undefined;
}

function setPictureUrlGlobal(value) {
  if (window.pictureUrlGlobal === undefined) window.pictureUrlGlobal = 'images/github.png';
  else if (window.pictureUrlGlobal !== value) window.pictureUrlGlobal = value;
  else window.pictureUrlGlobal = undefined;
}

function getPictureUrlGlobal() {
  return window.pictureUrlGlobal ? window.pictureUrlGlobal : undefined;
}