var contextLevel = (function () {
  var level = PsychicLevel.create({
    name : 'test-level',
    directory : 'assets/test-map.json',
    pc : {
      x : 100,
      y : 100
    },
    enemies : [
      {
        x : 13,
        y : 1,
        weapons : {
          right : true,
          left : true,
          down : true,
          up : true
        },
        velocity : {
          x : 0,
          y : 0
        }
      }, {
        x : 6,
        y : 8,
        weapons : {
          down : true,
          left : true
        },
        velocity : {
          x : 0,
          y : 0
        }
      },  {
        x : 20,
        y : 11,
        weapons : {
          left : true
        },
        velocity : {
          x : 0,
          y : 0
        }
      }
    ]
  });

  return level;
})();

game.state.add('context-level', contextLevel);
// game.state.start('context-level');
