(function() {
  this.socoboMyfridgeItemList = {
    /**
     * @variable: myFridgeItems
     * @datatype: Array
     * @defaultValue: undefined
     * @description:
     * - contains myFridge items
     */
    myFridgeItems: [],

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
       * ToDo: call backend for Items
       */
      //this.$.socoboMyfridgeItems.sendRequest();
      /**
       * Register Eventlistener
       * - Workaround, because the old variant don't firing
       * - on-myFridgeItemDelete in element tag
       */
      this.addEventListener('myFridgeItemEdit', this.openItemEditDialog);
      this.addEventListener('myFridgeItemDelete', this.openItemDeleteDialog);
    },

    /**
     * @function: handleMyFridgeItemsOnResponse
     * @params: e event
     * @description:
     * - handle response from server
     * - set my fridge items
     */
    handleMyFridgeItemsOnResponse: function(e) {
      this.myFridgeItems = e.detail.response;
    },

    /**
     * @function: handleMyFridgeItemsOnError
     * @params: e event
     * @description:
     * - handle error from server
     */
    handleMyFridgeItemsOnError: function(e) {
      this.$.toast.text = 'Statuscode: ' +  e.detail.xhr.status;
      this.$.toast.show();
    },

    /**
     * @function: openItemEditDialog
     * @params: e event
     * @description:
     * - open item editor
     */
    openItemEditDialog: function(e) {
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
    }
  };
}());