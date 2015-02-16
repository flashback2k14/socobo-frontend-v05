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
     * - is called after component is fully loaded
     * - get the myFridge items
     */
    ready: function() {
      /**
       * ToDo: call backend for Items
       */
      //this.$.socoboMyfridgeItems.sendRequest();
    },

    /**
     * @function: openItemEditor
     * @params:
     * @description:
     * - open item editor
     */
    openItemEditor: function() {
      console.log("item edit clicked!");
    },

    handleMyFridgeItemsOnResponse: function(e) {
      this.myFridgeItems = e.detail.response;
    },

    handleMyFridgeItemsOnError: function(e) {

    }
    /*,
    gerade: function(item) {
      if (Number(item.id) % 2 === 0) return item;
      else console.log("err gerade");
    },

    ungerade: function(item) {
      if (Number(item.id) % 2 !== 0) return item;
      else console.log("err ungerade");
    }*/
  };
}());