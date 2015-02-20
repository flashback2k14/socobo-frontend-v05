(function() {
  this.socoboMyFridge = {
    /**
     * DEFAULT POLYMER
     */
    /**
     * @function: ready
     * @params:
     * @description:
     * - default polymer function
     * - is called after component is fully prepared
     * - get the myFridge items
     */
    ready: function() {
      /**
       * Register Eventlistener
       * - Workaround, because the old variant don't firing
       * - on-myFridgeItemDelete in element tag
       */
      this.addEventListener('myFridgeItemEdit', this.openItemEditDialog);
      this.addEventListener('myFridgeItemDelete', this.openItemDeleteDialog);
      /**
       * Register Dialog Element
       * - Workaround, because element not defined
       */
      this.dialog = this.$.socoboMyFridgeDialog;
    },

    /**
     * @function: openItemEditDialog
     * @params: e event
     * @description:
     * - open item editor
     */
    openItemEditDialog: function(e) {
      this.$.socoboMyFridgeDialog.style.visibility = 'visible';

      var editItem = e.detail.item;

      this.fire('itemForEdit', {editItem: editItem}, this.dialog);

      this.$.toast.text = 'Edit: ' + e.detail.item.bezeichnung;
      this.$.toast.show();
    },

    /**
     * @function: openItemDeleteDialog
     * @params: e event
     * @description:
     * - open delete confirm dialog
     */
    openItemDeleteDialog: function(e) {
      this.$.toast.text = 'Delete: ' + e.detail.item.bezeichnung;
      this.$.toast.show();
    },

    /**
     * Test Get Global User
     */
    alertMeUser: function() {
      alert('socobo-myfridge\nUsername: ' + getUserNameGlobal()
            + "\nEmailaddress: " + getEmailAddressGlobal()
            + "\nPictureUrl: " + getPictureUrlGlobal());
    }
  };
}());