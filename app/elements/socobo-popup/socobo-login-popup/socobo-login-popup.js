(function() {
  this.socoboLoginPopup = {
    /**
     * @function: showPopup
     * @params:
     * @description:
     * - show popup
     */
    showPopup: function() {
       this.$.socoboLoginpPopup.toggle();
    },

    /**
     * @function: closePopup
     * @params:
     * @description:
     * - close popup
     */
    closePopup: function() {
      this.$.socoboLoginpPopup.toggle();
    },

    /**
     * @function: loginSubmit
     * @params:
     * @description:
     * - fire form content to backend
     * - shows a toast message to inform the user
     */
    loginSubmit: function(){
      var inputIsValid = false;

      if (this.$.paper_input_password.value.length >= 8) {
        inputIsValid = true;
      }

      if (inputIsValid) {
          this.$.socoboLoginForm.body= JSON.stringify({email: this.email, password: this.password });
        this.$.socoboLoginForm.sendRequest();
        //
        this.fire('login-submitted', {isSubmitted: true});
		    //
        this.$.toast.text = "Login submitted!";
        this.$.toast.show();
      } else {
        this.$.paper_input_password.value = '';

        this.$.toast.text = "Input validation failed!";
        this.$.toast.show();
      }
    },

    /**
     * @function: handleLoginOnResponse
     * @params: e - event
     * @description:
     * - handle response from backend
     * - shows a toast message to inform the user
     * - firing custom event to socobo-app with userData
     */
    handleLoginOnResponse: function(e) {

      this.$.toast.text = "Response entered!";
      this.$.toast.show();

      var statusCode = e.detail.statusCode;

      if (statusCode === 200) {
        var registerData = e.detail.responseData;
        var userName = registerData.userName;
        var pictureUrl = registerData.pictureUrl;

        console.log('Username ' + userName);
        console.log('PictureUrl ' + pictureUrl);

        this.$.paper_input_email.value = '';
        this.$.paper_input_password.value = '';

        this.fire('login-response-ok', {username: userName, pictureurl: pictureUrl});
      } else {
        this.$.paper_input_email.value = '';
        this.$.paper_input_password.value = '';

        this.fire('login-response-failed', {statusCode: statusCode});
      }
    },

    /**
     * @function: handleLoginOnError
     * @params: e - event
     * @description:
     * - handle error from backend
     * - firing custom event to socobo-app
     */
    handleLoginOnError: function(e) {
      var statusCode = e.detail.statusCode;

      this.$.paper_input_email.value = '';
      this.$.paper_input_password.value = '';

      this.fire('login-response-failed', {statusCode: statusCode});
    }
  };
}());
