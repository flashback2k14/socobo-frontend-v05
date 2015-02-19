(function() {
  this.socoboMyfridgeItemList = {
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
       * @variable: myFridgeItems
       * @datatype: Array
       * @defaultValue: undefined
       * @description:
       * - contains myFridge items
       */
      this.myFridgeItems = [];
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

    searchForItems: function(item, searchStr) {
      if (searchStr !== undefined) {
        if (searchStr.length === 0) return item;
        else return item.bezeichnung.toLowerCase().match(searchStr.toLowerCase());
      } else {
        return this.myFridgeItems;
      }
    }
  };
}());