(() => {
  'use strict';
  class AppReducer {
    beforeRegister() {
      this.is = 'app-reducer';
    }
    reduce(state, action, data) {
      for( let i = 0; i < this.children.length; i++) {
        state = this.children[i].transform(state, action, data);
      };
      switch (action) {
        case 'init':
          console.log(JSON.stringify(data));
          return data;
        case 'addPerson':
          return Object.assign({}, state, {
            people: [
              ...state,
              data
            ]});
        default:
          return state;
      }
    }
  }
  Polymer(AppReducer);
})();
