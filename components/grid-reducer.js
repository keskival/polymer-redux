(() => {
  'use strict';
  class GridReducer {
    beforeRegister() {
      this.is = 'grid-reducer';
      this.properties = {
        store: {
          notify: true,
          readonly: true,
          type: Object
        }
      };
    }

    updateGridState(state) {
      const peoplePerPage = 10;
      const numPages = Math.ceil(state.people.length / peoplePerPage);
      const from = Math.max(1, state.grid.page - 3);
      const to = Math.min(numPages, state.grid.page + 3);
      const pages = [];

      let morePages = false,
        prevPages = false;

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

    reduce(state, action) {
      const type = action.type,
        data = action.data;
      for( let i = 0; i < this.children.length; i++) {
        state = this.children[i].reduce(state, type, data);
      };
      switch (type) {
        case 'refreshGrid':
          return this.updateGridState(state);
        default:
          return state;
      }
    }
  }
  Polymer(GridReducer);
})();
