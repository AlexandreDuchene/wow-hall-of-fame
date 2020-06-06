import {HTTP} from "meteor/http";

SyncedCron.add({
    name: 'Synchronize external data',
    schedule: function(parser) {
        // parser is a later.parse object
        return parser.text('at 00:00');
    },
    job: function() {
        try {
            import '/bin/syncData.js';
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
            import '/bin/computeAchievements.js';
        } catch (error) {
            return error;
        }
    }
});

SyncedCron.start();
