import { warcraftlogsGuildName, warcraftlogsRegion, warcraftlogsServer } from "/imports/api/webservices/webservices-config";
import {Report, reportTypes} from '/imports/api/reports/reports';

Meteor.call(
    'warcraftLogs.getReportsByGuild',
    warcraftlogsGuildName,
    warcraftlogsServer,
    warcraftlogsRegion,
    function (error, result) {
        if (error) {
            console.log(error);
        } else {
            result.forEach(function(report) {
                console.log(report);
                if (Report.findOne({_id: report.id}) === undefined) {
                    let newReport = {
                        _id: report.id,
                        title: report.title,
                        date: new Date(report.start),
                    };
                    reportTypes.forEach(function(reportType) {
                        Meteor.call(
                            'warcraftLogs.getReportEventsSum',
                            reportType,
                            report.id,
                            function (error, result) {
                                if (error) {
                                    console.log(error);
                                } else {
                                    newReport[reportType] = result;
                                }
                            }
                        );
                    });

                    Report.insert(newReport);
                }
            });
        }
    }
);
