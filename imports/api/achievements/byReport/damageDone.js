import { addAchievementForCharacter, initAchievement } from "../achievements";

const over900 = 'over900';
const million = 'million';

export const computeDamageDoneAchievements = function (report) {
    const damageDone = report['damage-done']['entries'];

    const over900Achievement = initAchievement(over900);
    const millionAchievement = initAchievement(million);

    report.characters.forEach(function(character) {
        for (const damage of damageDone) {
            if (damage.guid === character.guid) {

                // over900
                // Time is in milliseconds
                const activeTime = damage.activeTime / 1000;
                // Some healers have a dps activity of a few seconds and can reach large amounts of dps, but it is irrelevant
                if (activeTime > 60) {
                    if ((damage.total / activeTime) > 900) {
                        addAchievementForCharacter(over900Achievement, character, report);
                    }
                }

                // million
                if (damage.total > 1000000) {
                    addAchievementForCharacter(millionAchievement, character, report);
                }
            }
        }
    });
};
