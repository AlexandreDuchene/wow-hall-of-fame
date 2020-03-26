import {httpGet, warcraftlogsKey, warcraftlogsPath} from "./webservices-config";

const getCall = function (route,) {
    this.unblock();

    let url  = warcraftlogsPath + route + (route.includes('?') ? '&' : '?') + 'api_key=' + warcraftlogsKey;

    return Meteor.wrapAsync(httpGet)(url);
};

Meteor.methods({
    'getWLZones': function () {
        return getCall('zones');
    },
    'getWLClasses': function () {
        return getCall('classes');
    },
    'getWLRankingsByEncouter': function (id) {
        return getCall('encounters/' + id);
    },
    'getWLRankingsByCharacter': function (charName, server, region) {
        return getCall('rankings/character/' + charName + '/' + server + '/' + region);
    },
    'getWLParses': function (charName, server, region) {
        return getCall('parses/character/' + charName + '/' + server + '/' + region);
    },
    'getWLReportsByGuild': function (guildName, server, region) {
        return getCall('reports/guild/' + guildName + '/' + server + '/' + region);
    },
    'getWLReportsByUser': function (username) {
        return getCall('reports/user/' + username);
    },
    'getWLReportFights': function (reportId) {
        return getCall('report/fights/' + reportId);
    },
    'getWLReportEvents': function (eventName, reportId) {
        return getCall('report/events/' + eventName + '/' + reportId);
    },
    'getWLReportEventsSum': function (eventName, reportId) {
        return getCall('report/tables/' + eventName + '/' + reportId);
    }
});
