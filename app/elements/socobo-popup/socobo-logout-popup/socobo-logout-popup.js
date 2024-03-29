(function() {
  this.socoboLogoutPopup = {
    /**
     * @function: showPopup
     * @params:
     * @description:
     * - show popup
     */
    showPopup: function() {
       this.$.socoboLogoutPopup.toggle();
    },

    /**
     * @function: closePopup
     * @params:
     * @description:
     * - close popup
     */
    closePopup: function() {
      this.$.socoboLogoutPopup.toggle();
    },

    /**
     * @function: logoutUser
     * @params:
     * @description:
     * - fire form content to backend
     * - shows a toast message to inform the user
     */
    logoutUser: function() {
      this.$.socoboLogoutForm.sendRequest();
      this.$.toast.text = "Logout submitted!";
      this.$.toast.show();
    },

    /**
     * @function: handleLogutOnResponse
     * @params: e - event
     * @description:
     * - handle response from backend
     * - shows a toast message to inform the user
     * - firing custom event to socobo-app with cleared authToken
     */
    handleLogutOnResponse: function(e) {
      this.$.toast.text = "Response entered!";
      this.$.toast.show();

      var statusCode = e.detail.statusCode;
      if (statusCode === 200) {
        this.fire('logout-response-ok', {statusCode: statusCode});
      } else {
        this.fire('logout-response-failed', {statusCode: statusCode});
      }
    },

    /**
     * @function: handleLogutOnError
     * @params: e - event
     * @description:
     * - handle error from backend
     * - firing custom event to socobo-app
     */
    handleLogutOnError: function(e) {
      var statusCode = e.detail.statusCode;
      this.fire('logout-response-failed', {statusCode: statusCode});
    }
  };
}());