var avoidanceLevel = (function () {
  var level  = PsychicLevel.create({
    name : 'avoidance',
    directory : 'assets/avoidance.json',
    pc : {
      x : 2 * 35,
      y : 3 * 35
    },
    enemies : [
      {
        x : 10,
        y : 3,
        weapons : {
          up : true,
          left : true
        },
      }, {
        x : 12,
        y : 1,
        weapons : {
          right : true,
          left : true,
          down : true
        }
      }, {
        x : 11,
        y : 8,
        weapons : {
          left : true
        }
      }, {
        x : 12,
        y : 16,
        weapons : {
          left : true,
          right : true
        }
      }, {
        x : 20,
        y : 16,
        weapons : {
          up : true
        }
      }
    ],
    tiled : true
  });

  var create = level.create;

  level.create = function () {
    create.call(level);
    level.pc.energy = 1;
    level.pc.rangedAttack.arrow.alpha = 0;
    level.tutorial = Tutorial.create([
      {
        text : "",
        time : 500
      }, {
        text : "[Tú]: A veces es muy difícil, pero debo hacerlo... Debo evitar a toda costa que me vean",
        time : 4000
      }
    ]);
  }

  return level;
})();

avoidanceLevel.nextLevel = 'defend0'
game.state.add('avoidance', avoidanceLevel);
// game.state.start('avoidance');
