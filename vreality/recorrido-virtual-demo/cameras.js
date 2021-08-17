var cameras = {
  currentCameraTarget: null,
  lastTarget: null,
  transitionElapsed: 0,

  setup: function () {
    // var camPlaceholder = global.scene.getCameraByName("Camera");
    global.cam = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(4, 27.5, -1.31), global.scene);
    global.cam.rotation = new BABYLON.Vector3(1.3, -0.3979, 0);
    global.cam.minZ = 0.1;
    // global.cam = new BABYLON.FreeCamera("camera1", camPlaceholder.position, global.scene);
    // global.cam.rotation = camPlaceholder.rotation;
    global.cam.attachControl(document.getElementById("renderCanvas"), true);

    this.lastTarget = { position: global.cam.position,
                        rotation: global.cam.rotation,
                        duration: 1 };
    this.currentCameraTarget = { position: global.cam.position,
                                 rotation: global.cam.rotation,
                                 duration: 1 };

    global.scene.registerBeforeRender(() => {
      if (this.lastTarget != this.currentCameraTarget) {
        this.transitionElapsed = 0;
        this.lastTarget = this.currentCameraTarget;
      }

      var t = this.transitionElapsed / this.currentCameraTarget.duration;
      var p = utils.lerp(global.scene.cameras[0].position, this.currentCameraTarget.position, t);
      var r = utils.lerp(global.scene.cameras[0].rotation, this.currentCameraTarget.rotation, t);

      utils.set(p, global.scene.cameras[0].position);
      utils.set(r, global.scene.cameras[0].rotation);

      this.transitionElapsed += global.scene._engine._deltaTime / 1000;
    });
  },
};
