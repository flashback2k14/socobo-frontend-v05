(function() {

  this.socoboApp = {
    /**
     * PROPERTIES
     */
    /**
     * @variable: userName
     * @datatype: String
     * @defaultValue: 'username'
     * @description:
     * - it's self-describing
     */
    userName: '',

    /**
     * @variable: emailAddress
     * @datatype: String
     * @defaultValue: 'user@gmail.com'
     * @description:
     * - it's self-describing
     */
    emailAddress: '',

    /**
     * @variable: userPictureUrl
     * @datatype: String
     * @defaultValue: 'images/github.png'
     * @description:
     * - it's self-describing
     * - ! changing for production
     */
    userPictureUrl: '',

    /**
     * @variable: DEFAULT_ROUTE
     * @datatype: String
     * @defaultValue: 'home'
     * @description:
     * - default navigation start point in menu
     */
    DEFAULT_ROUTE: 'home',

    /**
     * @variable: pages
     * @datatype: array
     * @defaultValue: object w/ parameter name, icon, hash
     * @description:
     * - set the navigation menu
     * - name: visual Name for menu item
     * - icon: icon for menu item
     * - hash: used for navigation
     */
    pages: [
      {name: 'Home', icon: 'home', hash: 'home'},
      {name: 'My Profile', icon: 'account-circle', hash: 'myprofile'},
      {name: 'My Fridge', icon: 'dashboard', hash: 'myfridge'},
      {name: 'My Recipes', icon: 'assignment', hash: 'myrecipes'},
      {name: 'Report a Bug', icon: 'bug-report', hash: 'bugreport'},
      {name: 'About', icon: 'info', hash: 'about'}
    ],

    /**
     * DEFAULT POLYMER
     */
    /**
     * @function: created
     * @params:
     * @description:
     * - default polymer function
     * - is called after an instance of the element is created
     * - get the authToken from cookie
     */
    created: function() {
      if (isAuthTokenAvailable()){
        setCookie();
      } else {
        setCookie();
      }
    },

    /**
     * @function: ready
     * @params:
     * @description:
     * - default polymer function
     * - is called after component is fully prepared
     * - sets the route for navigation
     */
    ready: function() {
      this.route = this.route || this.DEFAULT_ROUTE;
      this.setDefaultUserToGlobal();
      this.setGlobalUserToUi();
    },

    /**
     * SIGNUP
     */
    /**
     * @function: showPopupSignup
     * @params:
     * @description:
     * - show Signup Form as popup window
     */
    showPopupSignup: function() {
      this.$.socoboSignupPopup.showPopup();
    },

    /**
     * @function: signupOk
     * @params: e - event
     * @description:
     * - is called from socobo-signup if the signup was successfully
     * - sets the Username and Profile picture to the local variable
     * - sets the Username and Profile picture to the Toolbar
     * - redirects to socobo-home
     */
    signupOk: function(e) {
      this.setUserToGlobal(e);
      this.setGlobalUserToUi();

      this.$.socoboSignupPopup.closePopup();

      this.route = 'home';
    },

    /**
     * @function: signupFailed
     * @params:
     * @description:
     * - is called from socobo-signup if the signup failed
     * - sets the Username and Profile picture to the Toolbar
     * - shows a toast message to inform the user
     * - ? redirects to socobo-signup (maybe unnecessary)
     */
    signupFailed: function(e) {
      var statusCode = e.detail.statusCode;
      this.$.toast.text = 'Signup failed! Statuscode: ' + statusCode;
      this.$.toast.show();
    },

    /**
     * LOGIN
     */
    /**
     * @function: showPopupLogin
     * @params:
     * @description:
     * - show Login Form as popup window
     */
    showPopupLogin: function() {
      this.$.socoboLoginPopup.showPopup();
    },

    /**
     * @function: loginOk
     * @params: e - event
     * @description:
     * - is called from socobo-login if the login was successfully
     * - sets the authToken to the local variable
     * - redirects to socobo-home
     * - sets authToken
     */
    loginOk: function(e) {
      this.setUserToGlobal(e);
      this.setGlobalUserToUi();

      this.$.socoboLoginPopup.closePopup();

      this.route = 'home';
    },

    /**
     * @function: loginFailed
     * @params: e - event
     * @description:
     * - is called from socobo-login if the login failed
     * - shows a toast message to inform the user
     */
    loginFailed: function(e) {
      var statusCode = e.detail.statusCode;
      this.$.toast.text = 'Login failed! Statuscode: ' + statusCode;
      this.$.toast.show();
    },

    /**
     * LOGOUT
     */
    /**
     * @function: showPopupLogout
     * @params:
     * @description:
     * - show Logout Form as popup window
     */
    showPopupLogout: function() {
      this.$.socoboLogoutPopup.showPopup();
    },

    /**
     * @function: logoutOk
     * @params: e - event
     * @description:
     * - is called from socobo-login if the login was successfully
     * - sets the authToken to the local variable
     * - redirects to socobo-home
     * - reset authToken
     */
    logoutOk: function(e) {
      this.$.socoboLogoutPopup.closePopup();

      this.setUserToGlobal(e);
      this.setGlobalUserToUi();

      this.route = 'home';
    },

    /**
     * @function: logoutFailed
     * @params: e - event
     * @description:
     * - is called from socobo-login if the login failed
     * - shows a toast message to inform the user
     */
    logoutFailed: function(e) {
      var statusCode = e.detail.statusCode;
      this.$.socoboLogoutPopup.closePopup();
      this.$.toast.text = 'Logout failed! Statuscode: ' + statusCode;
      this.$.toast.show();
    },

    /**
     * UTILS
     */
    /**
     * @function: closeNavDrawer
     * @params:
     * @description:
     * - close Drawer after Menu item click
     */
    closeNavDrawer: function() {
       this.$.drawerPanel.closeDrawer();
     },

    /**
     * @function: goToMyProfile
     * @params:
     * @description:
     * - go to my profile after image clicked in navdrawer menu
     */
    goToMyProfile: function() {
      this.route = 'myprofile';
    },

    /**
     * @function: refreshAction
     * @params:
     * @description:
     * - shows a toast message to inform the user
     * - ! at the moment no functionality
     */
    refreshAction: function() {
      this.$.toast.text = 'Refreshing Page...';
      this.$.toast.show();
    },

    /**
     * @function: settingsAction
     * @params:
     * @description:
     * - shows a toast message to inform the user
     * - ! at the moment no functionality
     */
    settingsAction: function() {
      this.$.toast.text = 'Settings...';
      this.$.toast.show();
    },

    /**
     * Testing Global User #1
     */
    setDefaultUserToGlobal: function() {
      setUserNameGlobal('username');
      setEmailAddressGlobal('username@test.com');
      setPictureUrlGlobal('images/github.png');
    },

    /**
     * Testing Global User #2
     */
    setUserToGlobal: function(e) {
      setUserNameGlobal(e.detail.username);
      setEmailAddressGlobal(e.detail.emailaddress);
      setPictureUrlGlobal(e.detail.pictureurl);
    },

    /**
     * Testing Global User #3
     */
    setGlobalUserToUi: function() {
      this.userName = getUserNameGlobal();
      this.emailAddress = getEmailAddressGlobal();
      this.userPictureUrl = getPictureUrlGlobal();
    }
  };
}());