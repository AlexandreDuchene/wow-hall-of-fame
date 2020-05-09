import { Report } from '/imports/api/reports/reports';
import { computeDeathsAchievements } from "/imports/api/achievements/byReport/deaths";
import { computeCastsAchievements } from "/imports/api/achievements/byReport/casts";
import { computeDamageDoneAchievements } from "/imports/api/achievements/byReport/damageDone";

const reports = Report.find();

reports.forEach(function(report) {
    computeDamageDoneAchievements(report);
    computeDeathsAchievements(report);
    computeCastsAchievements(report);
});
