import {Meteor} from 'meteor/meteor';

import '/imports/startup/client/index.js';

import 'vuetify/dist/vuetify.min.css';
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import Vuetify from 'vuetify/dist/vuetify.js';

import App from '/imports/ui/App.vue';

import { messages } from '/imports/ui/lang/messages.fr.js';
import { dateTimeFormats } from '/imports/ui/lang/dateTimeFormats.fr.js';

Vue.use(VueI18n);
Vue.use(Vuetify);


const i18n = new VueI18n({
    locale: 'fr',
    messages,
    dateTimeFormats,
});
const vuetify = new Vuetify();

const handle = Meteor.subscribe('achievements.all');

Achievement = new Mongo.Collection('achievements');

Tracker.autorun(() => {
    if (handle.ready()) {
        Meteor.startup(() => {
            new Vue({
                i18n,
                vuetify: vuetify,
                el: '#app',
                ...App,
                data: {
                    // App bar drawer is not rendered at launch
                    drawer: false,
                    achievements: Achievement.find().fetch(),
                    settings: Meteor.settings.public,
                },
                methods: {
                    setTheme() {
                       this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
                    }
                }
            });
        });
    }
});
