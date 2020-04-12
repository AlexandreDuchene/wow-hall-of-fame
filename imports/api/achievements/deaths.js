import { zoneMC } from '/imports/api/reports/reports';
import { addAchievementForCharacter } from "./achievements";

export const snowflake = 'snowflake';

export const computeDeathsAchievements = function (report) {
    let deaths = report['deaths']['entries'];
    // snowflake
    if (report.zone === zoneMC) {
        report.characters.forEach(function(character) {
            let isSnowFlake = true;
            for (const death of deaths) {
                if (death.guid === character.guid) {
                    isSnowFlake = false;
                    break;
                }
            }

            if (isSnowFlake) {
                addAchievementForCharacter(snowflake, character, report.date);
            }
        });
    }
};
