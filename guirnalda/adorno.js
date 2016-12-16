(function () {
  guirnalda();
  
  function guirnalda () {
    var width = 9;
    var M = [];
    var middle = Math.floor(width/2);

    for (var i=0; i<(width*2 + 3); i++) {
      M[i] = [];
      for (var j=0; j<width; j++) {
        if (i > width*2 && middle-1 <= j && j <= middle+1) {
          M[i][j] = '|';
        } else if (i <= width*2 && middle - i/4 <= j && j <= middle + i/4) {
          M[i][j] = Math.random() < 0.8 ? 'x' : 'o'
        } else {
          M[i][j] = ' ';    
        }
      }
    }

    M[0][middle] = '*';

    document.getElementById('guirnalda').innerHTML = toText(M);
    console.log('\033[2J');
    console.log(M);

    setTimeout( function () {
      guirnalda();
    }, 1000);
  }

  function toText (M) {
    var s = "";

    for (var i=0; i<M.length; i++) {
      for (var j=0; j<M[i].length; j++) {
        if (M[i][j] == '*') {
          s += '<span class="star">' + M[i][j] + '</span>';
        } else if (M[i][j] == 'o') {
          s += '<span class="light">' + M[i][j] + '</span>';
        } else if (M[i][j] == 'x') {
          s += '<span class="tree">' + M[i][j] + '</span>';
        } else {
          s += M[i][j];
        }
      }
      s += '</br>';
    }

    return s;
  }
})();
