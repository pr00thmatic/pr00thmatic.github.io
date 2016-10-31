var ChoisesLevel = (function () {
  var level = PsychicLevel.create({
    name : 'choises-level',
    directory : 'assets/choises.json',
    pc : {
      x : 2 * config.map.tile.width,
      y : 5 * config.map.tile.height
    },
    enemies : [
      {
        x : 7,
        y : 8,
        weapons : {
          up : true,
          down : true
        }
      }, {
        x : 15,
        y : 7,
        weapons : {
          left : true,
          down : true
        }
      }, {
        x : 12,
        y : 1,
        weapons : {
          left : true,
          right : true,
          down : true
        }
      }
    ],
    bonuses : [
      {
        x : 20,
        y : 16
      }
    ]
  });

  return level;
})();

ChoisesLevel.nextLevel = 'good-ending'
game.state.add('choises-level', ChoisesLevel);
