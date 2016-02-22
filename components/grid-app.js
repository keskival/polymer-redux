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
        },
        sexes: {
          type: Array,
          value: [
            'Male',
            'Female',
            "Other / Don't want to answer"
          ]
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
      if (this.localStorage) {
        this.$.store.dispatch('init', this.localStorage);
      } else {
        const names = [
          'Korsto', 'Liisa', 'Lumi', 'Syksy', 'Harald'
        ];
        const people = [];
        for (let i=0; i<100; i++) {
          people.push({
            id: i,
            name: names[Math.floor(Math.random() * 5)],
            age: (14 + Math.floor(Math.random() * 40)),
            sex: this.sexes[Math.floor(Math.random() * 3)]
          });
        }
        this.$.store.dispatch('init', {
          people: people,
          grid: {
            page: 1
          }
        });
      }
    }
    selectPage(event) {
      const page = event.target.value;
      this.$.store.dispatch('selectPage', page);
    }
    addPerson(event) {
      this.$.store.dispatch('addPerson', {
        id: Math.random(),
        name: this.$.addPersonName.value,
        sex: this.$.addPersonSex.value,
        age: this.$.addPersonAge.value
      });
      this.$.addPersonForm.reset();
    }
    deletePerson(event) {
      const person = event.target.value;
      this.$.store.dispatch('deletePerson', person);
    }
    ready() {
      this.set('store', this.$.store);
      this.set('reducer', this.$.reducer);
    }
  }
  Polymer(GridApp);
})();
