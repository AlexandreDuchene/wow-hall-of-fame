import {Achievement} from "../achievements/achievements";

const damageDone = 'damage-done';
const damageTaken = 'damage-done';
const healing =  'healing';
const casts = 'casts';
const summons = 'summons';
const buffs = 'buffs';
const debuffs = 'debuffs';
const deaths = 'deaths';
const survivability = 'survivability';
const resources = 'resources';
const ressourcesGains = 'resources-gains';

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
    resources,
    ressourcesGains
];

export const Report = new Mongo.Collection('reports');
Report.schema = new SimpleSchema({
    _id: String,
    title: String,
    date: Date
});

reportTypes.forEach(function(reportType) {
    Report[reportType] = {
        type: Map
    }
});
