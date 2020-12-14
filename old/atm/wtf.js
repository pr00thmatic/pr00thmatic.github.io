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

  return {
    onSceneLoad: function (scene) {
      // var mesh = scene.getMeshByName("one");
      // mesh.actionManager = new BABYLON.ActionManager(scene);
      // mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
      //   BABYLON.ActionManager.OnPickTrigger,
      //   function () {
      //     scene.myStuff.button.textBlock.text += "1";
      //   }
      // ));

      // registerNumpadFunction("two", 2, scene);

      for (var i=0; i<numpadNames.length; i++) {
        registerNumpadFunction(numpadNames[i], i, scene);
      }



      var numbersPanel = scene.getMeshByName("numbers screen");
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
  }
})();
