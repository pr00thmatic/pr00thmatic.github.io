var Tutorial = (function () {
  var Instance = (function () {
    return {
      stop : function () {
        this.text = '';
      },
      next : function () {
        this.current++;
        if (this.current < this.frames.length) {
          this.text = this.currentFrame().text;
          game.time.events.add(this.currentFrame().time, this.next, this);
        } else {
          game.time.events.add(0, this.stop, this);
        }
      },
      currentFrame : function () {
        return this.frames[this.current];
      }
    };
  })();

  return {
    create : function (frames) {
      var style = { font: '15px Sans', fill: '#fff', align: 'center',
                    wordWrap : true, wordWrapWidth : game.width/2};

      var tutorial = game.add.text(11 * 35, 15 * 35, '', style);
      util.inheritFunctions(tutorial, Instance);
      tutorial.anchor.set(0.5,0.5);
      tutorial.frames = frames;
      zOrder.putInLayer(tutorial, 'WEAPON');
      tutorial.current = -1;

      tutorial.next();

    }
  };
})();
