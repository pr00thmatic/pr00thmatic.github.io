var global = {
  engine: null,
  scene: null,
  cam: null,
};

global.init = (() => {
  var canvas = document.getElementById("renderCanvas");
  var engine = null;
  var scene = null;
  var sceneToRender = null;

  var createDefaultEngine = function() {
    return new BABYLON.Engine(canvas, true, {
      preserveDrawingBuffer: true,
      stencil: true,
      disableWebGL2Support: false});
  };

  var delayCreateScene = function () {
    global.scene = new BABYLON.Scene(engine);
    BABYLON.SceneLoader.Append(
      "assets/scenes/",
      "recorrido virtual.babylon",
      global.scene,
      global.init.setup
    );
  };

  initFunction = async function() {
    var asyncEngineCreation = async function() {
      try {
        return createDefaultEngine();
      } catch(e) {
        console.log("the available createEngine function failed. Creating the default engine instead");
        return createDefaultEngine();
      }
    }

    engine = await asyncEngineCreation();
    if (!engine) throw 'engine should not be null.';
    delayCreateScene();
  };

  initFunction().then(() => {
    sceneToRender = global.scene
    engine.runRenderLoop(function () {
      if (sceneToRender && sceneToRender.activeCamera) {
        sceneToRender.render();
      }
    });
  });

  var setup = function () {
    var light = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(1, 1, 0), global.scene);
    light.intensity = 2;
    light.diffuse = new BABYLON.Color3(.8,.8,.8);
    light.specular = new BABYLON.Color3(1,0,0);
    light.groundColor = new BABYLON.Color3(.1,.1,0);

    cameras.setup();
    recorrido.onSceneLoad();
  }

  // Resize
  window.addEventListener("resize", function () {
    engine.resize();
    // if (window.innerHeight < window.innerWidth) {
    //   game.scene.cameras[0].fov=0.6911;
    // } else {
    //   game.scene.cameras[0].fov=1.2;
    // }
  });
  return {
    setup: setup
  };
})();
