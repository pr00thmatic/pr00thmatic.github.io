var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');
// this needs to be a global variable with the current level
// because of eatBone callback, on SpiderDog.js
var lvls = [ new Level('lvl1', 'lvl1.json', game, [50,300]),
             new Level('lvl2', 'lvl2.json', game, [50,500]) ];

var currentLevel = 0;
var level = lvls[currentLevel];

game.state.add('lvl1', level);
game.state.start('lvl1');


var nextLevel = function () {
    currentLevel++;
    level = lvls[currentLevel];
    game.state.add(level.name, level);
    game.state.start(level.name);
};
