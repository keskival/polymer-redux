"use strict";
Polymer({
  is: 'grid-app',
  properties: {
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
  },
  observers: [
    "onStateChanged(store.state)"
  ],
  onStateChanged: function() {
    // Saving the state into local storage always when it changes.
    this.localStorage = this.store.state;
  },
  localStorageLoaded: function(params) {
    if (this.localStorage) {
      this.store.dispatch('init', this.localStorage);
      this.store.dispatch('refreshGrid');
    } else {
      // If the local storage is empty, we will
      // initialize some random content.
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
      this.store.dispatch('init', {
        people: people,
        grid: {
          page: 1
        }
      });
      this.store.dispatch('refreshGrid');
    }
  },
  selectPage: function(event) {
    const page = event.target.value;
    this.store.dispatch('selectPage', page);
    this.store.dispatch('refreshGrid');
  },
  addPerson: function(event) {
    this.store.dispatch('addPerson', {
      id: Math.random(),
      name: this.$.addPersonName.value,
      sex: this.$.addPersonSex.value,
      age: this.$.addPersonAge.value
    });
    this.store.dispatch('refreshGrid');
    this.$.addPersonForm.reset();
  },
  deletePerson: function(event) {
    const person = event.target.value;
    this.store.dispatch('deletePerson', person);
    this.store.dispatch('refreshGrid');
  },
  ready: function() {
    this.set('store', this.$.store);
    this.set('reducer', this.$.reducer);
  }
});
