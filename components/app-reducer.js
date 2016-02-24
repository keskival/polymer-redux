(() => {
  'use strict';
  class AppReducer {
    beforeRegister() {
      this.is = 'app-reducer';
      this.properties = {
        store: {
          notify: true,
          readonly: true,
          type: Object
        }
      };
    }

    reduce(state, action) {
      const type = action.type,
        data = action.data;
      for( let i = 0; i < this.children.length; i++) {
        state = this.children[i].reduce(state, action);
      };
      switch (type) {
        case 'init':
          console.log(JSON.stringify(data));
          return Object.assign({}, state, data);
        case 'addPerson':
          return Object.assign({}, state, {
            people: [
              ...state.people,
              data
            ]});
        case 'selectPage':
          return Object.assign({}, state, {
            grid: {
              page: data
            }
          });
        case 'deletePerson':
          const people = state.people.filter(person => (person.id != data));
          return Object.assign({}, state, {
            people: people
          });
        default:
          return state;
      }
    }
  }
  Polymer(AppReducer);
})();
