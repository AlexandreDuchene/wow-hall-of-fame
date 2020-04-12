import { warcraftlogsGuildName, warcraftlogsRegion, warcraftlogsServer } from "/imports/api/webservices/webservices-config";
import { Report, reportTypes } from '/imports/api/reports/reports';
import { classes } from "/imports/api/characters/characters";

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
                    // Fetching characters
                    let characters = [];
                    Meteor.call(
                        'warcraftLogs.getReportFights',
                        report.id,
                        function (error, result) {
                            if (error) {
                                console.log(error);
                            } else {
                                result.friendlies.forEach(function(character) {
                                    // "friendlies" doesn't contain only players, so we check if the type is a known class
                                    if (classes.includes(character.type)) {
                                        characters.push({
                                            name: character.name,
                                            guid: character.guid,
                                            class: character.type,
                                        });
                                    }
                                });
                            }
                        }
                    );

                    let newReport = {
                        _id: report.id,
                        title: report.title,
                        date: new Date(report.start),
                        zone: report.zone,
                        characters: characters,
                    };
                    // fetching each reportType one by one because the API doesn't allow us to fetch all at once
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
