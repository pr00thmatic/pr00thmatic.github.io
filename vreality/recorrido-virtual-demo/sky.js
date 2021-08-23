var sky = (() => {
  var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:1000.0}, global.scene);
  var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", global.scene);
  skyboxMaterial.backFaceCulling = false;
  skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("textures/skybox", global.scene);
  skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
  skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
  skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
  skybox.material = skyboxMaterial;
});
