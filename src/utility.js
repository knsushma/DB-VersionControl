var getTime = function getTimeNow() {
  	var d = new Date();
	var curr_date = d.getDate();
	var curr_month = d.getMonth();
	var curr_year = d.getFullYear();
	return (curr_month + "-" + curr_date + "-" + curr_year);
}

var xah_obj_to_map = function(obj) {
  const mp = new Map();
  Object.keys(obj).forEach (k => {
    if ( k != '_id' ) {
      mp.set(k, obj[k])
    }
  });
  return mp;
}

var addToMapObj = function(map, toToAdded) {
  toToAdded.forEach(function(value, key) {
    if (key != '_id') {
      map.set(key, {"added" : value});
    }
  });
  return map;
}

Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) == -1;});
};

var findDifference = function difference(a1, a2) {
  var result = [];
  for (var i = 0; i < a1.length; i++) {
    if (a2.indexOf(a1[i]) === -1) {
      result.push(a1[i]);
    }
  }
  return result;
}

var getInsertableRecord = function(oldData, newData) {
  var record = new Map();
  var newRecord = xah_obj_to_map(newData); 
  if ( !oldData || typeof oldData == 'undefined' || oldData == null || oldData.size == 0) {
    return newRecord;
  }
  if (newRecord.size == 0) {
    return record;
  }
  record = xah_obj_to_map(oldData);
  newRecord.forEach(function(value, key) {
    if (!record.has(key)) {
      record.set(key,value);
    } else if (record.get(key)!=value) {
      record.set(key,value);
    }
  });
  return record;
}

var getDeltaRecord = function(oldRecord, newRecord) {
  var record = new Map(new Map());
  if ( !oldRecord || typeof oldRecord == 'undefined' || oldRecord == null || oldRecord.size == 0) {
    if (newRecord != null && newRecord.size != 0) {
      newRecord = xah_obj_to_map(newRecord);
      newRecord.forEach(function(value, key) {
        if (key != '_id') record.set(key, {"added" : value, "removed" : {}});
      });
    }  
  } else if ( !newRecord || typeof newRecord == 'undefined' || newRecord == null || newRecord.size == 0) {
    if (oldRecord != null && oldRecord.size != 0) {
      oldRecord = xah_obj_to_map(oldRecord);
      oldRecord.forEach(function(value, key) {
        if (key != '_id') record.set(key, {"added" : {}, "removed" : value});
      });
    } 
  }  else {
    oldRecord = xah_obj_to_map(oldRecord);
    newRecord = xah_obj_to_map(newRecord);
    newRecord.forEach(function(value, key) {
      if (key != '_id') {
        if (!oldRecord.has(key)) {
          record.set(key, {"added" : value, "removed" : {}});
        } else if (oldRecord.get(key)!=value) {
          record.set(key, {"added" : findDifference(value.split("\n"),oldRecord.get(key).split("\n")), "removed" : findDifference(oldRecord.get(key).split("\n"),value.split("\n"))});
        }
      }
    });
  }
  return record;
}

module.exports = {
  getTime : getTime,
  xah_obj_to_map : xah_obj_to_map,
  findDifference : findDifference,
  getInsertableRecord : getInsertableRecord,
  getDeltaRecord : getDeltaRecord
}
