import { Mongo } from 'meteor/mongo';
import { addAchievement, classes } from "../characters/characters";

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
        min: 1,
    },
    count: {
        type: SimpleSchema.Integer,
        min: 0,
    },
    characters: {
        type: [Object],
    },
    'characters.$.name': {
        type: String,
        min: 2,
        max: 12,
    },
    'characters.$.guid': {
        type: SimpleSchema.Integer,
        min: 1,
    },
    'characters.$.class': {
        type: String,
        allowedValues: classes,
    },
    'characters.$.count': {
        type: SimpleSchema.Integer,
        min: 0,
    },
    'characters.$.dates': {
        type: [Object],
    },
    'characters.$.dates.report': {
        type: String,
        min: 1,
    },
    'characters.$.dates.date': {
        type: Date,
    },
});

export const addAchievementForCharacter = function(achievement, character, report)
{
    let alreadyHasAchievement = false;

    let achievementContainsCharacter = false;
    for (let char of achievement.characters) {
        if (char.guid === character.guid) {
            for (let date of char.dates) {
                if (date.report === report._id) {
                    alreadyHasAchievement = true;
                    break;
                }
            }

            if (!alreadyHasAchievement) {
                achievement.count ++;
                char.count ++;
                char.dates.push({
                    report: report._id,
                    date: report.date,
                });
            }

            achievementContainsCharacter = true;
            break;
        }
    }

    if (!achievementContainsCharacter) {
        let characterForAchievement = JSON.parse(JSON.stringify(character));
        characterForAchievement.count = 1;
        characterForAchievement.dates = [{
            report: report._id,
            date: report.date,
        }];

        delete characterForAchievement.achievementsCount;
        delete characterForAchievement.achievements;

        achievement.characters.push(characterForAchievement);

        achievement.count ++;
    }

    if (!alreadyHasAchievement) {
        Achievement.update({ _id: achievement._id }, achievement);
        addAchievement(character.guid, achievement, report);
    }
};

export const initAchievement = function(id)
{
    const achievement = Achievement.findOne({_id: id});

    if (achievement !== undefined) {
        return achievement;
    }

    return insertAchievement(id);
};

const insertAchievement = function(id)
{
    let achievement = {
        _id: id,
        name: 'achievement.' + id + '.name',
        img: id + '.jpg',
        description: 'achievement.' + id + '.description',
        count: 0,
        characters: [],
    };

    Achievement.upsert(
        { _id: id },
        achievement
    );

    return achievement;
};
