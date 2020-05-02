import { Meteor } from 'meteor/meteor';

import '/imports/startup/client/index.js';

// VueJs
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import 'vuetify/dist/vuetify.min.css';
import Vuetify from 'vuetify/dist/vuetify.js';
import VueMeteorTracker from 'vue-meteor-tracker'
Vue.use(VueI18n);
Vue.use(Vuetify);
Vue.use(VueMeteorTracker);

import App from '/imports/ui/App.vue';

import { messages } from '/imports/ui/lang/messages.fr.js';
import { dateTimeFormats } from '/imports/ui/lang/dateTimeFormats.fr.js';

const i18n = new VueI18n({
    locale: 'fr',
    messages,
    dateTimeFormats,
});
const vuetify = new Vuetify();

// Injecting settings to every Vue instance
Vue.mixin({
    data: function() {
        return {
            get settings() {
                return Meteor.settings.public;
            }
        }
    }
});

Meteor.startup(() => {
    new Vue({
        i18n,
        vuetify: vuetify,
        el: '#app',
        ...App,
        data: {
            // App bar drawer is not rendered at launch
            menuDrawer: false,
            activeTab: 'achievements',
            tabs: ['achievements', 'characters'],
        },
    });
});
