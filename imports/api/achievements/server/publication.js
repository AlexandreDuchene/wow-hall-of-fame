import {Achievement} from "../achievements";

Meteor.publish('achievements.all', function() {
    return Achievement.find();
});
