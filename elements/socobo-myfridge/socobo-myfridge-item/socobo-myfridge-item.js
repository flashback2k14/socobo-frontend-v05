(function() {
  this.socoboMyfridgeItem = {

    publish: {
      item: {},

      editMyFridgeItem: {
        value: false,
        reflect: true
      }
    },

    itemEditIsClicked: function(event, detail, sender) {
      this.editMyFridgeItem = !this.editMyFridgeItem;
      this.fire('itemEditIsClicked');
    }
  };
}());