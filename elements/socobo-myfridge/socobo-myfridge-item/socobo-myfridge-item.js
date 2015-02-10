(function() {
  this.socoboMyfridgeItem = {

    publish: {
      item: {}
    },

    ready: function() {
      // Initialize the instance's "list" property to empty array.
      this.item = this.item || [];
    },

    itemEdit: function() {
      this.fire('myFridgeItemEdit', {item: this.item});
    },

    itemDelete: function() {
      this.fire('myFridgeItemDelete', {item: this.item});
    }
  };
}());