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


function grab(arrayOfObjects, prop) {
	var arrayOfProps = [];
	arrayOfObjects.forEach(function(obj){
		var p = obj[prop];
		if (p) {arrayOfProps.push(p)}
	})
	return arrayOfProps;
}