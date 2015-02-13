(function() {
  this.socoboMyfridgeAddItemDialog = {

    mengeneinheiten: [
      {id: '1', bezeichnung: 'Einheit 1'},
      {id: '2', bezeichnung: 'Einheit 2'},
      {id: '3', bezeichnung: 'Einheit 3'},
      {id: '4', bezeichnung: 'Einheit 4'},
      {id: '5', bezeichnung: 'Einheit 5'}
    ],

    kategories: [
      {id: '1', bezeichnung: 'Kategorie 1'},
      {id: '2', bezeichnung: 'Kategorie 2'},
      {id: '3', bezeichnung: 'Kategorie 3'},
      {id: '4', bezeichnung: 'Kategorie 4'},
      {id: '5', bezeichnung: 'Kategorie 5'}
    ],

    publish: {
      item: {}
    },

    ready: function() {
      this.selectedData = '2015-01-01';
      this.item = this.item || [];

      this.addEventListener('myFridgeItemEdit', this.setItemToDialog);
    },

    setItemToDialog: function(e) {
      this.item = e.detail.item;
    },

    openDatePicker: function() {
      this.$.datePicker.open();
    },

    formatDateFilter: function(value) {
      if (value !== null && value !== undefined) {
        return new Date(value).toLocaleDateString();
      } else {
        return " ";
      }
    },

    finishEdit: function() {
      this.style.visibility = 'hidden';
    },

    cancelEdit: function() {
      this.style.visibility = 'hidden';
    }
  };
}());