import { Mongo } from 'meteor/mongo';
import {Achievement} from "../achievements/achievements";

export const Character = new Mongo.Collection('characters');
Character.schema = new SimpleSchema({
    name: {
        type: String,
        required: true,
        index: true,
        validate: val =>
            val.length >= 2 && val.length <= 12
    },
    guid: {
        type: Number,
        required: true,
        validate: val =>
            _.isInteger(val) && val > 0
    },
    achievements: [{
        achievement: Achievement,
        date: {
            type: Date,
            required: true,
        }
    }]
});
