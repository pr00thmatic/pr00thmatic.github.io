var shooting101 = (function () {
  var level = PsychicLevel.create({
    name: 'jumping101',
    directory: 'assets/jumping101.json',
    pc : {
      x : 1 * 35,
      y : 9 * 35
    },
    enemies : [{
      x : 1,
      y : 5,
      weapons : {
        right : true
      }
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
        text : "[Tú]: A veces tengo que ser muy sigilosa para no llamar la atención",
        time : 2500
      }, {
        text : "[Tú]: cuando eso sucede, debo presionar [ARRIBA] durante un muy corto tiempo.",
        time : 3500
      }
    ]);
  };

  return level;
})();

shooting101.nextLevel = 'avoidance';
game.state.add('jumping101', shooting101);
