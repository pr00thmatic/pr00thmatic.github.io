var InitialScenes = (function () {
  return {
    create : function () {
      var scenes = [
        Scene.create('view', 5000, 'room', true),
        Scene.create('room', 5000, 'street'),
        Scene.create('street', 5000, 'psychologist'),
        Scene.create('psychologist', 5000, 'movement-level'),
        Scene.create('good-ending', 4000, '')
      ];
    }
  };
})();

InitialScenes.create();
// game.state.start('context-level');
game.state.start('view');
