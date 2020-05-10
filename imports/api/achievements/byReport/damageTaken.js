import { addAchievementForCharacter, initAchievement } from "../achievements";
import { zoneBWL, zoneMC } from "../../reports/reports";

const lava = 'lava';
const safeSpot = 'safeSpot';

export const computeDamageTakenAchievements = function (report) {
    const abilities = report['damage-taken']['abilities'];

    const lavaAchievement = initAchievement(lava);
    const safeSpotAchievement = initAchievement(safeSpot);

    report.characters.forEach(function(character) {
        if (abilities !== undefined) {
            // MC
            if (report.zone === zoneMC) {
                // Lava
                if (abilities.lava !== undefined) {
                    for (const char of abilities.lava.entries) {
                        if (char.guid === character.guid && char.total >= 5000) {
                            addAchievementForCharacter(lavaAchievement, character, report);
                        }
                    }
                }
            }

            // BWL
            if (report.zone === zoneBWL) {
                // Lava
                if (abilities.bomb !== undefined) {
                    let hasTakenBombDamage = false;
                    for (const char of abilities.bomb.entries) {
                        if (char.guid === character.guid && char.total > 0) {
                            hasTakenBombDamage = true;
                            break;
                        }
                    }

                    if (!hasTakenBombDamage) {
                        addAchievementForCharacter(safeSpotAchievement, character, report);
                    }
                }
            }
        }
    });
};
