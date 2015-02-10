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

    /**
     * @variable: url
     * @datatype: String
     * @defaultValue: undefined
     * @description:
     * - api url
     */
    url: '',

    /**
     * @variable: method
     * @datatype: String
     * @defaultValue: undefined
     * @description:
     * - http request
     */
    method: '',

    /**
     * @variable: params
     * @datatype: String
     * @defaultValue: undefined
     * @description:
     * - form data
     */
    params: '',

    /**
     * DEFAULT POLYMER
     */
    /**
     * @function: ready
     * @params:
     * @description:
     * - default polymer function
     * - is called after component is fully loaded
     * - get the authToken from cookie
     */
    ready: function() {
      if (!isAuthTokenAvailable()) {
        setCookie();
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
        window.authToken = responseData.authToken;
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