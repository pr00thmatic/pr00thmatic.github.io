var recorrido = (() => {
  function onNavpointClick (e) {
    console.log(e.source.name);
    cameras.currentCameraTarget = {
      position: e.source.position.add(utils.toVector3(cameras.navpointOffset)),
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

      if (mesh.name.indexOf("navpoint") >= 0) {
        utils.registerOnClicMesh(global.scene.meshes[i], onNavpointClick);
        global.navpoints.push(global.scene.meshes[i]);
        mesh.isPickable = true;
      } else {
        mesh.isPickable = true;
        utils.registerOnClicMesh(global.scene.meshes[i], colorPicker.pickColor);
        if (mesh.material && recorrido.reflective.indexOf(mesh.material.name) >= 0 && mesh.material.name != 'Kitchen_mtl') {
          mesh.material.environmentTexture = mesh.material.reflectionTexture =
            new BABYLON.CubeTexture("textures/skybox", global.scene);
        }
      }
    }

    if (global.scene.getMeshByName('navpoint.001')) {
      cameras.currentCameraTarget = {
        // position: global.navpoints[0].position.add(utils.toVector3(cameras.navpointOffset)),
        position: global.scene.getMeshByName('navpoint.001').position.add(utils.toVector3(cameras.navpointOffset)),
        rotation: global.cam.rotation,
        duration: 3
      };
    }
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
    reflective: [ 'DoorSlide_mtl', 'KitchenDevices_mtl', 'Kitchenware_mtl' ],
    // reflective: [ 'Soap_LOD1', 'BathroomSink', 'LampWall001', 'GarageShelfA_LOD005', 'DoorSlide_glass_L',
    //               'Teapot_LOD0', 'Toaster_LOD0', 'Refrigerator_LOD0', 'MicrowaveOven', 'KitchenSetA' ],
    onSceneLoad,
    onMouseMove
  };
})();
