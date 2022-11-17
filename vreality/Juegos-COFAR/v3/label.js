var Label = {
  gimmieLabel : function (gameObject, text, style) {
    // var text = scene.add.text(0, 0, 'Hello World', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
    var text = scene.add.text(gameObject.x, gameObject.y, text, style? style: { color: 0x993333, align: 'center' });
    text.setOrigin(0.5, 0.5);
    text.setDepth(gameObject.depth+1);

    gameStatus.emitter.on('update', () => {
      if (!gameObject.getCenter) return;
      text.x = gameObject.getCenter().x;
      text.y = gameObject.getCenter().y;
    });

    return text;
  }
}
