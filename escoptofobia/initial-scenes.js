var skipIntro = true;
var skipIntro = false;

var InitialScenes = (function () {
  return {
    create : function () {
      var scenes = [
        Scene.create('view', skipIntro ? 0 : 5000, 'room', true),
        Scene.create('room', skipIntro ? 0 : 5000, 'street'),
        Scene.create('street', skipIntro ? 0 : 5000, 'psychologist'),
        Scene.create('psychologist', skipIntro ? 0 : 5000, 'movement-level'),
        Scene.create('good-ending', skipIntro ? 0 : 4000, '')
      ];
    }
  };
})();

InitialScenes.create();
// game.state.start('context-level');
game.state.start('view');
