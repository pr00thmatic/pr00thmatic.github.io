var init = (() => {
  var canvas = document.getElementById("renderCanvas");

  var engine = null;
  var scene = null;
  var sceneToRender = null;
  var button;

  var createDefaultEngine = function() {
    return new BABYLON.Engine(canvas, true, {
      preserveDrawingBuffer: true,
      stencil: true,
      disableWebGL2Support: false});
  };

  var delayCreateScene = function () {
    var scene = new BABYLON.Scene(engine);
    scene.myStuff = {};
    BABYLON.SceneLoader.Append(
      "scenes/Atm/",
      "atm.babylon",
      scene,
      game.onSceneLoad
    );
    return scene;
  };

  var engine;
  var scene;

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
    scene = delayCreateScene();
  };

  initFunction().then(() => {
    sceneToRender = scene
    engine.runRenderLoop(function () {
      if (sceneToRender && sceneToRender.activeCamera) {
        sceneToRender.render();
      }
    });
  });

  // Resize
  window.addEventListener("resize", function () {
    engine.resize();
  });
})();
