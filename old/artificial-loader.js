'use strict';

var domGame = {
  container: {},
  loadingImage: {
    dom: {},
    width: 520, // TODO: retrieve this automatically
    height: 360
  },

  setLoading: function (value) {
    if (value) {
      this.loadingImage.dom.classList.remove("hidden");
    } else {
      this.loadingImage.dom.classList.add("hidden");
    }
  },
  init: function (gameWidth, gameHeight) {
    var domImage = {};

    this.container = document.getElementById('game');

    domImage = this.loadingImage.dom =
      this.container.getElementsByClassName("artificial-loader")[0];

    domImage.style.left =
      (gameWidth/2 - this.loadingImage.width/2) + 'px';
    domImage.style.top =
      (gameHeight/2 - this.loadingImage.height/2) + 'px';
  }
};

window.addEventListener("load", function () {
  domGame.init();
});
