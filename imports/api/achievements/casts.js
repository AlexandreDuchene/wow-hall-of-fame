import {addAchievementForCharacter, initAchievement} from "./achievements";

const dunceCap = 'dunceCap';
const carrotOnAStickId = 11122;
const theMachine = 'theMachine';

export const computeCastsAchievements = function (report) {
    const casts = report['casts']['entries'];

    const dunceCapAchievement = initAchievement(dunceCap);
    const theMachineAchievement = initAchievement(theMachine);

    // theMachine
    let maxTotalCasts = 0;
    let MaxTotalCastsCharacter;


    report.characters.forEach(function(character) {
        // dunceCap
        let hasCarrotOnAStickEquipped = false;
        for (const cast of casts) {
            if (cast.guid === character.guid) {

                // theMachine
                if (cast.total > maxTotalCasts) {
                    maxTotalCasts = cast.total;
                    MaxTotalCastsCharacter = character;
                }

                // dunceCap
                for (const item of cast.gear) {
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
    });

    // theMachine
    if (MaxTotalCastsCharacter !== undefined) {
        addAchievementForCharacter(theMachineAchievement, MaxTotalCastsCharacter, report);
    }
};
