var shooting101 = (function () {
  var level = PsychicLevel.create({
    name: 'shooting2',
    directory: 'assets/shooting2.json',
    pc : {
      x : 12 * 35 + 10,
      y : 16 * 35 + 10
    },
    enemies : [{
      x : 10,
      y : 8,
      weapons : {
        down : true
      }
    }, {
      x : 16,
      y : 8,
      weapons : {
        down : true
      }
    }, {
      x : 1,
      y : 2,
      weapons : {
        right : true,
        down : true
      }
    }, {
      x : 6,
      y : 6,
      weapons : {
        right : true
      }
    }, {
      x : 19,
      y : 14,
      weapons : {
        left : true
      }
    }, {
      x : 17,
      y : 8,
      weapons : {
        right : true
      }
    }, {
      x : 18,
      y : 8,
      weapons : {
        down : true
      }
    }, {
      x : 16,
      y : 16,
      weapons : {
        up : true,
        right : true,
        left : true
      }
    }],
    bonuses : [
      {
        x : 14,
        y : 16
      }
    ],
    tiled : true
  });

  var create = level.create;

  level.create = function () {
    create.call(level);
    level.tutorial = Tutorial.create([
      {
        text : "",
        time : 500
      }, {
        text : "[Psicólogo]: Es muy importante que aprendas CUÁNDO escapar, y que EVITES hacerlo a menos que no tengas opción",
        time : 9000
      }
    ]);
  };

  return level;
})();

shooting101.nextLevel = 'choises-level';
game.state.add('shooting2', shooting101);
