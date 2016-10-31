var Bonus = (function () {
  var speed = 120;

  var Instance = (function () {
    var collide = function (bonus, collector) {
      var i=0;

      for (i=0; i<bonus.halos.length; i++) {
        bonus.halos[i].kill();
      }

      bonus.level.bonusTaken = true;
      bonus.kill();
    };

    return {
      update : function () {
        game.physics.arcade.collide(this, this.collector, collide);
      }
    };
  })();

  var update = function () {
    this.x = this.father.x;
    this.y = this.father.y;
  };

  var addHalo = function (main, frame, direction) {
    var halo = game.add.sprite(main.x, main.y, 'bonus');

    game.physics.arcade.enable(halo);
    halo.anchor.set(0.5, 0.5);
    halo.body.allowGravity = false;
    halo.body.angularVelocity = speed * direction;

    halo.animations.add('exist', [frame]);
    halo.animations.play('exist');

    halo.father = main;
    halo.update = update;

    main.halos = main.halos? main.halos : [];
    main.halos.push(halo);
  };

  return {
    create : function (x,y, collector, tiled, level) {
      var bonus = {};
      
      if (tiled) {
        x = x * 35 + 20;
        y = y * 35 + 20;
      }

      bonus = game.add.sprite(x,y, 'bonus');
      bonus.level = level;
      game.physics.arcade.enable(bonus);
      bonus.collector = collector;
      bonus.anchor.set(0.5);
      bonus.body.allowGravity = false;

      bonus.angularVelocity = speed;
      addHalo(bonus, 1, -1);
      addHalo(bonus, 2, 1);

      util.inheritFunctions(bonus, Instance);
      asdf = bonus;

      return bonus;
    }
  };
})();
