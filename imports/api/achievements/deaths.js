import { zoneMC } from '/imports/api/reports/reports';
import {addAchievementForCharacter, initAchievement} from "./achievements";

const snowflake = 'snowflake';

export const computeDeathsAchievements = function (report) {
    const deaths = report['deaths']['entries'];

    const snowflakeAchievement = initAchievement(snowflake);

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
                addAchievementForCharacter(snowflakeAchievement, character, report);
            }
        });
    }
};
