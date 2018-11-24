var fs = require('fs')
var list_Driver = require('../drivers/drivers.json')

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

exports.addNewDriver = (Driver) => {
  list_Driver.push(Driver);
  var jsonFile = JSON.stringify(list_Driver)
  fs.writeFile(__dirname + "/../drivers/drivers.json", jsonFile, function (err) {
    if (err) {
        throw err;
    }
  })
}

exports.getDriverReady = () => {
  var list = []
  var len = list_Driver.length;
  if (len > 0) {
    for (var i = 0; i < len; ++i) {
      if (list_Driver[i].status) {
        list.push(list_Driver[i]);
      }
    }
  }
  return list;
}