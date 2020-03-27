import { HTTP } from 'meteor/http';

export const httpGet = function (url, callback) {
    try {
        let response = HTTP.get(url).data;

        // A successful API call shouldn't return an error, but the contents from the response
        callback(null, response);
    } catch (error) {
        let errorCode, errorMessage;

        if (error.response) {
            errorCode = error.response.data.code;
            errorMessage = error.response.data.message;
        } else {
            errorCode = 500;
            errorMessage = 'Cannot access the API';
        }

        // A failed API call should return a detailed error, and no content
        callback(new Meteor.Error(errorCode, errorMessage), null);
    }
};

// https://classic.warcraftlogs.com/v1/docs/
export const warcraftlogsGuildName = Meteor.settings.warcraftlogs.guildName;
export const warcraftlogsKey = Meteor.settings.warcraftlogs.key;
export const warcraftlogsPath = Meteor.settings.warcraftlogs.path;
export const warcraftlogsRegion = Meteor.settings.warcraftlogs.region;
export const warcraftlogsServer = Meteor.settings.warcraftlogs.server;
