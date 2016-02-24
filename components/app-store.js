"use strict";
// Singleton
let appStore;
Polymer({
  is: 'app-store',
  properties: {
    state: {
      notify: true,
      type: Object
    },
    reducer: {
      notify: true,
      readonly: true,
      type: Object,
      observer: 'setReducer'
    }
  },
  setReducer: function() {
    if (!appStore) {
      appStore = Redux.createStore(this.reducer.reduce.bind(this.reducer));
      appStore.subscribe(() => {
        this.state = appStore.getState();
      });
    }
  },
  dispatch: function(action, data) {
    appStore.dispatch({type: action, data});
  }
});
