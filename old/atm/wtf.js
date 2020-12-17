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
        scene.myStuff.button.textBlock.text += game.hidePin? "X": value;
        if (!scene.myStuff.button.input) scene.myStuff.button.input = "";
        scene.myStuff.button.input += value;
        document.dispatchEvent(game.onNumpadInput);
      }
    ));
  };

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
    tex.addControl(button);
  };

  var setupLighting = function (scene) {
    var light = scene.getLightByName("ambience light");
    light.intensity = 5;
  };

  var setupScreenMaterial = function (scene) {
    screenMaterial = new BABYLON.PBRMaterial("ScreenMaterial", scene);
    screen = scene.getMeshByName("screen");
    screen.material = screenMaterial;
    screen.material.unlit = true;
  };

  var goToScreen = function (screenName) {
    screen.material.albedoTexture = new BABYLON.Texture("screens/" + screenName + ".png");
  };

  var setupGreenThing = function (scene) {
    var greenThing = scene.getMeshByName("green thing");
    greenThing.material = new BABYLON.StandardMaterial("green thing material", scene);
    greenThing.material.diffuseColor = new BABYLON.Color3(0,0.1,0);
    greenThing.material.alpha = 0.7;
  };

  var setupTouchButtons = function (scene) {
    var material = new BABYLON.StandardMaterial("touch buttons", scene);
    material.alpha = 0.1;
    for (var i=0; i<4; i++) {
      var mesh = scene.getMeshByName("touch r " + i);
      mesh.material = material;
      var mesh = scene.getMeshByName("touch l " + i);
      mesh.material = material;
    }
  };

  var initialize = function (scene) {
    for (var i=0; i<numpadNames.length; i++) {
      registerNumpadFunction(numpadNames[i], i, scene);
    }
    flow.scene = scene;
    game.card = scene.getMeshByName("card");
    game.card.actionManager = new BABYLON.ActionManager(scene);
    game.card.stickInAction = new BABYLON.ExecuteCodeAction(
      BABYLON.ActionManager.OnPickTrigger,
      function () {
        if (game.isCardInside) return;
        game.isCardInside = true;
        game.skeleton.beginAnimation("StickTheCard", false, 1, flow.initializeChip);
      }
    );
    game.card.actionManager.registerAction(game.card.stickInAction);

    createNumbersPanel(scene);
    setupLighting(scene);
    setupScreenMaterial(scene);
    setupGreenThing(scene);
    setupTouchButtons(scene);
    goToScreen("0");
    numbersPanel.setEnabled(false);
    game.scene = scene;
    game.skeleton = game.scene.getSkeletonByName("Armature");
    game.numbersPanel = numbersPanel;

    game.cancelButton = utils.onClick(scene, "cancel", function () {
      if (!game.isCardInAnimationOver) return;
      flow.cancel();
    });

    game.okButton = scene.getMeshByName("ok");

    game.eraseButton = utils.onClick(scene, "erase", function () {
      scene.myStuff.button.textBlock.text = "";
      scene.myStuff.button.input = "";
    });
  };

  var screenMaterial;
  var screen;
  var numbersPanel;

  return {
    onSceneLoad: function (scene) {
      initialize(scene);
    },
    onNumpadInput: new Event('onNumpadInput'),
    screenMaterial: screenMaterial,
    screen: screen,
    goToScreen: goToScreen,
    isCardInside: false,
    isCardInAnimationOver: false
  };
})();
