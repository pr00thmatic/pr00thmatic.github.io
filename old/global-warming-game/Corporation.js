var Corporation = function (game, player, sun, score) {
    this.refineries = [];
    this.refinerySpawnCooldown = 300;
    this.timeRemainingForRefinerySpawn = 0;
    this.player = player;
    this.sun = sun;
    this.score = score;

    this.model = new Refinery(0,0);
    score.scoreUp(-model.points);
    model.justDie();

    this.game = game;
    this.setMargins();

};

Corporation.prototype.randomBetween = function(minimum, maximum) {
    return this.floor(this.random() * (maximum - minimum) + minimum);
};

Corporation.prototype.setMargins = function () {
    this.margin = this.margin || {};

    this.margin.left = model.sprite.width * model.sprite.anchor.x;
    this.margin.right = ( this.game.world.width -
			  model.sprite.width +
			  this.margin.left );

    this.margin.top = this.model.sprite.height * this.model.sprite.anchor.y;
    this.margin.bottom = ( this.game.world.height -
			   this.model.sprite.height +
			   this.margin.top );

};

Corporation.prototype.recycleRefinery = function () {
    // looking for a dead refinery.
    var newRefinery;
    for (var i=0; i<refineries.length; i++) {
	if (!refineries[i].isAlive()) {
	    newRefinery = refineries[i];
	}
    }

    if (newRefinery) // found a dead refinery. Recycling it...
	newRefinery.reset(x,y);

    return newRefinery;
};

Corporation.prototype.spawnRefinery = function () {
    var x = randomBetween(margin.left, margin.right);
    var y = randomBetween(margin.top, margin.bottom);

    var refinery = recycleRefinery(x, y);

    if (!refinery) {
	refinery = new Refinery(x, y, iceberg); // !!
    }
};
