import { addAchievementForCharacter, initAchievement } from "../achievements";

const dunceCap = 'dunceCap';
const carrotOnAStickId = 11122;
const kBoom = 'kBoom';
const theMachine = 'theMachine';
const tooMuchDrink = 'tooMuchDrink';

export const computeCastsAchievements = function (report) {
    const characters = report['casts']['entries'];
    const abilities = report['casts']['abilities'];

    const dunceCapAchievement = initAchievement(dunceCap);
    const kBoomAchievement = initAchievement(kBoom);
    const theMachineAchievement = initAchievement(theMachine);
    const tooMuchDrinkAchievement = initAchievement(tooMuchDrink);

    // theMachine
    let maxTotalCasts = 0;
    let MaxTotalCastsCharacter;

    report.characters.forEach(function(character) {
        // dunceCap
        let hasCarrotOnAStickEquipped = false;
        for (const char of characters) {
            if (char.guid === character.guid) {

                // theMachine
                if (char.total > maxTotalCasts) {
                    maxTotalCasts = char.total;
                    MaxTotalCastsCharacter = character;
                }

                // dunceCap
                for (const item of char.gear) {
                    if (item.id === carrotOnAStickId) {
                        hasCarrotOnAStickEquipped = true;
                    }
                }
            }
        }

        // dunceCap
        if (hasCarrotOnAStickEquipped) {
            addAchievementForCharacter(dunceCapAchievement, character, report);
        }

        if (abilities !== undefined) {
            // Major mana potions
            if (abilities.restoreMana !== undefined) {
                for (const char of abilities.restoreMana.entries) {
                    if (char.guid === character.guid && char.total >= 10) {
                        addAchievementForCharacter(tooMuchDrinkAchievement, character, report);
                    }
                }
            }

            // Goblin sapper charges
            if (abilities.goblinSapperCharge !== undefined) {
                for (const char of abilities.goblinSapperCharge.entries) {
                    if (char.guid === character.guid && char.total >= 5) {
                        addAchievementForCharacter(kBoomAchievement, character, report);
                    }
                }
            }
        }
    });

    // theMachine
    if (MaxTotalCastsCharacter !== undefined) {
        addAchievementForCharacter(theMachineAchievement, MaxTotalCastsCharacter, report);
    }
};
