import { Report } from '/imports/api/reports/reports';
import { computeDeathsAchievements } from "/imports/api/achievements/deaths";
import { computeCastsAchievements } from "/imports/api/achievements/casts";
import { computeDamageDoneAchievements } from "/imports/api/achievements/damageDone";

const reports = Report.find();

reports.forEach(function(report) {
    computeDamageDoneAchievements(report);
    computeDeathsAchievements(report);
    computeCastsAchievements(report);
});
