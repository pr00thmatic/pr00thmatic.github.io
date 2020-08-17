var loaderSpawner = (function () {
  return {
    spawn : function () {
      console.log('spawn!');
      if (this.loader) {
        this.unspawn();
      }
      this.loader = document.createElement('img');
      this.loader.src = 'assets/auxiliar/pre-pre-loader.png';
      this.loader.classList.add('shush-black-screen');
      document.getElementsByTagName('body')[0].appendChild(this.loader);
      return this.loader;
    },

    unspawn : function () {
      if (this.loader) {
        this.loader.remove();
        this.loader = null;
      }
    }
  };
})();

window.onload = function () {
  loaderSpawner.loader =
    document.getElementsByClassName('shush-black-screen')[0];
};
