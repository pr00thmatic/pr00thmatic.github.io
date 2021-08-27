var colorPicker = (() => {

  function pickColor (e) {
    console.log(e.source.material.name);
    if (!e.source.material) return;
    colorPicker.loops[e.source.material.name] = colorPicker.loops[e.source.material.name] | 0;

    // var colors = colorPicker.colors;
    var colors = null;
    // if (e.source.name.indexOf('Walls') >= 0) colors = colorPicker.wallColors;
    colors = colorPicker.wallColors;
    if (e.source.material.name.indexOf('floor') >= 0 || e.source.material.name.indexOf('roof') >= 0) colors = colorPicker.floor;
    // if (colorPicker.woodMeshes.indexOf(e.source.material.name) >= 0 ||
    //     e.source.material.name.indexOf('Door') >= 0) colors = colorPicker.wood;
    // if (colorPicker.clothMeshes.indexOf(e.source.name) >= 0 ||
    //     e.source.name.indexOf('Kitchen') >= 0)
    //   colors = colorPicker.cloth;
    // // if (colors == null) return;
    colorPicker.loops[e.source.material.name] = (colorPicker.loops[e.source.material.name] + 1) % colors.length;
    e.source.material.albedoColor = colors[colorPicker.loops[e.source.material.name]];
    // e.source.material.diffuseColor = colors[colorPicker.loops[e.source.material.name]];
  }

  return {
    loops: {},
    pickColor,
    woodMeshes: [ 'Stairs_mtl', 'Closets_door_mtl', 'DoorFrame_mtl', 'Door_white_mtl', 'Windows', 'RockingChair_mtl', 'Fireplace_mtl' ],
    clothMeshes: [ 'SofaSmall', 'Blinds_wide_LOD0', 'ClockGlass_mtl', 'Vases01_mtl', 'BlindsAndJalousie_mtl'],
    // banned: [ 'HallwayDresser_mtl' ],
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
