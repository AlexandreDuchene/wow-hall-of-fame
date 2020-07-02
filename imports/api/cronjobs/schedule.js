import {HTTP} from "meteor/http";

SyncedCron.add({
    name: 'Synchronize external data',
    schedule: function(parser) {
        // parser is a later.parse object
        return parser.text('at 00:00');
    },
    job: function() {
        try {
            Meteor.call('syncData');
        } catch (error) {
            return error;
        }
    }
});

SyncedCron.add({
    name: 'Compute achievements',
    schedule: function(parser) {
        // parser is a later.parse object
        return parser.text('at 01:00');
    },
    job: function() {
        try {
            Meteor.call('computeAchievements');
        } catch (error) {
            return error;
        }
    }
});

SyncedCron.start();
