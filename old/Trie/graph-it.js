// (function () {
var canvas,
    context,
    lvlHeight = 20,
    margin = 10,
    X = 0,
    Y = 1;

var load = function () {
  canvas = document.getElementById("trie-canvas");
  context = canvas.getContext("2d"); // TODO: fallback if canvas not supported
};

var drawTrie = function (trie, lvl, fatherCoords) {
  var word, x=0;
  
  if (!lvl) { lvl = 0; }

  for (word in trie) {
    if (word == "LAMBDA") {
      word = "0";
    }
    drawNode(word, x, lvlHeight * lvl);
    x += margin;
    drawTrie(trie[word], lvl+1);
  }

};

var drawNode = function (text, x,y) {
  context.fillText(text, x, y);
};

window.addEventListener("load", load);
// })();
