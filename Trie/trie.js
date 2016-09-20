var Trie = {
  LAMBDA : "LAMBDA",

  create : function () {
    trie = {};

    var addWord = function (word) {
      var i=0,
          subtrie = this.trie;

      for (; i<word.length; i++) {
        if (!subtrie[word[i]]) {
          subtrie[word[i]] = {};
        }
        subtrie = subtrie[word[i]];
      }

      subtrie[Trie.LAMBDA] = true;
    };

    var checkWord = function (word) {
      var i=0,
          subtrie = this.trie;

      for (; i<word.length; i++) {
        if (!subtrie[word[i]]) {
          return false;
        }
        subtrie = subtrie[word[i]];
      }

      return subtrie[Trie.LAMBDA];
    };

    return {
      addWord : addWord,
      checkWord : checkWord,
      trie : trie
    };
  }
};
