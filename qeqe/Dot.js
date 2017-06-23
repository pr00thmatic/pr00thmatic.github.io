var X=0, Y=1;

var Dot = ( function () {
    var minus = function (positive, negative) {
	return [positive[0] - negative[0], positive[1] - negative[1]];
    };

    var magnitude = function (d2Vector) {
	return Math.sqrt(Math.pow(d2Vector[X], 2) +
			 Math.pow(d2Vector[Y], 2));
    };

    var unitVector = function (d2Vector) {
	var m = magnitude(d2Vector);

	if (m==0)
	    return [0,0];

	return [d2Vector[X]/m,
		d2Vector[Y]/m];
    };

    return {
	minus : minus,
	magnitude : magnitude,
	unitVector : unitVector
    };

})();
