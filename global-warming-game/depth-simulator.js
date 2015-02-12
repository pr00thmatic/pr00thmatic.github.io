var layer = [];
var UNDERWATER = 0, FLOAT = 1, SKY = 2, GALAXY = 3, GOD = 4;

var addToLayer = function (sprite, layerIndex) {
    layer[layerIndex] = layer[layerIndex] || [];
    layer[layerIndex].push(sprite);
};

var simulateDepth = function () {
    for (var i=0; i<layer.length; i++) {
	if (layer[i]) {
	    sprites = layer[i];

	    sprites.sort( function (a, b) {
		return -(b.position.y - a.position.y);
	    });

	    for (var j=0; j<sprites.length; j++) {
		sprites[j].bringToTop();
	    }
	}
    }
};
