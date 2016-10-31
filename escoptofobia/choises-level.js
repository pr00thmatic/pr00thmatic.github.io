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
        x : 6,
        y : 8,
        weapons : {
          up : true,
          down : true
        }
      }, {
        x : 15,
        y : 8,
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

  var create = level.create;

  level.create = function () {
    create.call(level);
    level.tutorial = Tutorial.create([
      {
        text : "",
        time : 500
      }, {
        text : "[Psicólogo]: Siempre fue así? siempre le tuviste miedo a las miradas?",
        time : 3000
      }, {
        text : "[Tú]: No... sabe? de pequeña yo quería ser un súper héroe",
        time : 3000
      }, {
        text : "[Tú]: Porque me encantaba ver a la gente sonreír cuando le ayudaba",
        time : 3000
      }, {
        text : "[Tú]: Y cuando me enteré que los bomberos hacían ese tipo de cosas",
        time : 2000
      }, {
        text : "[Tú]: Dios! estaba fascinada... al salir de colegio, me volví una bombero!",
        time : 4000
      }
    ]);
  }

  return level;
})();

ChoisesLevel.nextLevel = 'context-level'
game.state.add('choises-level', ChoisesLevel);
