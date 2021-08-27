var cameras = {
  currentCameraTarget: null,
  lastTarget: null,
  transitionElapsed: 0,
  lerping: true,
  initialPosition: { x: 1.042682599999999, y: 34.228874000000005, z: 42.5818329 },
  // navpointOffset: { x: 0, y: 16*10.5, z: 25 },
  navpointOffset: { x: 0, y: 1.5, z: 0 },

  goToInitialPosition: function () {
    this.currentCameraTarget = { position: this.initialPosition,
                                 rotation: global.cam.rotation,
                                 duration: 2 };
  },

  setup: function () {
    // global.scene.cameras[0].dispose();
    global.cam = new BABYLON.FreeCamera("camera1", utils.toVector3(cameras.initialPosition), global.scene);
    global.cam.rotation = new BABYLON.Vector3(0.07, -7.75, 0); // new BABYLON.Vector3(0.25, -1.27, 0);
    global.cam.minZ = 0.1;
    global.cam.angularSensibility = 5000;
    global.cam.attachControl(document.getElementById("renderCanvas"), true);

    this.goToInitialPosition();
    this.lastTarget = { position: global.cam.position.clone(), rotation: global.cam.rotation.clone(), duration: 2 };

    global.scene.registerBeforeRender(() => {
      if (!cameras.lerping) return;
      if (this.lastTarget != this.currentCameraTarget) {
        this.transitionElapsed = 0;
        this.lastTarget = this.currentCameraTarget;
      }

      var t = this.transitionElapsed / this.currentCameraTarget.duration;
      t = t > 1? 1: t;
      var p = utils.lerp(global.scene.cameras[0].position, this.currentCameraTarget.position, t);
      // var r = utils.lerp(global.scene.cameras[0].rotation, this.currentCameraTarget.rotation, t);

      global.scene.cameras[0].position = utils.toVector3(p);
      // global.scene.cameras[0].rotation = utils.toVector3(r);

      this.transitionElapsed += global.scene._engine._deltaTime / 1000;
    });
  },
};
