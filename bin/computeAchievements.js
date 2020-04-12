import { Report } from '/imports/api/reports/reports';
import {computeDeathsAchievements} from "/imports/api/achievements/deaths";

const reports = Report.find();

reports.forEach(function(report) {
    computeDeathsAchievements(report);
});
