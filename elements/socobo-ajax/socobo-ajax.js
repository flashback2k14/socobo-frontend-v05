(function() {
  this.socoboAjax = {
    /**
     * @variable: authToken
     * @datatype: String
     * @defaultValue: undefined
     * @description:
     * - identify the user
     */
    authToken: '',

    ready: function() {

      document.cookie.split('; ').forEach(function(cookieString) {
        var cookie;
        cookie = cookieString.split("=");

        if ((cookie.length === 2) && (cookie[0] === "authToken")) {
          return window.authToken = cookie[1];
        }
      });

      if (window.authToken !== null) {
        this.authToken = window.authToken;
      } else {
        this.authToken = '';
      }
    },

    sendRequest: function(){
      this.$.socoboAjax.go();
      this.fire('socobo-ajax-send-request');
    },

    socoboAjaxResponse: function(e) {
      var statusCode = e.detail.xhr.status;

      if (statusCode === 200) {
        var responseData = e.detail.response;
        this.fire('socobo-ajax-response-ok', {statusCode: statusCode, responseData: responseData});
      } else {
        this.fire('socobo-ajax-response-failed', {statusCode: statusCode});
      }
    },

    socoboAjaxError: function(e) {
      var statusCode = e.detail.xhr.status;
      this.fire('socobo-ajax-response-failed', {statusCode: statusCode});
    }
  };
}());