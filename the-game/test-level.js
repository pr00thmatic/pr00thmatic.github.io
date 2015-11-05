var testLevel = (function () {
  var level = Level.create({
    name : 'test-level',
    directory : 'assets/test-map.json',
    pc : {
      x : 100,
      y : 100
    },
    enemies : [
      {
        x : 300,
        y : 315,
        weapons : {
          right : true,
          left : true,
          down : true
        },
        velocity : {
          x : 0,
          y : 0
        }
      }, {
        x : 700,
        y : 70,
        weapons : {
          down : true,
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

game.state.add('test-level', testLevel);
// game.state.start('test-level'); 


