const program = require('commander');

const {insertRecord, insertRecordWithDelta, deleteOne, deleteMany, findOne, findMany, findLatest, update,
updateWithDelta} = require('./version_control');

program.version('0.0.1').description('Version control system for MongoDB');

program.command('insertRecord <collectionName, record>')
    .action(collectionName, record => {
        insertRecord(collectionName, record);
    });

program.command('insertRecordWithDelta <collectionName, record>')
    .action(collectionName, record => {
        insertRecordWithDelta(collectionName, record);
    });


program.command('deleteOne <collectionName, query>')
    .action(collectionName, query => {
        deleteOne(collectionName, query);
    });

program.command('deleteMany <collectionName, query>')
    .action(collectionName, query => {
        deleteMany(collectionName, query);
    });

program.command('findOne <collectionName, query>')
    .action(collectionName, query => {
        findOne(collectionName, query);
    });

program.command('findMany <collectionName, query>')
    .action(collectionName, query => {
        findMany(collectionName, query);
    });

program.command('findLatest <collectionName>')
    .action(collectionName => {
        findLatest(collectionName);
    });

program.command('update <collectionName, query, updateDocParam')
    .action(collectionName, query, updateDocParam => {
        update(collectionName, query, updateDocParam);
    });

program.command('updateWithDelta <collectionName, query, updateDocParam>')
    .action(collectionName, query, updateDocParam);
        updateWithDelta(collectionName, query, updateDocParam);
    });

program.command.insertDeltaRecord('insertDeltaRecord <collectionName, record)>')
    .action(collectionName, record => {
        insertDeltaRecord(collectionName, record);
    });
/*
program.command('insertRecord <record>')
    .alias('i')
    .description('Insert a document into a collection')
    .action(record => {
        insertRecord(record);
    });

program.command('insertFile <fileName')
    .description('Insert JSON file into current collection')
    .action(fileName => {
        insertFile(fileName);
    });

program.command('useDb <dbName>')
    .description('Database to use')
    .action(dbName => {
        useDb(dbName);
    });

program.command('collection <collectionName>')
    .description('Collection to use')
    .action(collectionName => {
        collection(collectionName);
    });
*/

program.parse(process.argv);
