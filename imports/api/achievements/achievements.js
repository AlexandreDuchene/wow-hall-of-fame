import { Mongo } from 'meteor/mongo';
import { Character } from "../characters/characters";

export const Achievement = new Mongo.Collection('achievements');
Achievement.schema = new SimpleSchema({
    name: {
        type: String,
        min: 0,
    },
    img: {
        type: String,
        regEx: /\.(gif|jpe?g|tiff|png|webp|bmp)$/i,
    },
    description: {
        type: String,
        min: 0,
    },
    characters: {
        type: [Object],
    },
    'characters.$.name':  {
        type: String,
        min: 2,
        max: 12,
    },
    'characters.$.guid': {
        type: SimpleSchema.Integer,
        min: 0,
    },
    'characters.$.date': {
        type: Date,
    },
});
