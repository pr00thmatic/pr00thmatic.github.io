var asdf = 5;
var game = (() => {
  var numpadNames = [
    "zero", "one", "two", "three", "four", "five",
    "six", "seven", "eight", "nine"
  ];

  var registerNumpadFunction = function (name, value, scene) {
    var mesh = scene.getMeshByName(name);
    mesh.actionManager = new BABYLON.ActionManager(scene);
    mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
      BABYLON.ActionManager.OnPickTrigger,
      function () {
        scene.myStuff.button.textBlock.text += value;
      }
    ));
  }

  var createNumbersPanel = function (scene) {
    numbersPanel = scene.getMeshByName("numbers screen");
    var tex =
        BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(numbersPanel);
    var button = BABYLON.GUI.Button.CreateSimpleButton("but1", "");
    scene.myStuff.button = button;
    button.width = 1;
    button.height = 1;
    button.color = "white";
    button.fontSize = 100;
    button.background = "green";
    tex.addControl(button);
  }

  var setupLighting = function (scene) {
    var light = scene.getLightByName("ambience light");
    light.intensity = 5;
  }

  var setupScreenMaterial = function (scene) {
    screenMaterial = new BABYLON.PBRMaterial("ScreenMaterial", scene);
    screen = scene.getMeshByName("screen");
    screen.material = screenMaterial;
    screen.material.unlit = true;
  }

  var goToScreen = function (screenName) {
    screen.material.albedoTexture = new BABYLON.Texture("screens/" + screenName + ".png");
  }

  var screenMaterial;
  var screen;
  var numbersPanel;

  return {
    onSceneLoad: function (scene) {
      for (var i=0; i<numpadNames.length; i++) {
        registerNumpadFunction(numpadNames[i], i, scene);
      }
      createNumbersPanel(scene);
      setupLighting(scene);
      setupScreenMaterial(scene);
      goToScreen("0");
      numbersPanel.setEnabled(false);
      game.scene = scene;
    },
    screenMaterial: screenMaterial,
    screen: screen
  }
})();

// setTimeout(() => {
//   var material = new BABYLON.PBRMaterial("thisHasToWork", game.scene);
//   material.unlit = true;
//   material.albedoTexture = new BABYLON.Texture("screens/2.png");
//   var screen = game.scene.getMeshByName("screen");
//   screen.material = material;
// }, 1000);
