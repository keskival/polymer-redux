(() => {
  'use strict';
  // Singleton
  let appStore;
  class AppStore {
    beforeRegister() {
      this.is = 'app-store';
      this.properties = {
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
      };
    }
    setReducer() {
      if (!appStore) {
        appStore = Redux.createStore(this.reducer.reduce.bind(this.reducer));
        appStore.subscribe(() => {
          this.state = appStore.getState();
        });
      }
    }
    dispatch(action, data) {
      appStore.dispatch({type: action, data});
    }
  }
  Polymer(AppStore);
})();
