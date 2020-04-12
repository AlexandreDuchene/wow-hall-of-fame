import {Character} from "../characters/characters";

const damageDone = 'damage-done';
const damageTaken = 'damage-taken';
const healing =  'healing';
const casts = 'casts';
const summons = 'summons';
const buffs = 'buffs';
const debuffs = 'debuffs';
const deaths = 'deaths';
const survivability = 'survivability';

const zoneMC = 1000;
const zoneOnyxia = 1001
const zoneBWL = 1002;
const zoneZG = 1003;

export const zones = [
    zoneMC,
    zoneOnyxia,
    zoneBWL,
    zoneZG,
];

export const reportTypes = [
    damageDone,
    damageTaken,
    healing,
    casts,
    summons,
    buffs,
    debuffs,
    deaths,
    survivability,
];

export const Report = new Mongo.Collection('reports');
Report.schema = new SimpleSchema({
    title: {
        type: String,
        min: 0,
    },
    date: {
        type: Date,
    },
    zone: {
        type: SimpleSchema.Integer,
        allowedValues: zones,
    },
    characters: {
        type: [Character],
    },
});

reportTypes.forEach(function(reportType) {
    Report.schema[reportType] = {
        type: Map,
    }
});
