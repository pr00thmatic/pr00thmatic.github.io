var movementTutorialLevel = (function () {
  var level  = PsychicLevel.create({
    name : 'movement-tutorial',
    directory : 'assets/movement-tutorial.json',
    pc : {
      x : 2 * 35,
      y : 11 * 35
    },
    enemies : [],
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
        time : 1000
      }, {
        text : "[Psicólogo]: quiero que te relajes y confíes en mí. Estás en tu interior, éste es tu mundo cognitivo",
        time : 3000
      }, {
        text : "[Psicólogo]: Muévete con los cursores [DERECHA] e [IZQUIERDA]", 
        time : 3000
      }, {
        text : "[Psicólogo]: A menudo te toparás con obstáculos a lo largo de esta terapia, pero debes ser fuerte, y seguir adelante.",
        time : 3500
      }, {
        text : "[Psicólogo]: Para afrontar estos obstáculos, presiona [ARRIBA]",
        time : 3000
      }
    ]);
  }

  return level;
})();

movementTutorialLevel.nextLevel = 'newbie-cave';
game.state.add('movement-level', movementTutorialLevel);
// game.state.start('movement-level');
