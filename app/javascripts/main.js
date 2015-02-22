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
  if (window.userNameGlobal === undefined || window.userNameGlobal === '') {
    window.userNameGlobal = 'username-global';
  } else {
    window.userNameGlobal = value;
  }
}

function getUserNameGlobal() {
  return window.userNameGlobal;
}

function setEmailAddressGlobal(value) {
  if (window.emailAddressGlobal === undefined || window.emailAddressGlobal === '') {
    window.emailAddressGlobal = 'username-global@test.com';
  } else {
    window.emailAddressGlobal = value;
  }
}

function getEmailAddressGlobal() {
  return window.emailAddressGlobal;
}

function setPictureUrlGlobal(value) {
  if (window.pictureUrlGlobal === undefined || window.pictureUrlGlobal === '') {
    window.pictureUrlGlobal = 'images/github.png';
  } else {
    window.pictureUrlGlobal = value;
  }
}

function getPictureUrlGlobal() {
  return window.pictureUrlGlobal;
}