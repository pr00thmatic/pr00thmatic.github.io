var asdf = 5;
var game = (() => {
  var numpadNames = [
    "zero", "one", "two", "three", "four", "five",
    "six", "seven", "eight", "nine"
  ];

 var amountPanel;

  var registerNumpadFunction = function (name, value, scene) {
    var mesh = scene.getMeshByName(name);
    mesh.actionManager = new BABYLON.ActionManager(scene);
    mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
      BABYLON.ActionManager.OnPickTrigger,
      function () {
        if (game.numbersPanel.isEnabled) {
          game.numbersPanel.button.textBlock.text += game.hidePin? "X": value;
          if (!game.numbersPanel.button.input) game.numbersPanel.button.input = "";
          game.numbersPanel.button.input += value;
          document.dispatchEvent(game.onNumpadInput);
        }
        if (game.amountPanel.isEnabled) {
          if (!game.amountPanel.value) game.amountPanel.value = "";
          game.amountPanel.value = eval(game.amountPanel.value + "" + value);
          game.amountPanel.button.textBlock.text = (game.amountPanel.value / 100).toFixed(2);
          document.dispatchEvent(game.onNumpadInput);
        }
      }
    ));
  };

  var createButton = function (scene, meshName, buttonName) {
    var mesh = scene.getMeshByName(meshName);
    var tex =
        BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(mesh);
    var button = BABYLON.GUI.Button.CreateSimpleButton(buttonName, "");
    mesh.button = button;
    button.width = 1;
    button.height = 1;
    button.color = "white";
    button.fontSize = 100;
    tex.addControl(button);
    return mesh;
  }

  var createNumbersPanel = function (scene) {
    game.numbersPanel = createButton(scene, "numbers screen", "but1");
  };

  var createAmountPanel = function (scene) {
    game.amountPanel = createButton(scene, "amount", "amount  button");
  }

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
    game.invisibleMaterial = new BABYLON.StandardMaterial("touch buttons", scene);
    game.invisibleMaterial.alpha = 0.1;
    for (var i=0; i<4; i++) {
      var mesh = scene.getMeshByName("touch r " + i);
      mesh.material = game.invisibleMaterial;
      var mesh = scene.getMeshByName("touch l " + i);
      mesh.material = game.invisibleMaterial;
    }
    scene.getMeshByName("receipt hitbox").material =
      scene.getMeshByName("money out hitbox").material = game.invisibleMaterial;
  };

  var cancelFunction = function () {
    if (!game.isCardInAnimationOver || game.capturedCard || game.blocked) return;
    flow.cancel();
  };

  var erasePanels = function () {
    game.numbersPanel.button.textBlock.text = "";
    game.numbersPanel.button.input = "";
    game.amountPanel.value = 0
    game.amountPanel.button.textBlock.text = "0.00";
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
        game.card.actionManager.actions = [];
        game.skeleton.beginAnimation("StickTheCard", false, 1, flow.initializeChip);
      }
    );
    game.card.actionManager.registerAction(game.card.stickInAction);

    createNumbersPanel(scene);
    createAmountPanel(scene);
    setupLighting(scene);
    setupScreenMaterial(scene);
    setupGreenThing(scene);
    setupTouchButtons(scene);
    goToScreen("0");
    game.numbersPanel.setEnabled(false);
    game.amountPanel.setEnabled(false);

    game.scene = scene;
    game.skeleton = game.scene.getSkeletonByName("Armature");

    game.cancelButton = utils.onClick(scene, "cancel", cancelFunction);
    game.okButton = scene.getMeshByName("ok");
    game.eraseButton = utils.onClick(scene, "erase", erasePanels);
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
    cancelFunction : cancelFunction,
    wrongCode: 0,
    isCardInside: false,
    capturedCard: false,
    isCardInAnimationOver: false,
    blocked: false,
    erasePanels: erasePanels
  };
})();
