import { Meteor } from 'meteor/meteor';
import '/imports/startup/client/index.js';

import Vue from 'vue';

import VueI18n from 'vue-i18n';
Vue.use(VueI18n);

import Vuetify from 'vuetify/dist/vuetify.js';
import 'vuetify/dist/vuetify.min.css';
Vue.use(Vuetify);


import App from '/imports/ui/App.vue';
import { messages } from '/imports/ui/lang/fr.js';

const i18n = new VueI18n({
  locale: 'fr',
  messages,
});

Meteor.startup(() => {
  new Vue({
    i18n,
    vuetify: new Vuetify(),
    el: '#app',
    ...App,
  });
});
