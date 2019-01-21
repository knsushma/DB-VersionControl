var Util = require("./utility");
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var insertRecord = function(collectionName, record) {
  return MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }).then(function(db) {
    var dbo = db.db("forkBase");
    return dbo.collection(collectionName).insertOne(record).then(function(result) {
      return "1 record inserted successfully";
    }, function(err) {
      return err;
    });
  }).then(function(result) {
    return result;
  }, function(err) {
      return err;
  });
}

var insertRecordWithDelta = function(collectionName, record) {
  return MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }).then(function(db) {
    var dbo = db.db("forkBase");
    return findLatest(collectionName).then(function(latestRecord) {
        return insertRecord(collectionName, Util.getInsertableRecord(latestRecord, record)).then(function(iResult) {
          var delta = Util.getDeltaRecord(latestRecord,record);
          return insertDeltaRecord("delta", delta).then(function(dResult) {
            console.log(dResult);
            return iResult
          }, function(err) {
              return err;
          });
        }, function(err) {
          return err;
        });
    }, function(err) {
      return err;
    });
  }).then(function(result) {
    return result;
  }, function(err) {
      return err;
  });
}

var deleteOne = function(collectionName, query) {
  return MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }).then(function(db) {
    var dbo = db.db("forkBase");
    return dbo.collection(collectionName).deleteOne(query).then(function(result) {
       return "1 record deleted successfully";
    }, function(err) {
      return err;
    });
  }).then(function(result) {
    return result;
  }, function(err) {
      return err;
  });
}

var deleteMany = function(collectionName, query) {
  return MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }).then(function(db) {
    var dbo = db.db("forkBase");
    return dbo.collection(collectionName).deleteMany(query).then(function(result) {
       return "Records deleted successfully";
    });
  }).then(function(result) {
    return result;
  });
}

var findOne = function(collectionName, query) {
  return MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }).then(function(db) {
    var dbo = db.db("forkBase");
    return dbo.collection(collectionName).findOne(query).then(function(result) {
       return result;
    }, function(err) {
      return err;
    });
  }).then(function(result) {
    return result;
  }, function(err) {
      return err;
  });
}

var findMany = function(collectionName, query) {
  return MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }).then(function(db) {
    var dbo = db.db("forkBase");
    return dbo.collection(collectionName).find(query).toArray().then(function(result) {
       return result;
    }, function(err) {
      return err;
    });
  }).then(function(result) {
    return result;
  }, function(err) {
      return err;
  });
}


var findLatest = function(collectionName) {
  return MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }).then(function(db) {
    var dbo = db.db("forkBase");
    return dbo.collection(collectionName).findOne({}, {sort:{$natural:-1}}).then(function(result) {
       return result;
    }, function(err) {
      return err;
    });
  }).then(function(result) {
    return result;
  }, function(err) {
      return err;
  });
}

var update = function updateRecord(collectionName, query,updateDocParam) {
  MongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
    if (err) return err;
    var dbo = db.db("forkBase");
    dbo.collection(collectionName).find(query).sort({$natural:-1}).limit(1).toArray(function(err, result) {
      if (err) return err;
      if ( !result || typeof result == 'undefined' || result.size == 0) return "Record not found to update";
      var tobeUpdated = Util.xah_obj_to_map(updateDocParam);
      var queryResult = Util.xah_obj_to_map(result[0]);
      var newRecord = new Map();
      queryResult.forEach(function(value, key) {
        if (tobeUpdated.has(key)) {
           newRecord.set(key,tobeUpdated.get(key));
         } else if (key != '_id') {
           newRecord.set(key,value);
         }
      });
      dbo.collection("versionData").insertOne(newRecord, function(err, res) {
      if (err) return err;
        console.log("1 document Updated");
        db.close();
      });
      });
  });
}


var updateWithDelta = function updateRecordWithDelta(collectionName, query, updateDocParam) {
  return MongoClient.connect(url, {useNewUrlParser: true}).then(function(db) {
    var dbo = db.db("forkBase");
    return dbo.collection(collectionName).find(query).sort({$natural:-1}).limit(1).toArray().then(function(result) {
      if ( !result[0] || typeof result[0] == 'undefined' || result[0].size == 0) return "Record not found to update";
      var tobeUpdated = Util.xah_obj_to_map(updateDocParam);
      var queryResult = Util.xah_obj_to_map(result[0]);
      var newRecord = new Map();
      queryResult.forEach(function(value, key) {
        if (tobeUpdated.has(key)) {
           newRecord.set(key,tobeUpdated.get(key));
         } else if (key != '_id') {
           newRecord.set(key,value);
         }
      });
      return insertRecord(collectionName, newRecord).then(function(iResult) {
        var delta = Util.getDeltaRecord(result[0],updateDocParam);
        return insertDeltaRecord("delta", delta).then(function(dResult) {
          console.log(dResult);
          return iResult
        }, function(err) {
            return err;
        });
      }, function(err) {
        return err;
      });
    }, function(err) {
      return err;
    });
  }, function(err) {
      return err;
  });
}


var insertDeltaRecord = function(collectionName, record) {
  return MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }).then(function(db) {
    var dbo = db.db("forkBase");
    return dbo.collection(collectionName).insertOne(record).then(function(result) {
      return "1 delta record inserted successfully";
    }, function(err) {
      return err;
    });
  }).then(function(items) {
    return items;
  }, function(err) {
      return err;
  });
}

module.exports = {
  insertWithStoredProcedure: function(collectionName) {
    return MongoClient.connect(url, {useNewUrlParser: true}).then(function(err, db) {
      var dbo = db.db("forkBase");
      var collection = dbo.collection(collectionName); 
      var record = {  version : 3,  timestamp : util.getTime(),  user : "Sushma",  branch : "Test",  file1 : "Testing document store",  file2 : "Test Date",  file3 : {    "variable" : "XYZ",    "function" : "I am a module"  },  file4 : {    "oldVersion" : "Old Version metadata goes here",    "newVersion" : "Old Version metadata goes here"  },  file5 : [    "data1",    "data2",    "data3"  ]};
      db.eval("sum(2, 3)", function(err, result) { 
     //dbo.eval( "insertRecord(record)", function(err, result) {
      if (err) throw err;
          return result;
          db.close();
      });
    }).then(function(result) {
      return result;
    });
  }
};


module.exports = {
  insertRecord : insertRecord,
  insertRecordWithDelta : insertRecordWithDelta,
  deleteOne : deleteOne,
  deleteMany : deleteMany,
  findOne : findOne,
  findMany : findMany,
  findLatest : findLatest,
  update : update,
  updateWithDelta : updateWithDelta,
};
