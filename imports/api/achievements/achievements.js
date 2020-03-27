import { Mongo } from 'meteor/mongo';
import {Character} from "../characters/characters";

export const Achievement = new Mongo.Collection('achievements');
Achievement.schema = new SimpleSchema({
    name: {
        type: String,
        required: true,
        index: true,
        validate: val => val.length > 0
    },
    img: {
        type: String,
        required: true,
        validate: val =>
            fs.existsSync(val)
    },
    description: {
        type: String,
        required: true,
        validate: val => val.length > 0
    },
    characters: [{
        character: Character,
        date: {
            type: Date,
            required: true,
        }
    }]
});
