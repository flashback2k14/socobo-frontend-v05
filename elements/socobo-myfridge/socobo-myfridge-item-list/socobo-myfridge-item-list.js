(function() {
  this.socoboMyfridgeItemList = {
    /**
     * @variable: authToken
     * @datatype: String
     * @defaultValue: undefined
     * @description:
     * - identify the user
     */
    authToken: '',

    /**
     * @variable: myFridgeItems
     * @datatype: Array
     * @defaultValue: undefined
     * @description:
     * - contains myFridge items
     */
    myFridgeItems: [],

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