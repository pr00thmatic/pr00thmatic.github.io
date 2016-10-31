var shooting101 = (function () {
  var level = PsychicLevel.create({
    name: 'shooting101',
    directory: 'assets/shooting101.json',
    pc : {
      x : 12 * 35,
      y : 16 * 35
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
        text : "[Tú]: A veces me siento atrapada",
        time : 2500
      }, {
        text : "[Psicólogo]: Nunca estás atrapada porque siempre hay una salida: EL ESCAPE",
        time : 3500
      }, {
        text : "[Psicólogo]: Debes evitarlo, pero si realmente te sientes acorralada, deberás escapar",
        time : 4500
      }, {
        text : "[Psicólogo]: Para escapar, elije la dirección con [Q] y [E], y realiza el escape con [ESPACIO]",
        time : 9000
      }, {
        text : "[Tú]: Escapar me hace sentir débil, sin poder ni control",
        time : 4000
      }, {
        text : "[Psicólogo]: Por eso es muy importante que aprendas CUÁNDO escapar, y que EVITES hacerlo a menos que no tengas opción",
        time : 9000
      }
    ]);
  };

  return level;
})();

shooting101.nextLevel = 'context-level';
game.state.add('shooting101', shooting101);
