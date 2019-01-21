const mongodb = require('mongodb');
const fs = require('fs');
const url = "mongodb://localhost:27017/";
const mongoClient = mongodb.MongoClient;

var currentDb, currentCollection, currentVersion;

var implicitVersion = true;

const useDb = (dbName) => {
    currentDb = dbname;
}

const collection = (collectionName) => {
    currentCollection = collectionName;
}

const insert = (documentString) => {
    mongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
        var dbo = db.db(currentDb);
        var myobj = JSON.parse(documentString);
        dbo.collection(currentCollection).insertOne(myobj, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    });
}

const insertFile = (fileName) => {
    mongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
        var dbo = db.db(currentDb);
        const fileContents = fs.readFileSync(fileName, 'utf8');
        try{
            const objs = JSON.parse(fileContents);   
        } catch(err1) {
            console.error(err1);
        }
    });
}

const find = (query) => {
    console.log("hello") 
}

const update = (query, documentString) =>{
	
}

const deleteRec = (documentString) => {
}

const merge = (v1, v2) => {

}

module.exports = {useDb, collection, insert, find, update, deleteRec, merge}
