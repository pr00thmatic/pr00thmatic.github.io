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
      var mesh = global.scene.meshes[i];
      if (mesh.material) {
        mesh.material.backFaceCulling = false;
      }

      if (global.scene.meshes[i].name.indexOf("navpoint") >= 0) {
        utils.registerOnClicMesh(global.scene.meshes[i], onNavpointClick);
        global.navpoints.push(global.scene.meshes[i]);
        global.scene.meshes[i].isPickable = true;
      } else {
        global.scene.meshes[i].isPickable = true;
        utils.registerOnClicMesh(global.scene.meshes[i], colorPicker.pickColor);
        if (global.scene.meshes[i].material &&
            recorrido.reflective.indexOf(global.scene.meshes[i].name) >= 0 &&
            global.scene.meshes[i].material.name != 'Kitchen_mtl') {
          global.scene.meshes[i].material.reflectionTexture = new BABYLON.CubeTexture("textures/skybox", global.scene);
        }
      }
    }

    cameras.currentCameraTarget = {
      position: global.navpoints[0].position.add(new BABYLON.Vector3(0, 45, 0)),
      rotation: global.cam.rotation,
      duration: 3
    };
  }

  function onSceneLoad () {
    sky();
    setupNavpoints();
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

  return {
    reflective: [ 'Soap_LOD1', 'BathroomSink', 'LampWall001', 'GarageShelfA_LOD005', 'DoorSlide_glass_L',
                  'Teapot_LOD0', 'Toaster_LOD0', 'Refrigerator_LOD0', 'MicrowaveOven', 'KitchenSetA' ],
    onSceneLoad,
    onMouseMove
  };
})();
