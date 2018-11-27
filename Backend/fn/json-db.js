var fs = require('fs');
var list_Driver = require('../drivers/drivers.json');
var list_Driver_Customer = require('../drivers/drivers_customers.json');
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
  writeFileDrivers();
}

exports.resetListDriver = () => {
  list_Driver = [];
  writeFileDrivers();
}

exports.addNewDriver = (Driver) => {
  list_Driver.push(Driver);
  writeFileDrivers();
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

exports.updateLocateDriver = (id, pos) => {
  var driverUpdate = getDriverByID(id);
  var distance = getDistanceHaversin(pos, driverUpdate.currAddress);
  if (distance * 1000 > 100) {
    return false
  } else {
    var len = list_Driver.length;
    for (var i = 0; i < len; ++i) {
      if(list_Driver[i].id == id) {
        list_Driver[i].currAddress.lat = pos.lat;
        list_Driver[i].currAddress.lng = pos.lng;
        writeFileDrivers();
      }
    }
  }
  return true;
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

exports.addDriverCustomer = (idDriver, idCustomer, posDriver, posCustomer) => {
  var newBook = {
    idDriver: idDriver,
    idCustomer: idCustomer,
    posDriver: posDriver,
    posCustomer: posCustomer
  }
  list_Driver_Customer.push(newBook);
  writeFileBooks();
}

exports.getBookByID = (id) => {
  var len = list_Driver_Customer.length;
  if (len == 0) {
    return -1;
  } else {
    for(var i = 0; i < len; ++i) {
      if(list_Driver_Customer[i].idCustomer == id) {
        return list_Driver_Customer[i];
      }
    }
  }
}

function getDriverByID(id) {
  for(var i = 0; i < list_Driver.length; ++i) {
    if(list_Driver[i].id == id) {
      return list_Driver[i];
    }
  }
}

function writeFileBooks() {
  var jsonFile = JSON.stringify(list_Driver_Customer)
  fs.writeFile(__dirname + "/../drivers/drivers_customers.json", jsonFile, function (err) {
    if (err) {
        throw err;
    }
  })
}

function writeFileDrivers() {
  var jsonFile = JSON.stringify(list_Driver)
  fs.writeFile(__dirname + "/../drivers/drivers.json", jsonFile, function (err) {
    if (err) {
        throw err;
    }
  })
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
  return d;
  
}