var fs = require('fs');
var list_Driver = require('../drivers/drivers.json');
var positionRequest = null;
var indexDriver = 0;

exports.getAllDriver = () => {
  return list_Driver;
}

exports.checkExitDriver = (ID) => {
  if (list_Driver.length == 0) {
    return false
  } else {
    var len = list_Driver.length
    for (var i = 0; i < len; ++i) {
      if (list_Driver[i].id == ID) {
        return true
      }
    }
  }
  return false
}

exports.updateDriver = (ID, CurrAddress, Status) => {
  var len = list_Driver.length
  for (var i = 0; i < len; ++i) {
    if(list_Driver[i].id == ID) {
      list_Driver[i].currAddress = CurrAddress;
      list_Driver[i].status = Status;
    }
  }
  var jsonFile = JSON.stringify(list_Driver)
  fs.writeFile(__dirname + "/../drivers/drivers.json", jsonFile, function (err) {
    if (err) {
        throw err;
    }
  })
}

exports.resetListDriver = () => {
  list_Driver = [];
  var jsonFile = JSON.stringify(list_Driver)
  fs.writeFile(__dirname + "/../drivers/drivers.json", jsonFile, function (err) {
    if (err) {
        throw err;
    }
  })
}

exports.addNewDriver = (Driver) => {
  list_Driver.push(Driver);
  var jsonFile = JSON.stringify(list_Driver)
  fs.writeFile(__dirname + "/../drivers/drivers.json", jsonFile, function (err) {
    if (err) {
        throw err;
    }
  })
}

exports.getDriverReady = (position) => {
  var list = []
  var lenListDriver = list_Driver.length;
  if (lenListDriver > 0) {
    for (var i = 0; i < lenListDriver; ++i) {
      if (list_Driver[i].status) {
        list.push(list_Driver[i]);
      }
    }
    // Sắp xếp mảng tăng dần theo khoảng cách
    var lenListDriverReady = list.length;
    for (var i = 0; i < lenListDriverReady - 1; ++i) {
      for(var j = i + 1; j < lenListDriverReady; ++j) {
        if(getDistanceHaversin(position, list[i].currAddress)
          > getDistanceHaversin(position, list[j].currAddress)) {
            var temp = list[i];
            list[i] = list[j];
            list[j] = temp;
        }
      }
    }
  }
  return list;
}

exports.saveDataRequest = (data) => {
  positionRequest = data;
}

exports.getDataREquest = () => {
  return positionRequest;
}

exports.increaseIndex = () => {
  indexDriver++;
}

exports.getIndex = () => {
  return indexDriver;
}

exports.resetIndex = () => {
  indexDriver = 0;
}

function getDistanceHaversin(pos1, pos2) {
  Number.prototype.toRad = function() {
    return this * Math.PI / 180;
  }
  var lat2 = pos2.lat; 
  var lon2 = pos2.lng; 
  var lat1 = pos1.lat; 
  var lon1 = pos1.lng; 

  var R = 6371;
  var x1 = lat2-lat1;
  var dLat = x1.toRad();  
  var x2 = lon2-lon1;
  var dLon = x2.toRad();  
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                  Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
                  Math.sin(dLon/2) * Math.sin(dLon/2);  
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; 
  console.log(d);
  return d;
  
}