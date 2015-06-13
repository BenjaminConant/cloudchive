
function grab(arrayOfObjects, prop) {
  var arrayOfProps = [];
  arrayOfObjects.forEach(function(obj){
    var p = obj[prop];
    if (p) {arrayOfProps.push(p)}
  })
  return arrayOfProps;
}

exports.clean = function(board) {
  for (var key in board) {
  	if (board[key].constructor === Array) {
  		if (board[key].length) {
  			if (board[key][0]._id) {
  				board[key] = grab(board[key], '_id');
  			}
  		}
  	}
  }
  return board
};

exports.removeOne = function(array, idx) {
  return array.splice(idx, 1);
}

exports.removeMatch = function(array, match) {
  var removeIdx;
  var remove = false;
  array.forEach(function(elm, idx) {
    console.log("elm", elm, "match", match);
    if (elm == match) {
      removeIdx = idx;
      remove = true;
      console.log("got to elm match case");
    }
  });
  if (remove) {array.splice(removeIdx, 1);}
}