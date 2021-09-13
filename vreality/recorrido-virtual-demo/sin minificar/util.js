var utils = {
  registerOnClic : function (meshName, f) {
    registerOnClicMesh(global.scene.getMeshByName(meshName), f);
  },

  registerOnClicMesh : function (mesh, f) {
    if (!mesh.actionManager) mesh.actionManager = new BABYLON.ActionManager(global.scene);
    mesh.actionManager.registerAction(utils.babylonAction(f));
  },

  babylonAction: function (f) {
    return new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, f );
  },

  lerp: function (a, b, t) {
    return {
      x: utils.lerpScalar(a.x, b.x, t),
      y: utils.lerpScalar(a.y, b.y, t),
      z: utils.lerpScalar(a.z, b.z, t)
    };
  },
  lerpScalar: function (a, b, t) {
    var theMin = Math.min(a, b);
    var theMax = Math.max(a, b);
    return Math.max(theMin, Math.min(theMax, a + t * (b - a)));
  },
  equals: function (a, b) {
    return a.x == b.x && a.y == b.y && a.z == b.z;
  },
  toVector3: function (v) {
    return new BABYLON.Vector3(v.x, v.y, v.z);
  },
  set: function (v, target) {
    target.x = v.x;
    target.y = v.y;
    target.z = v.z;
  }
};
