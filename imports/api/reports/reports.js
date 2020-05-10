import {Character} from "../characters/characters";

// Report types
const damageDone = 'damage-done';
export const damageTaken = 'damage-taken';
const healing =  'healing';
export const casts = 'casts';
const summons = 'summons';
const buffs = 'buffs';
const debuffs = 'debuffs';
const deaths = 'deaths';
const survivability = 'survivability';

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

// Zones
export const zoneMC = 1000;
export const zoneOnyxia = 1001;
export const zoneBWL = 1002;
export const zoneZG = 1003;

export const zones = [
    zoneMC,
    zoneOnyxia,
    zoneBWL,
    zoneZG,
];

// Abilities
export const lava = 6;
export const goblinSapperCharge = 13241;
export const restoreMana = 17531;
export const bomb = 22334;

// Collection definition
export const Report = new Mongo.Collection('reports');
Report.schema = new SimpleSchema({
    title: {
        type: String,
        min: 1,
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
