(function () {
  var inputWord,
      insertButton,
      checkButton;

  trie = Trie.create(); // intentionally global

  var load = function () {
    inputWord = document.getElementById("word");
    insertButton = document.getElementById("insert");
    checkButton = document.getElementById("check");
    
    // adding events...
    insertButton.addEventListener("click", insert);
    checkButton.addEventListener("click", check);
  };

  var insert = function () {
    trie.addWord(inputWord.value);
  };

  var check = function () { // TODO: integrate with graph-it.js
    alert(trie.checkWord(inputWord.value));
  };

  window.addEventListener("load", load);

})();
