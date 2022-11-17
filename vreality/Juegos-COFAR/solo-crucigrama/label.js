var Label = {
  gimmieLabel : function (gameObject, text, style) {
    // var text = scene.add.text(0, 0, 'Hello World', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
    if (style && !style.fontFamily) {
      // style.fontFamily = 'Poppins';
      style.font = '15px Poppins';
    } else {
      style = {
        color: 0x993333,
        align: 'center',
        font: '15px Poppins'
      };
    }

    var text = scene.add.text(gameObject.x, gameObject.y, text, style? style: { color: 0x993333, align: 'center' });
    text.setOrigin(0.5, 0.5);
    text.setDepth(gameObject.depth+1);

    gameStatus.emitter.on('update', () => {
      text.x = gameObject.getCenter().x;
      text.y = gameObject.getCenter().y;
    });

    return text;
  }
}
