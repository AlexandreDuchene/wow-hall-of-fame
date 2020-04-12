import { Mongo } from 'meteor/mongo';
import { Achievement } from "../achievements/achievements";

const demonist = 'Demonist';
const druid = 'Druid';
const hunter = 'Hunter';
const mage = 'Mage';
const priest = 'Priest';
const rogue = 'Rogue';
const shaman = 'Shaman';
const warrior = 'Warrior';

export const classes = [
    demonist,
    druid,
    hunter,
    mage,
    priest,
    rogue,
    shaman,
    warrior,
];

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
    class: {
        type: String,
        allowedValues: classes,
    },
    achievements: {
        type: [Achievement.schema]
    },
    'achievements.$.date': {
        type: Date,
    },
});
