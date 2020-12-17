var utils = (() => {
  return {
    onClick: function (scene, meshName, f) {
      var mesh = scene.getMeshByName(meshName);
      mesh.actionManager = new BABYLON.ActionManager(scene);
      mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, f));

      return mesh;
    }
  };
})();
