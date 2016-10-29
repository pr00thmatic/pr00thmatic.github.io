var defend0 = (function () {
  var level  = PsychicLevel.create({
    name : 'defend0',
    directory : 'assets/defend-yourself.json',
    pc : {
      x : 4 * 35,
      y : 16 * 35
    },
    enemies : [{
        x : 12,
        y : 15,
        weapons : {
          right : true,
          left : true
        },
    },{
      x : 17,
      y : 13,
      weapons : {
        down : true
      },
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
      }, {
        text : "[Psicólogo]: No tienes por qué esconderte todo el tiempo. Hay un poder dentro de tí... lo sientes?",
        time : 4000
      }, {
        text : "[Tú]: Sí, es fuerte, y brilla. Me da seguridad",
        time : 3000
      }, {
        text : "[Psicólogo]: Hay situaciones de las que no podrás huir, pero puedes usar tu poder con [W][A][S][D] para acabar con tus miedos",
        time : 9000
      }
    ]);
  }

  return level;
})();

defend0.nextLevel = 'context-level';
game.state.add('defend0', defend0);
