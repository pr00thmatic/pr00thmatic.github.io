var Enemy = (function () {
  var Instance = (function () {
    return {
      isActive : function () {
        return this.alpha === 1;
      }
    };
  })();
  
  return {
    create : function (x,y, attackSurfaces, opponent, level, velocity) {
      var enemy = Character.create(x,y, 'enemy', level);
      enemy.smoothed = false;

      game.physics.arcade.enable(enemy);
      enemy.body.bounce.set(1);
      zOrder.putInLayer(enemy, 'ENEMIES');
      enemy.weapons = EnemyWeapon.createAll(enemy, attackSurfaces);
      enemy.opponent = opponent;
      enemy.body.velocity.x = velocity.x | 0;
      enemy.body.velocity.y = velocity.y | 0;

      enemy.body.allowGravity = false;

      util.inheritFunctions(enemy, Instance);

      level.enemies.push(enemy);

      return enemy;
    }
  };
})();
