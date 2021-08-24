var colorPicker = (() => {

  function pickColor (e) {
    console.log(e.source.material.name);
    e.source.colorRound = e.source.colorRound | 0;
    if (!e.source.material) return;

    var colors = colorPicker.colors;
    if (e.source.name.indexOf('Walls') >= 0) colors = colorPicker.wallColors;
    if (e.source.name.indexOf('Floor') >= 0) colors = colorPicker.floor;
    if (colorPicker.woodMeshes.indexOf(e.source.name) >= 0) colors = colorPicker.wood;
    if (colorPicker.clothMeshes.indexOf(e.source.name) >= 0 ||
        e.source.name.indexOf('Kitchen') >= 0||
        e.source.name.indexOf('GarageBox') >= 0)
      colors = colorPicker.cloth;
    e.source.colorRound = (e.source.colorRound + 1) % colors.length;

    e.source.material.diffuseColor = colors[e.source.colorRound];
  }

  return {
    pickColor,
    woodMeshes: [ 'Stairs', 'Door_main_mesh', 'ClosetsDoor01_mesh', 'DoorFrameB', 'HallwayDresser', 'Door_narrow_mesh',
                  'Floor_kitchen', 'KitchenSetD001', 'KitchenSetB', 'KitchenSetB002', 'Drawer',
                  'KitchenSetE', 'KitchenSetG', 'KitchenSetH001', 'KitchenSetA', 'DoorFrameA', 'KitchenSetD002', 'Door',
                  'KitchenSetB001', 'RockingChair', 'CofeeTable', 'Cabinet001', 'Dresser'],
    clothMeshes: [ 'SofaSmall', 'Blinds_wide_LOD0', 'LampCeiling', 'GarageBox009', 'ClockGlass_mtl', 'Vases01_mtl'],
    cloth: [
      new BABYLON.Color3.FromHexString('#ffffff'),
      new BABYLON.Color3.FromHexString('#aaaaaa'),
      new BABYLON.Color3.FromHexString('#777777'),
      new BABYLON.Color3.FromHexString('#444444'),
      new BABYLON.Color3.FromHexString('#951232'),
      new BABYLON.Color3.FromHexString('#1a4466'),
      new BABYLON.Color3.FromHexString('#678b54'),
      new BABYLON.Color3.FromHexString('#cdce5b'),
      new BABYLON.Color3.FromHexString('#ce8639'),
      new BABYLON.Color3.FromHexString('#f1ddc7'),
      new BABYLON.Color3.FromHexString('#afc5c7'),
      new BABYLON.Color3.FromHexString('#f9c6e9'),
      new BABYLON.Color3.FromHexString('#ffffff'),
    ],
    wood: [
      new BABYLON.Color3.FromHexString('#ffffff'),
      new BABYLON.Color3.FromHexString('#c78b51'),
      new BABYLON.Color3.FromHexString('#94602f'),
      new BABYLON.Color3.FromHexString('#92643d'),
      new BABYLON.Color3.FromHexString('#5d452c'),
      new BABYLON.Color3.FromHexString('#7c4d23'),
      new BABYLON.Color3.FromHexString('#703e14'),
      new BABYLON.Color3.FromHexString('#ba9f93'),
      new BABYLON.Color3.FromHexString('#8e4633')
    ],

    wallColors: [
      new BABYLON.Color3.FromHexString('#778894'),
      new BABYLON.Color3.FromHexString('#a0a69b'),
      new BABYLON.Color3.FromHexString('#f3dbae'),
      new BABYLON.Color3.FromHexString('#d1d2cf'),
      new BABYLON.Color3.FromHexString('#6e7a6b'),
      new BABYLON.Color3.FromHexString('#2d4151'),
      new BABYLON.Color3.FromHexString('#cbc6bd'),
      new BABYLON.Color3.FromHexString('#e9e4dd'),
      new BABYLON.Color3.FromHexString('#887975'),
      new BABYLON.Color3.FromHexString('#872e3a')
    ],

    floor: [
      new BABYLON.Color3.FromHexString('#c2938c'),
      new BABYLON.Color3.FromHexString('#b96b6d'),
      new BABYLON.Color3.FromHexString('#867778'),
      new BABYLON.Color3.FromHexString('#d4b7b0'),
      new BABYLON.Color3.FromHexString('#eacab7'),
      new BABYLON.Color3.FromHexString('#a9766e'),
      new BABYLON.Color3.FromHexString('#cea291'),
      new BABYLON.Color3.FromHexString('#dcbfa3'),
      new BABYLON.Color3.FromHexString('#eedabf'),
      new BABYLON.Color3.FromHexString('#8ea69b'),
      new BABYLON.Color3.FromHexString('#6d827b'),
      new BABYLON.Color3.FromHexString('#7f93ac'),
      new BABYLON.Color3.FromHexString('#6f7071'),
    ],

    colors: [
      new BABYLON.Color3(1,1,1),
      new BABYLON.Color3(.5,.5,.5),
      new BABYLON.Color3(.25,.25,.25)
    ]
  };

})();
