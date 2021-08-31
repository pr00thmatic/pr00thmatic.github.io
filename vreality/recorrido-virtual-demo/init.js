function CustomLoadingScreen( /* variables needed, for example:*/ text) {
  //init the loader
  this.loadingUIText = text;
}
CustomLoadingScreen.prototype.displayLoadingUI = function() {
  if (document.getElementById("customLoadingScreenDiv")) {
    // Do not add a loading screen if there is already one
    document.getElementById("customLoadingScreenDiv").style.display = "initial";
    return;
  }
  this._loadingDiv = document.createElement("div");
  this._loadingDiv.id = "customLoadingScreenDiv";
  this._loadingDiv.innerHTML = "scene is currently loading";
  var customLoadingScreenCss = document.createElement('style');
  customLoadingScreenCss.type = 'text/css';
  customLoadingScreenCss.innerHTML = `
    #customLoadingScreenDiv{
        background-color: #BB464Bcc;
        color: white;
        font-size:50px;
        text-align:center;
    }
    `;
  document.getElementsByTagName('head')[0].appendChild(customLoadingScreenCss);
  // this._resizeLoadingUI();
  // window.addEventListener("resize", this._resizeLoadingUI);
  document.body.appendChild(this._loadingDiv);
};
CustomLoadingScreen.prototype.hideLoadingUI = function() {
    document.getElementById("customLoadingScreenDiv").style.display = "none";
    console.log("scene is now loaded");
  // alert("Loaded!");
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

    var loadingScreen = new CustomLoadingScreen("I'm loading!!");
    // replace the default loading screen
    engine.loadingScreen = loadingScreen;
    // show the loading screen
    engine.displayLoadingUI();

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
