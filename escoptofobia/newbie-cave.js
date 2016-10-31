var newbieCave = (function () {
  var level  = PsychicLevel.create({
    name : 'newbie-cave',
    directory : 'assets/newbie-cave.json',
    pc : {
      x : 6 * 35,
      y : 12 * 35
    },
    enemies : [{
        x : 12,
        y : 13,
        weapons : {
          up : true,
          left : true,
          right : true
        },
      }],
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
        text : "[Psicólogo]: Cuando alguien podría llegar a verte, tú qué haces?",
        time : 4000
      }, {
        text : "[Tú]: Lo evito. Me escondo porque me hace daño", 
        time : 4000
      }
    ]);
  }

  return level;
})();

newbieCave.nextLevel = 'jumping101';
game.state.add('newbie-cave', newbieCave);

