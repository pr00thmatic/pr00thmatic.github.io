var recorrido = (() => {
  function onNavpointClick (e) {
    console.log(e.source.name);
    cameras.currentCameraTarget = {
      position: e.source.position.add(new BABYLON.Vector3(0, 16*3, 0)),
      rotation: global.cam.rotation,
      duration: 3
    };
  }

  function setupNavpoints() {
    for (var i=0; i<global.scene.meshes.length; i++) {
      if (global.scene.meshes[i].name.indexOf("navpoint") >= 0) {
        utils.registerOnClicMesh(global.scene.meshes[i], onNavpointClick);
        global.navpoints.push(global.scene.meshes[i]);
        global.scene.meshes[i].isPickable = true;
      }
    }

    cameras.currentCameraTarget = {
      position: global.navpoints[0].position.add(new BABYLON.Vector3(0, 45, 0)),
      rotation: global.cam.rotation,
      duration: 3
    };
  }

  function setupColorLoopers () {
    for (var i=0; i<global.scene.meshes.length; i++) {
      if (global.scene.meshes[i].name.indexOf("colorlooper") >= 0) {
        utils.registerOnClicMesh(global.scene.meshes[i], loopColorOnClick);
      }
    }
  }

  function onSceneLoad () {
    setupNavpoints();
    setupColorLoopers();
    // global.scene.onPointerMove = function () {
    //   recorrido.onMouseMove();
    // }
  }

  function onMouseMove () {
    var pickResult = global.scene.pick(global.scene.pointerX, global.scene.pointerY);

    if (pickResult.hit) {
      console.log(pickResult);
    }
  }

  function loopColorOnClick (e) {
    var arr = e.source.material.subMaterials;
    arr.push(arr.shift());
  }

  return {
    onSceneLoad,
    onMouseMove
  };
})();
