var contextLevel = (function () {
  var level = PsychicLevel.create({
    name : 'test-level',
    directory : 'assets/test-map.json',
    pc : {
      x : 100,
      y : 100
    },
    enemies : [
      {
        x : 13,
        y : 1,
        weapons : {
          right : true,
          left : true,
          down : true,
          up : true
        },
        velocity : {
          x : 0,
          y : 0
        }
      }, {
        x : 6,
        y : 8,
        weapons : {
          down : true,
          left : true
        },
        velocity : {
          x : 0,
          y : 0
        }
      },  {
        x : 19,
        y : 6,
        weapons : {
          left : true
        },
        velocity : {
          x : 0,
          y : 0
        }
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
        text : "[Tú]: Ese día, esa pequeña niña estaba atrapada en una casa en llamas.",
        time : 4000
      }, {
        text : "[Tú]: Se llamaba Everlyn, sólamente tenía 5 años. Decidí rescatarla",
        time : 3800
      }, {
        text : "[Tú]: pero no fui lo suficientemente rápida",
        time : 3000
      }, {
        text : "[Tú]: la casa explotó conmigo y la niña adentro, yo sobreviví, pero la niña no.",
        time : 4800
      }, {
        text : "[Tú]: Salí en llamas con su cuerpecito inerte, y su mamá me miró",
        time : 3000
      }
    ]);
  }

  return level;
})();

contextLevel.nextLevel = 'story-time';
game.state.add('context-level', contextLevel);
// game.state.start('context-level');
