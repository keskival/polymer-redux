(() => {
  'use strict';
  class GridApp {
    beforeRegister() {
      this.is = 'grid-app';
      this.properties = {
        reducer: {
          notify: true,
          readonly: true,
          type: Object
        }
      };
      this.observers = [
        "onStateChanged(store.state)"
      ];
    }
    onStateChanged() {
      this.localStorage = this.store.state;
    }
    init(params) {
      console.log(params);
      const names = [
        'Tero', 'Liisa', 'Lumi', 'Syksy', 'Harald'
      ];
      if (this.localStorage) {
        this.$.store.dispatch('init', this.localStorage);
      } else {
        const people = [];
        for (let i=0; i<100; i++) {
          people.push({
            id: i,
            name: names[Math.floor(Math.random() * 5)],
            age: (14 + Math.floor(Math.random() * 40)),
            sex: (Math.random() > 0.5 ? 'Male' : 'Female')
          });
        }
        const peoplePerPage = 10;
        const maxPages = 6;
        const pages = [];
        const numPages = Math.ceil(people.length / peoplePerPage);
        for (let i=0; i<numPages; i++) {
          pages.push(i+1);
        }
        let morePages = false;
        if (numPages > maxPages) {
          morePages = true;
        }
        this.$.store.dispatch('init', {people: people, page: 1,
          rows: people.slice(0, peoplePerPage),
          shownPages: pages.slice(0, maxPages), pages: pages,
          morePages: morePages});
      }
    }
    selectPage(event) {
      const page = event.target.value;
      this.$.store.dispatch('selectPage', page);
    }
    addPerson(event) {
      const person = event.target.value;
      this.$.store.dispatch('addPerson', person);
    }
    deletePerson(event) {
      const person = event.target.value;
      this.$.store.dispatch('deletePerson', person);
    }
    modifyPerson(event) {
      const person = event.target.value;
      this.$.store.dispatch('modifyPerson', person);
    }
    ready() {
      this.set('store', this.$.store);
      this.set('reducer', this.$.reducer);
    }
  }
  Polymer(GridApp);
})();
