SyncedCron.add({
    name: 'Synchronize external data',
    schedule: function(parser) {
        // parser is a later.parse object
        return parser.text('at 2:00 am');
    },
    job: function() {
        import '/bin/syncData.js';
    }
});

SyncedCron.add({
    name: 'Compute achievements',
    schedule: function(parser) {
        // parser is a later.parse object
        return parser.text('at 3:00 am');
    },
    job: function() {
        import '/bin/computeAchievements.js';
    }
});

SyncedCron.start();
