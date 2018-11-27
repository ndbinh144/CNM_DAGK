exports.revertList = (list) => {
  console.log(list);
  var list_result = []
  var len = list.length;
  for (var i = len - 1; i >= 0; --i) {
    list_result.push(list[i]);
  }
  return list_result;
}