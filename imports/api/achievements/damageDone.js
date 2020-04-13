import { addAchievementForCharacter } from "./achievements";

const over900 = 'over900';

export const computeDamageDoneAchievements = function (report) {
    let damageDone = report['damage-done']['entries'];

    report.characters.forEach(function(character) {
        for (const damage of damageDone) {
            if (damage.guid === character.guid) {
                // Time is in milliseconds
                const dps = (damage.total / (damage.activeTime / 1000));
                if (dps > 900) {
                    addAchievementForCharacter(over900, character, report.date);
                }
            }
        }
    });
};
