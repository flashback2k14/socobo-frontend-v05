(function() {
  this.socoboLogoutPopup = {
    /**
     * @function: showPopup
     * @params:
     * @description:
     * - show popup
     */
    showPopup: function() {
       this.$.socoboSignupPopup.toggle();
    },

    /**
     * @function: closePopup
     * @params:
     * @description:
     * - close popup
     */
    closePopup: function() {
      this.$.socoboSignupPopup.toggle();
    },

    /**
     * @function: signUpSubmit
     * @params:
     * @description:
     * - user input validation
     * - fire form content to backend
     * - shows a toast message to inform the user
     */
    signUpSubmit: function() {
      var inputIsValid = false;

      if (this.$.paper_input_name.value.length >= 3 &&
          this.$.paper_input_password.value.length >= 8 &&
          this.$.paper_input_password_again.value.length >= 8) {
        if (this.$.paper_input_password.value.match(this.$.paper_input_password_again.value)) {
          inputIsValid = true;
        }
      }

      if (inputIsValid) {
        this.$.socoboSignUpForm.go();
        this.$.toast.text = "Signup submitted!";
        this.$.toast.show();
      } else {
        this.$.paper_input_password.value = '';
        this.$.paper_input_password_again.value = '';

        this.$.toast.text = "Input validation failed!";
        this.$.toast.show();
      }
    },

    /**
     * @function: handleSignupOnResponse
     * @params: e - event
     * @description:
     * - handle response from backend
     * - shows a toast message to inform the user
     * - firing custom event to socobo-app with userData
     */
    handleSignupOnResponse: function(e) {

      this.$.toast.text = "Response entered!";
      this.$.toast.show();

      var statusCode = e.detail.xhr.status;

      if (statusCode === 200) {
        var responseData = e.detail.response;
        console.log('responseData: ' + responseData);

        var username = responseData.userName;
        var name = responseData.name;
        var email = responseData.email;
        var pictureUrl = responseData.pictureUrl;

        console.log('Username ' + username);
        console.log('Name ' + name);
        console.log('Email ' + email);
        console.log('PictureUrl ' + pictureUrl);

        this.$.paper_input_name.value = '';
        this.$.paper_input_email.value = '';
        this.$.paper_input_password.value = '';
        this.$.paper_input_password_again.value = '';

        this.fire('signup-response-ok', {username: username, pictureurl: pictureUrl});
      } else {
        this.$.paper_input_password.value = '';
        this.$.paper_input_password_again.value = '';

        this.fire('signup-response-failed', {statusCode: statusCode});
      }
    },

    /**
     * @function: handleSignupOnError
     * @params: e - event
     * @description:
     * - handle error from backend
     * - firing custom event to socobo-app
     */
    handleSignupOnError: function(e) {

      var statusCode = e.detail.xhr.status;
      console.log('handleSignupOnError: ' + statusCode);

      this.$.paper_input_password.value = '';
      this.$.paper_input_password_again.value = '';

      this.fire('signup-response-failed', {statusCode: statusCode});
    }
  };
}());