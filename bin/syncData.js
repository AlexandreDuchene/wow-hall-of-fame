import { warcraftlogsGuildName, warcraftlogsRegion, warcraftlogsServer } from "/imports/api/webservices/webservices-config";
import { Report, reportTypes } from '/imports/api/reports/reports';
import {Character, classes} from "/imports/api/characters/characters";

Meteor.call(
    'warcraftLogs.getReportsByGuild',
    warcraftlogsGuildName,
    warcraftlogsServer,
    warcraftlogsRegion,
    function (error, result) {
        if (error) {
            console.log(error);
        } else {
            for (const report of result) {
                if (Report.findOne({_id: report.id}) !== undefined) {
                    continue;
                }

                console.log(report);

                // Fetching characters
                let characters = [];
                Meteor.call(
                    'warcraftLogs.getReportFights',
                    report.id,
                    function (error, result) {
                        if (error) {
                            console.log(error);
                        } else {
                            result.friendlies.forEach(function(friendly) {
                                // "friendlies" doesn't contain only players, so we check if the type is a known class
                                if (classes.includes(friendly.type)) {
                                    let character = {
                                        name: friendly.name,
                                        guid: friendly.guid,
                                        class: friendly.type,
                                        achievements: [],
                                    };

                                    characters.push(character);

                                    let insertResult = Character.upsert({ guid: character.guid }, character);
                                    if (typeof insertResult.insertedId != 'undefined') {
                                        console.log(character);
                                        console.log('New character synced');
                                    }
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
                console.log('New report synced.')
            }
        }
    }
);
