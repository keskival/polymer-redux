(() => {
  'use strict';
  function updateGridState(state) {
    let morePages = false,
      prevPages = false;
    const peoplePerPage = 20;
    const numPages = Math.ceil(state.people.length / peoplePerPage);
    const pages = [];
    const from = Math.max(1, state.grid.page - 3);
    const to = Math.min(numPages, state.grid.page + 3);
    for (let i=from; i<=to; i++) {
      pages.push(i);
    }
    if (to < numPages) {
      morePages = true;
    }
    if (from > 1) {
      prevPages = true;
    }
    const first = (state.grid.page - 1) * peoplePerPage;
    const last = Math.min(state.people.length, first + peoplePerPage);
    return Object.assign({}, state, {
      grid: Object.assign({}, state.grid, {
        morePages: morePages,
        prevPages: prevPages,
        rows: state.people.slice(first, last + 1),
        pages: pages
      })
    });
  }

  class AppReducer {
    beforeRegister() {
      this.is = 'app-reducer';
    }
    reduce(state, action) {
      const type = action.type,
        data = action.data;
      for( let i = 0; i < this.children.length; i++) {
        state = this.children[i].transform(state, type, data);
      };
      switch (type) {
        case 'init':
          console.log(JSON.stringify(data));
          return updateGridState(
            Object.assign({}, state, data)
          );
        case 'addPerson':
          return updateGridState(
            Object.assign({}, state, {
            people: [
              ...state.people,
              data
            ]}));
        case 'selectPage':
          return updateGridState(
            Object.assign({}, state, {
            grid: {
              page: data
            }
          }));
        case 'deletePerson':
          const people = state.people.filter(person => (person.id != data));
          return updateGridState(
            Object.assign({}, state, {
            people: people
          }));
        default:
          return state;
      }
    }
  }
  Polymer(AppReducer);
})();
