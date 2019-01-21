var Util = require("./utility");
var app = require("./version_control.js");
var fs = require('fs');
var record = {  "version": 3,  "timestamp": Util.getTime(),  "user": "Sushma",  "branch": "Master",  "file1": "Testing document store",  "file2": "Test Date",  "file3": "I am a module" ,  "file4": "abcd efgh ijkl mnop \n eyf sdlks dasjdc \n jbfaus ugciuw eiusvb",  "file5": "sdjbc sjhdvbsdv\nsdugu dsvc\nwiudhcs d"};
//var record = {  "version": 3,  "branch": "Test",  "file1": "Testing document store",  "file2": "Test Date",  "file3": {    "variable": "XYZ",    "function": "I am a module"  },  "file4": "abcd efgh ijkl mnop \n eyf sdlks dasjdc \n jbfaus ugciuw eiusvb",  "file5": "sdjbc sjhdvbsdv\nsdugu dsvc\nwiudhcs d"};

//var record = {  "version": 3,  "timestamp": Util.getTime(),  "user": "Sushma",  "branch": "Test",  "file1": "Testing document store",  "file2": "Test Date",  "file3": {    "variable": "XYZ",    "function": "I am a module"  },  "file4": {    "oldVersion": "Old Version metadata goes here",    "newVersion": "Old Version metadata goes here"  },  "file5": [    "data1",    "data2",    "data3"  ]};

//var record = {  "version": "2",  "timestamp": "2012-10-03 15:35:46.461491",  "user": "Sushma",  "branch": "Test",  "file1": "Testing document store",  "file2": "Test Date",  "file3": {    "variable": "XYZ",    "function": "I am a module"  },  "file4": {    "oldVersion": "Old Version metadata goes here",    "newVersion": "Old Version metadata goes here"  },  "file5": [    "data1",    "data2",    "data3"  ]};

//console.log(record);

var query = {"version":3};

function insert(collectionName, record) {
  app.insertRecord(collectionName, record).then(function(items) {
    console.info('The promise was fulfilled with items!\n', items);
  }, function(err) {
    console.error('The promise was rejected', err, err.stack);
  });
}

function insertWithDelta(collectionName, record) {
  app.insertRecordWithDelta(collectionName, record).then(function(items) {
    console.info('The promise was fulfilled with items!\n', items);
  }, function(err) {
    console.error('The promise was rejected', err, err.stack);
  });
}

function delete1(collectionName, query) {
  app.deleteOne(collectionName, query).then(function(items) {
          console.info('The promise was fulfilled with items!\n', items);
  }, function(err) {
          console.error('The promise was rejected', err, err.stack);
  });
}

function deleteN(collectionName, query) {
  app.deleteMany(collectionName, query).then(function(items) {
    console.info('The promise was fulfilled with items!\n', items);
  }, function(err) {
    console.error('The promise was rejected', err, err.stack);
  });
}

function find1(collectionName,query) {
  app.findOne(collectionName,query).then(function(items) {
    console.info('The promise was fulfilled with items!\n', items);
  }, function(err) {
    console.error('The promise was rejected', err, err.stack);
  });
}

function findN(collectionName,query) {
  app.findMany(collectionName,query).then(function(items) {
    console.info('The promise was fulfilled with items!\n', items);
  }, function(err) {
    console.error('The promise was rejected', err, err.stack);
  });
}

function findRecent(collectionName) {
  app.findLatest(collectionName).then(function(items) {
    console.info('The promise was fulfilled with items!\n', items);
  }, function(err) {
    console.error('The promise was rejected', err, err.stack);
  });
}

function update(collectionName, query, updateDocParam) {
  console.log(app.update(collectionName, query, updateDocParam));
}

function updateWithDelta(collectionName,query,updateQuery) {
  app.updateWithDelta(collectionName,query,updateQuery).then(function(items) {
    console.info('The promise was fulfilled with items!\n', items);
  }, function(err) {
    console.error('The promise was rejected', err, err.stack);
  });
}



var collectionName = "versionData";
//var query = { "name" : "Company Inc", "address" : "Highway 37" };
//var updateDocParam = {"address" : "2308 University Ave"}
//var myobj = { name: "Company Inc"};


var data1 = fs.readFileSync('/Users/sushmakn/Desktop/file1.txt', 'utf8');
var data2 = fs.readFileSync('/Users/sushmakn/Desktop/file2.txt', 'utf8');
var l1 = data1.split("\n");
var l2 = data2.split("\n");
// console.log(Util.findDifference(l1,l2));
// console.log(Util.findDifference(l2,l1));


//insert(collectionName,{});
insertWithDelta(collectionName,record);
//delete1(collectionName,query);
//deleteN(collectionName,query);
//find1(collectionName,query);
//findN(collectionName,query);
//findRecent(collectionName);
//update(collectionName,{"version":3}, {"user": "abc"});
//updateWithDelta(collectionName,{"version":3}, {"user": "Sushma", "branch" : "Test"});
