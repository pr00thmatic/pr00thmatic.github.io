var ChoisesLevel = (function () {
  var level = PsychicLevel.create({
    name : 'story-time',
    directory : 'assets/story-time.json',
    pc : {
      x : 20 * config.map.tile.width,
      y : 16 * config.map.tile.height
    },
    enemies : [
      {
        x : 16,
        y : 14,
        weapons : {
          right : true,
          down : true
        }
      }, {
        x : 2,
        y : 14,
        weapons : {
          right : true
        },
        velocity : {
          y : 70,
          x : 0
        }
      }, {
        x : 4,
        y : 14,
        weapons : {
          right : true,
          up : true
        },
        velocity : {
          y : -35,
          x : 0
        }
      }, {
        x : 12,
        y : 11,
        weapons : {
          right : true,
          up : true,
          down : true
        },
        velocity : {
          x : 140,
          y : 0
        }
      }, {
        x : 16,
        y : 12,
        weapons : {
          up : true,
          down : true
        },
        velocity : {
          y : 70
        }
      }, {
        x : 14,
        y : 12,
        weapons : {
          up : true,
          down : true
        },
        velocity : {
          y : 100
        }
      }, {
        x : 12,
        y : 12,
        weapons : {
          up : true,
          down : true
        },
        velocity : {
          y : 40
        }
      }, {
        x : 10,
        y : 12,
        weapons : {
          up : true,
          down : true
        },
        velocity : {
          y : 160
        }
      }, {
        x : 8,
        y : 12,
        weapons : {
          up : true,
          down : true
        },
        velocity : {
          y : 60
        }
      }, {
        x : 6,
        y : 12,
        weapons : {
          up : true,
          down : true
        },
        velocity : {
          y : 70
        }
      }, {
        x : 11,
        y : 15,
        weapons : {
          up : true,
          down : true
        },
        velocity : {
          y : 80,
          x : 0
        }
      }, {
        x : 11,
        y : 1,
        weapons : {
          down : true
        },
        velocity : {
          x : 70
        }
      }, {
        x : 12,
        y : 1,
        weapons : {
          down : true
        },
        velocity : {
          x : -105,
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
        text : "[Tú]: ella sabía que la muerte de Everlyn fue mi culpa",
        time : 3000
      }, {
        text : "[Tú]: y ahora, siempre que salgo a la calle, todos me ven",
        time : 3500
      }, {
        text : "[Tú]: su mirada es la misma que la mamá de Everlyn, ellos también saben que fue mi culpa, y eso me atormenta.",
        time : 5000
      }, {
        text : "[Psicólogo]: No fue tu culpa, y no hay forma que los demás sepan por lo que haz pasado, sus miradas no te juzgan...",
        time : 5000
      }, {
        text : "[Psicólogo]: Sus miradas son de compasión. La terapia termina aquí, no puedo ayudarte más.",
        time : 5000
      }, {
        text : "[Psicólogo]: Sal ahora, y enfrenta tus miedos. No tienes nada que temer si te haz esforzado durante la terapia.",
        time : 5000
      }
    ]);
  }

  return level;
})();

ChoisesLevel.nextLevel = 'end';
game.state.add('story-time', ChoisesLevel);
