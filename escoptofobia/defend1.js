var defend1 = (function () {
  var level  = PsychicLevel.create({
    name : 'defend1',
    directory : 'assets/defend1.json',
    pc : {
      x : 20 * 35,
      y : 4 * 35
    },
    enemies : [{
      x : 19,
      y : 7,
      weapons : {
        down : true
      },
    }, {
      x : 1,
      y : 7,
      weapons : {
        right : true
      },
    }, {
      x : 8,
      y : 11,
      weapons : {
        up : true
      }
    }, {
      x : 9,
      y : 13,
      weapons : {
        down : true
      }
    }, {
      x : 13,
      y : 16,
      weapons : {
        right : true
      }
    }, {
      x : 13,
      y : 12,
      weapons : {
        right : true
      }
    }, {
      x : 7,
      y : 9,
      weapons : {
        left : true,
        right : true
      }
    }],
    bonuses: [{
      x : 16,
      y : 16
    }],
    tiled : true
  });

  var create = level.create;

  level.create = function () {
    create.call(level);
    level.pc.rangedAttack.arrow.alpha = 0;
    level.tutorial = Tutorial.create([
      {
        text : "",
        time : 500
      }
    ]);
  }

  return level;
})();

defend1.nextLevel = 'shooting101';
game.state.add('defend1', defend1);
