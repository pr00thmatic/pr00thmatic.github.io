var recorrido = (() => {
  function onNavpointClick (e) {
    console.log(e.source.name);
    cameras.currentCameraTarget = {
      position: e.source.position.add(new BABYLON.Vector3(0, 1.5, 0)),
      rotation: global.cam.rotation,
      duration: 1
    };
  }

  function setupNavpoints() {
    var stop = false;
    var i = 0;

    while (!stop) {
      var meshName = i == 0? 'navpoint': 'navpoint.' + ('000' + i).substr(-3);
      var mesh = global.scene.getMeshByName(meshName);
      if (!mesh) { break; stop = true; }
      utils.registerOnClicMesh(mesh, onNavpointClick);
      i++;
    }
  }

  function onSceneLoad () {
    setupNavpoints();
  }

  return {
    onSceneLoad
  };
})();
