import { Report } from '/imports/api/reports/reports';
import { computeDamageDoneAchievements } from "/imports/api/achievements/byReport/damageDone";
import { computeDamageTakenAchievements } from "/imports/api/achievements/byReport/damageTaken";
import { computeDeathsAchievements } from "/imports/api/achievements/byReport/deaths";
import { computeCastsAchievements } from "/imports/api/achievements/byReport/casts";

const reports = Report.find();

reports.forEach(function(report) {
    computeDamageDoneAchievements(report);
    computeDamageTakenAchievements(report);
    computeDeathsAchievements(report);
    computeCastsAchievements(report);
});
