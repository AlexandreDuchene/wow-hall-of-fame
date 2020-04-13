import {Mongo} from 'meteor/mongo';

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
        min: 1,
    },
    class: {
        type: String,
        allowedValues: classes,
    },
    achievementsCount: {
        type: SimpleSchema.Integer,
        min: 0,
    },
    achievements: {
        type: [Object],
    },
    'achievement.$.name': {
        type: String,
        min: 0,
    },
    'achievement.$.img': {
        type: String,
        regEx: /\.(gif|jpe?g|tiff|png|webp|bmp)$/i,
    },
    'achievement.$.description': {
        type: String,
        min: 1,
    },
    'achievement.$.count': {
        type: SimpleSchema.Integer,
        min: 0,
    },
    'achievement.$.dates': {
        type: [Object],
    },
    'achievement.$.dates.report': {
        type: String,
        min: 1,
    },
    'achievement.$.dates.date': {
        type: Date,
    },
});

export const addAchievement = function (guid, achievement, report)
{
    let character = Character.findOne({guid: guid});
    if ( undefined === character) {
        return;
    }

    let characterContainsAchievement = false;

    if (undefined!== character.achievementsCount) {
        character.achievementsCount++;
    } else {
        character.achievementsCount = 1;
    }

    if (undefined !== character.achievements) {
        for (let ach of character.achievements) {
            if (ach._id === achievement._id) {
                ach.count ++;
                ach.dates.push({
                    report: report._id,
                    date: report.date,
                });

                characterContainsAchievement = true;
                break;
            }
        }
    }

    if (!characterContainsAchievement) {
        let achievementForCharacter = JSON.parse(JSON.stringify(achievement));
        achievementForCharacter.dates = [{
            report: report._id,
            date: report.date,
        }];
        achievementForCharacter.count = 1;
        delete achievementForCharacter.characters;

        if (undefined !== character.achievements) {
            character.achievements.push(achievementForCharacter);
        } else {
            character.achievements = [achievementForCharacter];
        }
    }

    Character.update(
        { guid: character.guid },
        character
    );
}
