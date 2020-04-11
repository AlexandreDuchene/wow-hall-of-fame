import { Mongo } from 'meteor/mongo';
import { Achievement } from "../achievements/achievements";

export const Character = new Mongo.Collection('characters');
Character.schema = new SimpleSchema({
    name: {
        type: String,
        min: 2,
        max: 12,
    },
    guid: {
        type: SimpleSchema.Integer,
        min: 0,
    },
    achievements: {
        type: [Achievement.schema]
    },
    'achievements.$.date': {
        type: Date,
    },
});
