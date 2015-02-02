(function() {
  this.socoboHome = {

    latitude: undefined,
    longitude: undefined,
    errorMessage: undefined,
    posOptions: {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    },

    ready: function() {
      this.getLocation();
    },

    getLocation: function() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(this.posSucces.bind(this),
                                                 this.posError.bind(this),
                                                 this.posOptions);
      } else {
        this.errorMessage.value = "Geolocation is not supported by this browser.";
        this.$.showErrorMessage.value = this.errorMessage;
      }
    },

    posSucces: function(position) {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;

      this.$.txtLatitude.value = this.latitude.toFixed(6);
      this.$.txtLongitude.value = this.longitude.toFixed(6);
    },

    posError: function(error) {
      switch(error.code) {
        case error.PERMISSION_DENIED:
          this.errorMessage.value = "User denied the request for Geolocation."
          this.$.showErrorMessage.value = this.errorMessage;
          break;
        case error.POSITION_UNAVAILABLE:
          this.errorMessage.value = "Location information is unavailable."
          this.$.showErrorMessage.value = this.errorMessage;
          break;
        case error.TIMEOUT:
          this.errorMessage.value = "The request to get user location timed out."
          this.$.showErrorMessage.value = this.errorMessage;
          break;
        case error.UNKNOWN_ERROR:
          this.errorMessage.value = "An unknown error occurred."
          this.$.showErrorMessage.value = this.errorMessage;
          break;
      }
    }
  };
}());