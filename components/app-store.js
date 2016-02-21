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
          type: Object
        }
      };
    }
    ready() {
      if (!appStore) {
        appStore = this;
      }
    }
    dispatch(action, data) {
      let newState = appStore.reducer.reduce(appStore.state, action, data);
      appStore.state = newState;
      this.state = appStore.state;
    }
  }
  Polymer(AppStore);
})();
