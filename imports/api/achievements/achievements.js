import { Mongo } from 'meteor/mongo';
import { addAchievement, Character } from "../characters/characters";

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
        type: [Character],
    },
    'characters.$.date': {
        type: Date,
    },
});

export const addAchievementForCharacter = function(id, character, date)
{
    let achievement = Achievement.findOne({ _id: id });

    character.date = date;

    delete character.achievements;

    if (achievement === undefined) {
        achievement = insertAchievement(
            id,
            'achievement.' + id + '.name',
            id + '.jpg',
            'achievement.' + id + '.description',
            [character]
        );
    } else {
        Achievement.update({ _id: id }, {
            $addToSet: { characters: character }
        });
    }

    achievement.date = date;
    addAchievement(character, achievement);
};

const insertAchievement = function(id, name, img, description, characters)
{
    let achievement = {
        _id: id,
        name: name,
        img: img,
        description: description,
        characters: characters,
    };

    Achievement.insert(achievement);

    return achievement;
};
