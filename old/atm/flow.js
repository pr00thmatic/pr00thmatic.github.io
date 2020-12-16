var flow = (() => {
  var initializeChip = function (scene) {
    game.goToScreen("1");
    setTimeout(() => {
      game.goToScreen("2");
      setTimeout(() => {
        game.goToScreen("3");
      }, 5000);
    }, 5000);
  }

  return {
    initializeChip: initializeChip
  };
})();
