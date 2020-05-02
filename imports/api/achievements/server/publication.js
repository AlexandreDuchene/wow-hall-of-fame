import { Achievement } from "../achievements";
import { Character } from "../../characters/characters";

Meteor.publish('achievements', function() {
    return Achievement.find();
});
Meteor.publish('characters', function () {
    return Character.find();
});
