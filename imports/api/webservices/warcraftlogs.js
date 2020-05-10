import {httpGet, warcraftlogsKey, warcraftlogsApiPath} from "./webservices-config";

// https://classic.warcraftlogs.com/v1/docs/
const getCall = function (route, params = []) {
    let url  = warcraftlogsApiPath + route + (route.includes('?') ? '&' : '?') + 'api_key=' + warcraftlogsKey;

    if (params.length > 0) {
        url += '&' + params.join('&');
    }

    return Meteor.wrapAsync(httpGet)(url);
};

Meteor.methods({
    'warcraftLogs.getZones': function () {
        return getCall('zones');
    },
    'warcraftLogs.getClasses': function () {
        return getCall('classes');
    },
    'warcraftLogs.getRankingsByEncouter': function (id) {
        return getCall('encounters/' + id);
    },
    'warcraftLogs.getRankingsByCharacter': function (charName, server, region) {
        return getCall('rankings/character/' + charName + '/' + server + '/' + region);
    },
    'warcraftLogs.getParses': function (charName, server, region) {
        return getCall('parses/character/' + charName + '/' + server + '/' + region);
    },
    'warcraftLogs.getReportsByGuild': function (guildName, server, region) {
        return getCall('reports/guild/' + guildName + '/' + server + '/' + region);
    },
    'warcraftLogs.getReportsByUser': function (username) {
        return getCall('reports/user/' + username);
    },
    'warcraftLogs.getReportFights': function (reportId) {
        return getCall('report/fights/' + reportId);
    },
    'warcraftLogs.getReportEvents': function (eventName, reportId) {
        return getCall('report/events/' + eventName + '/' + reportId + '?start=0&end=100000000000000');
    },
    'warcraftLogs.getReportEventsSum': function (eventName, reportId, params = []) {
        return getCall('report/tables/' + eventName + '/' + reportId + '?start=0&end=100000000000000', params);
    }
});
