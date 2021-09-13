var reflections = (() => {
  var generateSatelliteMaterial = function (root, color, others) {
    var material = new BABYLON.StandardMaterial("satelliteMat" + root.name, global.scene);
    material.diffuseColor = color;

    var probe = new BABYLON.ReflectionProbe("satelliteProbe" + root.name, 512, global.scene);
    for (var index = 0; index < others.length; index++) {
      probe.renderList.push(others[index]);
    }

    material.reflectionTexture = probe.cubeTexture;

    material.reflectionFresnelParameters = new BABYLON.FresnelParameters();
    material.reflectionFresnelParameters.bias = 0.02;

    root.material = material;
    probe.attachToMesh(root);
  }

  var setup = function () {
    var ketle = global.scene.getMeshByName('Teapot_LOD1');

    var mainMaterial = new BABYLON.StandardMaterial("main", global.scene);
    ketle.material = mainMaterial;
    global.scene.getMeshByName('KitchenSetA.001').material = mainMaterial;
    global.scene.getMeshByName('Refrigerator_LOD0').material = mainMaterial;

    var probe = new BABYLON.ReflectionProbe("main", 512, global.scene);
    for (var i=0; i<reflections.renderInProbe.length; i++) {
      probe.renderList.push(global.scene.getMeshByName(reflections.renderInProbe[i]));
    }

    mainMaterial.diffuseColor = new BABYLON.Color3(0.25,0.25,0.255);
    mainMaterial.reflectionTexture = probe.cubeTexture;
    mainMaterial.reflectionFresnelParameters = new BABYLON.FresnelParameters();
    mainMaterial.reflectionFresnelParameters.bias = 0.02;
  }

  return {
    setup,
    renderInProbe: ['kitchen walls', 'Window_wide', 'KitchenSetA', 'floor kitchen', 'roof kitchen']
  };
})();
