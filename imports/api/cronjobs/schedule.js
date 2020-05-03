SyncedCron.add({
    name: 'Synchronize external data',
    schedule: function(parser) {
        // parser is a later.parse object
        return parser.text('at 1:00 GMT+2');
    },
    job: function() {
        import '/bin/syncData.js';
    }
});

SyncedCron.add({
    name: 'Compute achievements',
    schedule: function(parser) {
        // parser is a later.parse object
        return parser.text('at 2:00 GMT+2');
    },
    job: function() {
        import '/bin/computeAchievements.js';
    }
});

SyncedCron.start();
