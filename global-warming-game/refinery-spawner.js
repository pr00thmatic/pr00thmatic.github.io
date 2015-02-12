// because a corporation spawns a lot of refineries
// got it? lots of refineries ha ha ha ha
// ...
// ok, no ._.
var Corporation = function () {
    var model;
    var refineries = [];
    var margin = { left: 0,
		   right: 0,
		   top: 0,
		   down: 0 };
    var worldWidth;
    var worldHeight;
    var refinerySpawnCooldown = 300;
    var timeRemainingForRefinerySpawn = 0;
    var iceberg;
    var game;

    var setGame = function (theGame) {
	game = theGame;
	model = new Refinery(0,0);
	score.scoreUp(-model.points);
	model.justDie();
	worldWidth = game.world.width;
	worldHeight = game.world.height;
	setMargins();
    };

    var setPlayer = function (player) {
	iceberg = player;
    };

    var setSpawnCooldown = function (cooldown) {
	refinerySpawnCooldown = cooldown;
    };

    var setMargins = function () {
	margin.left = model.sprite.width * model.sprite.anchor.x;
	margin.right = -(model.sprite.width - margin.left) + worldWidth;
	margin.top = model.sprite.height * model.sprite.anchor.y;
	margin.bottom = -(model.sprite.height - margin.top) + worldHeight;
	console.log(margin);
    };

    var randomBetween = function (minimum, maximum) {
	return Math.floor(Math.random() * (maximum - minimum) + minimum);
    };

    var recycleRefinery = function (x, y) {
	// looking for a dead refinery.
	var newRefinery;
	for (var i=0; i<refineries.length; i++) {
	    if (!refineries[i].isAlive()) {
		newRefinery = refineries[i];
		break;
	    }
	}

	if (newRefinery) // found a dead refinery. Recycling it...
	    newRefinery.reset(x,y);

	return newRefinery; // returns null if a dead refinery was not found.
    };

    var spawnRefinery = function () {
	var x = randomBetween(margin.left, margin.right);
	var y = randomBetween(margin.top, margin.bottom);

	var refinery = recycleRefinery(x, y);

	if (!refinery) {
	    refinery = new Refinery(x,y, iceberg);
	    refineries.push(refinery);
	}

	console.log('spawn on ' + x + ',' + y,
		    refinery);

	return refinery;
    };

    var cassualtiesCount = function () {
	for (var i=0; i<refineries.length; i++) {
	    console.log(i + " ", refineries[i].isAlive());
	}
    };

    var update = function () {
	timeRemainingForRefinerySpawn--;
	if (timeRemainingForRefinerySpawn <= 0) {
	    // gets harder with the time!
	    refinerySpawnCooldown *= .99;
	    timeRemainingForRefinerySpawn = refinerySpawnCooldown;
	    spawnRefinery();
	}

	for (var i=0; i<refineries.length; i++) {
	    refineries[i].update();
	}
    };

    return { refineries : refineries,
	     spawnRefinery : spawnRefinery,
	     cassualtiesCount : cassualtiesCount,
	     setSpawnCooldown : setSpawnCooldown,
	     setPlayer : setPlayer,
	     setGame : setGame,
	     update : update
	   };
};
