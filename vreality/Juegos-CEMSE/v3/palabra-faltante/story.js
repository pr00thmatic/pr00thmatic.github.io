var Story = (() => {
  var style = {
    color: "#000000",
    font: '13px Montserrat',
    wordWrap: {
      width: 300
    }
  };
  var fakeStyle = JSON.parse(JSON.stringify(style));
  fakeStyle.color = "#ff0000";
  var fillStyle = JSON.parse(JSON.stringify(style));
  fillStyle.font = '12px Montserrat';
  var lineSpacing = 3;

  var gimmieStory = function (text) {
    var margin = { x: 35, y: 30 };
    var story = {};
    var open = false;

    story.text = scene.add.text(margin.x, margin.y, '', style).setOrigin(0,0).setLineSpacing(lineSpacing);
    story.missingWords = [];

    var fake = gimmieFakeLine(margin.x, margin.y);
    var height = 0;
    var currentMissingWord = null;
    for (var i=0; i<text.length; i++) {
      if (text[i] === '_') {
        open = !open;
        if (open) {
          currentMissingWord = { start: fake.getTopRight(), word: '' };
        } else {
          currentMissingWord.end = fake.getBottomRight();
          story.missingWords.push(currentMissingWord);
        }
      } else {
        story.text.text += open? '_': text[i];
        fake.text += open? '_': text[i];
        if (open) { currentMissingWord.word += text[i]; }
      }
      if (height === 0) {
        height = story.text.height;
      } else if (height != story.text.height) {
        var residual = story.text.text.split(' ')[story.text.text.split(' ').length-1];
        var hasJump = fake.text.indexOf('\n') >= 0;
        if (hasJump) {
          fake.text = fake.text.replaceAll('\n', '');
        } else {
          fake.text = fake.text.substr(0, fake.text.length - residual.length);
        }
        fake = gimmieFakeLine(margin.x, margin.y + height + lineSpacing);
        if (!hasJump) {
          fake.text += residual;
        }
        height = story.text.height;
      }
    }

    story.text.text += '\n';
    gameStatus.emitter.emit('missing words ready');
    return story;
  };

  var gimmieFakeLine = function (x, y) {
    var line = scene.add.text(x, y, '', fakeStyle).
        setOrigin(0,0).
        setDepth(1).
        setLineSpacing(3);
    line.alpha = 0;
    return line;
  }

  return { gimmieStory : gimmieStory,
           style : style,
           fillStyle : fillStyle };
})();
