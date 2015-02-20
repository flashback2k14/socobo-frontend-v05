(function() {
  this.socoboBugreport = {

    btnBackend: function() {
      window.open('https://github.com/lyio/socobo/issues/new')
    },

    btnFrontend: function() {
      window.open('https://github.com/flashback2k14/socobo-frontend/issues/new')
    },

    btnFindUnregisteredElements: function() {

        function isUnregisteredCustomElement(el) {
          if (el.constructor == HTMLElement) {
            console.error("Found unregistered custom element:", el);
            return true;
          }
          return false;
        }

        function isCustomEl(el) {
          return el.localName.indexOf('-') != -1 || el.getAttribute('is');
        }

        var allCustomElements = document.querySelectorAll('html /deep/ *');
        allCustomElements = Array.prototype.slice.call(allCustomElements).filter(function(el) {
          return isCustomEl(el);
        });

        var foundSome = false;
        for (var i = 0, el; el = allCustomElements[i]; ++i) {
          if (isUnregisteredCustomElement(el)) {
            foundSome = true;
          }
        }

        if (foundSome) {
          alert('Oops: found one or more unregistered custom elements in use! Check the console.');
        } else {
          alert('Good: All custom elements are registered :)');
        }

    }
  };
}());