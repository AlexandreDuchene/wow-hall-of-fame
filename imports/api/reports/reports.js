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
const resourcesGains = 'resources-gains';

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
    resourcesGains
];

export const Report = new Mongo.Collection('reports');
Report.schema = new SimpleSchema({
    _id: String,
    title: String,
    date: Date
});

reportTypes.forEach(function(reportType) {
    Report.schema[reportType] = {
        type: Map
    }
});
