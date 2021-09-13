BABYLON.DefaultLoadingScreen.prototype.displayLoadingUI = function () {
  if (this._loadingDiv) {
    // Do not add a loading screen if there is already one
    return;
  }
  this._loadingDiv = document.createElement("div");
  this._loadingDiv.id = "babylonjsLoadingDiv";
  this._loadingDiv.style.opacity = "0";
  this._loadingDiv.style.transition = "opacity 1.5s ease";
  this._loadingDiv.style.pointerEvents = "none";
  // Loading text
  // Generating keyframes
  var style = document.createElement('style');
  style.type = 'text/css';
  document.getElementsByTagName('head')[0].appendChild(style);
  // Loading img
  var imgBack = new Image();
  imgBack.src = "scene v4/vreality logo.png";
  imgBack.style.position = "absolute";
  imgBack.style.left = "50%";
  imgBack.style.top = "50%";
  // imgBack.style.marginLeft = "-60px";
  // imgBack.style.marginTop = "-60px";
  imgBack.style.animation = "spin1 2s infinite ease-in-out";
  imgBack.style.webkitAnimation = "spin1 2s infinite ease-in-out";
  imgBack.style.transformOrigin = "50% 50%";
  imgBack.style.webkitTransformOrigin = "50% 50%";
  this._loadingDiv.appendChild(imgBack);
  this._resizeLoadingUI();
  window.addEventListener("resize", this._resizeLoadingUI);
  this._loadingDiv.style.backgroundColor = "#ffffff";// this._loadingDivBackgroundColor;
  document.body.appendChild(this._loadingDiv);
  this._loadingDiv.style.opacity = "1";
};

var global = {
  engine: null,
  scene: null,
  cam: null,
  navpoints: []
};

global.init = (() => {
  var canvas = document.getElementById("renderCanvas");
  var engine = null;
  var scene = null;
  var sceneToRender = null;

  var createDefaultEngine = function() {
    var engine = new BABYLON.Engine(canvas, true, {
      preserveDrawingBuffer: true,
      stencil: true,
      disableWebGL2Support: false});

    // var loadingScreen = new CustomLoadingScreen("I'm loading!!");
    // // replace the default loading screen
    // engine.loadingScreen = loadingScreen;
    // // show the loading screen
    // engine.displayLoadingUI();

    return engine;
  };

  var delayCreateScene = function () {
    global.scene = new BABYLON.Scene(engine);
    BABYLON.SceneLoader.Append(
      "scene v4/babylon bake/",
      "casa.babylon",
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
    var light = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(.8,.8,.8), global.scene);
    light.intensity = .6;
    light.diffuse = new BABYLON.Color3(1,1,1);
    light.specular = new BABYLON.Color3(1,1,1);
    light.groundColor = new BABYLON.Color3(1,1,1);

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
