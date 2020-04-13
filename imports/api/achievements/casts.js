import { addAchievementForCharacter } from "./achievements";

const dunceCap = 'dunceCap';
const carrotOnAStickId = 11122;
const theMachine = 'theMachine';

export const computeCastsAchievements = function (report) {
    let casts = report['casts']['entries'];

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
            addAchievementForCharacter(dunceCap, character, report.date);
        }
    });

    // theMachine
    if (MaxTotalCastsCharacter !== undefined) {
        addAchievementForCharacter(theMachine, MaxTotalCastsCharacter, report.date);
    }
};
