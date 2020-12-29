var utils = (() => {
  return {
    onClick: function (scene, meshName, f) {
      var mesh = scene.getMeshByName(meshName);
      mesh.actionManager = new BABYLON.ActionManager(scene);
      mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, f));

      return mesh;
    },
    moveTowards: function (current, target, deltaSpeed) {
      var direction = utils.normalize(utils.sum(target, utils.multiply(current, -1)));
      return {
        x: utils.moveTowardsScalar(current.x, target.x, Math.abs(deltaSpeed * direction.x)),
        y: utils.moveTowardsScalar(current.y, target.y, Math.abs(deltaSpeed * direction.y)),
        z: utils.moveTowardsScalar(current.z, target.z, Math.abs(deltaSpeed * direction.z)),
      }
    },
    moveTowardsScalar: function (current, target, deltaSpeed) {
      var dir = Math.sign(target - current);
      var newCurrent = current + dir * deltaSpeed;

      if (Math.sign(target - newCurrent) != dir) {
        newCurrent = target;
      }

      return newCurrent;
    },
    normalize : function (v) {
      return utils.divide(v, utils.magnitude(v));
    },
    magnitude : function (v) {
      return Math.sqrt(Math.pow(v.x, 2) + Math.pow(v.y, 2) + Math.pow(v.z, 2));
    },
    multiply : function (v, s) {
      return {
        x : v.x * s,
        y : v.y * s,
        z : v.z * s,
      };
    },
    divide : function (v, s) {
      return {
        x : v.x / s,
        y : v.y / s,
        z : v.z / s,
      };
    },
    sum : function (a, b) {
      return {
        x: a.x + b.x,
        y: a.y + b.y,
        z: a.z + b.z
      };
    },
    lerp: function (min, max, t) {
      return Math.max(min, Math.min(max, min + t * (max - min)));
    },
    equals: function (a, b) {
      return a.x == b.x && a.y == b.y && a.z == b.z;
    }
  };
})();
