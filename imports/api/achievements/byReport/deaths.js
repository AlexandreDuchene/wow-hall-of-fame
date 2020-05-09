import { zoneMC } from '/imports/api/reports/reports';
import { addAchievementForCharacter, initAchievement } from "../achievements";

const snowflake = 'snowflake';
const tenDeaths = 'tenDeaths';

export const computeDeathsAchievements = function (report) {
    const characters = report['survivability']['actortotals'];

    const snowflakeAchievement = initAchievement(snowflake);
    const tenDeathsAchievement = initAchievement(tenDeaths);

    report.characters.forEach(function(character) {
        for (const char of characters) {
            if (char.guid === character.guid) {
                // snowflake
                if (report.zone === zoneMC && char.total > 0) {
                    addAchievementForCharacter(snowflakeAchievement, character, report);
                }

                // tenDeaths
                if (char.total >= 10) {
                    addAchievementForCharacter(tenDeathsAchievement, character, report);
                }
            }
        }
    });
};
