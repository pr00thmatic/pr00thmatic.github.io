var InitialScenes = (function () {
  return {
    create : function () {
      var scenes = [
        Scene.create('view', 5000, 'room', true),
        Scene.create('room', 5000, 'street'),
        Scene.create('street', 5000, 'psychologist'),
        Scene.create('psychologist', 5000, 'avoidance')
      ];
    }
  };
})();

InitialScenes.create();
// game.state.start('context-level');
// game.state.start('view');
