import {
    bomb,
    casts,
    damageTaken,
    goblinSapperCharge,
    lava,
    Report,
    reportTypes,
    restoreMana, zoneBWL,
    zoneMC
} from "../reports/reports";
import {computeDamageDoneAchievements} from "../achievements/byReport/damageDone";
import {computeDamageTakenAchievements} from "../achievements/byReport/damageTaken";
import {computeDeathsAchievements} from "../achievements/byReport/deaths";
import {computeCastsAchievements} from "../achievements/byReport/casts";
import {warcraftlogsGuildName, warcraftlogsRegion, warcraftlogsServer} from "../webservices/webservices-config";
import {Character, classes} from "../characters/characters";

Meteor.methods({
    'syncData': function () {
        Meteor.call(
            'warcraftLogs.getReportsByGuild',
            warcraftlogsGuildName,
            warcraftlogsServer,
            warcraftlogsRegion,
            function (error, result) {
                if (error) {
                    console.log(error);
                } else {
                    reportLoop:
                        for (const report of result) {
                            if (Report.findOne({_id: report.id}) !== undefined) {
                                continue;
                            }

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
                                                };

                                                characters.push(character);

                                                Character.upsert({ guid: character.guid }, character);
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
                            for (const reportType of reportTypes) {
                                try {
                                    newReport[reportType] = Meteor.call(
                                        'warcraftLogs.getReportEventsSum',
                                        reportType,
                                        report.id
                                    );

                                    if (reportType === casts) {
                                        newReport[reportType]['abilities'] = {
                                            // Major mana potion
                                            restoreMana: Meteor.call(
                                                'warcraftLogs.getReportEventsSum',
                                                reportType,
                                                report.id,
                                                ['abilityid=' + restoreMana]
                                            ),
                                            // Goblin sapper charge
                                            goblinSapperCharge: Meteor.call(
                                                'warcraftLogs.getReportEventsSum',
                                                reportType,
                                                report.id,
                                                ['abilityid=' + goblinSapperCharge]
                                            )
                                        };
                                    }

                                    if (reportType === damageTaken) {
                                        // MC
                                        if (report.zone === zoneMC) {
                                            // Lava
                                            newReport[reportType]['abilities'] = {lava: Meteor.call(
                                                    'warcraftLogs.getReportEventsSum',
                                                    reportType,
                                                    report.id,
                                                    ['abilityid=' + lava]
                                                )};
                                        }

                                        // BWL
                                        if (report.zone === zoneBWL) {
                                            // Bombs from goblin techs
                                            newReport[reportType]['abilities'] = {bomb: Meteor.call(
                                                    'warcraftLogs.getReportEventsSum',
                                                    reportType,
                                                    report.id,
                                                    ['abilityid=' + bomb]
                                                )};
                                        }
                                    }
                                } catch (e) {
                                    console.log(e);
                                    continue reportLoop;
                                }
                            };

                            Report.insert(newReport);
                        }
                }
            }
        );
    },
    'computeAchievements': function () {
        const reports = Report.find();

        reports.forEach(function(report) {
            computeDamageDoneAchievements(report);
            computeDamageTakenAchievements(report);
            computeDeathsAchievements(report);
            computeCastsAchievements(report);
        });
    }
});
