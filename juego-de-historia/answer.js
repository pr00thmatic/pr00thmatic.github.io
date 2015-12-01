var Answer = (function () {
  var Instance = (function () {
    return {
      canBeLooted : function () {
        return Marker.Instance.canBeLooted.call(this) &&
          this.level.qaMenu.getSelectedQuestion() === this.question;
      },
      canBeSpawned : function () {
        var i;
        
        for (i=0; i<progress.answer.length; i++) {
          if (progress.answer[i].text === this.text) {
            return false;
          }
        }

        return true;
      },
      getLooted : function () {
        console.log(this.text, 'IS GETTING LOOTED!!');
        Marker.Instance.getLooted.call(this);
        this.level.qaMenu.addAnswer(this)
      }
    }
  })();

  return {
    /**
     * Creates a question.
     * @param{string} text - the question asked in text.
     * @param{Question.create()} question - the question that 
     * answers this answer.
     * @param{{x: int, y: int, levelName: string}} place -
     * the x, y coordinate of the marker, and the level where this answer can
     * be looted.
     */
    create : function (text, place, question) {
      var answer = Marker.create(text, place, 'answer');
      util.inheritFunctions(answer, Instance);
      answer.question = question;
      this.collection.push(answer);

      return answer;
    },
    initialize : function (lvl) {
      this.lootAnswerKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
      this.lootAnswerKey.onDown.add(this.checkLoot, this);
    },
    checkLoot : function () {
      var i = this.collection.length,
          answer;
      while (i--) {
        answer = this.collection[i];
        if (answer.canBeLooted()) {
          answer.getLooted();
          // answer.level.qaMenu.addAnswer(this);
        } else {
          console.log('nope');
        }
      }
    },
    update : function () {
      console.log(this.canBeLooted());
    },
    spawn : Marker.spawn,
    collection : []
  };
})();

(function () {
  var i, q, a;

  for (i=0; i<config.qa.length; i++) {
    q = config.qa[i].question;
    q = Question.create(q.text, q.place);
    q.index = i;

    a = config.qa[i].answer;
    a = Answer.create(a.text, a.place, q);
    a.index = i;
  }
})();

