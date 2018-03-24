var Huffman = (function () {
  var copy = function (obj) {
    return JSON.parse(JSON.stringify(obj));
  };

  var find2Min  = function (v) {
    var a = { p: v[0].p, i: 0 };
    var b = { p: v[1].p, i: 1 };

    for (var i=2; i<v.length; i++) {
      if (v[i].p < a.p && i != b.i) {
        a = { p: v[i].p, i};
      }

      if (v[i].p < b.p && i != a.i) {
        b = { p: v[i].p, i };
      }
    }

    return [ a, b ];
  };

  var recursiveFind = function (R, reductions) {
    reductions = reductions || [];
    var R2 = [];
    var min = find2Min(R);

    for (var i=0; i<R.length; i++) {
      if (i != min[0].i && i!= min[1].i) {
        R2.push({ 0: i, p: R[i].p });
      }
    }

    if (R.length == 2) { // STOP CONDITION! :O
      R[0].c = "0";
      R[1].c = "1" ;
      return { R, reductions };
    }

    R2.push({
      0: min[0].i,
      1: min[1].i,
      p: min[0].p + min[1].p
    });

    recursiveFind(R2, reductions);

    for (i=0; i<R2.length; i++) {
      if (typeof(R2[i][1]) != "undefined") {
        R[R2[i][0]].c = R2[i].c + "0";
        R[R2[i][1]].c = R2[i].c + "1";
      } else {
        R[R2[i][0]].c = R2[i].c;
      }
    }

    reductions.push(R2);

    return { R, reductions };
  };

  var recursiveTest = function (dist, n) {
    var R = startRecursiveFind(dist);
    console.log(R, R.length);

    for (var i=0; i<n-1; i++) {
      R = recursiveFind(R);
      console.log(R, R.length);
    }
  };

  var startRecursiveFind = function (dist) {
    var R = [];

    for (var i=0; i<dist.length; i++) {
      R.push({
        p: dist[i],
        0: i
      });
    }

    console.log(recursiveFind(R));
    return recursiveFind(R);
  };

  return {
    recursiveFind,
    startRecursiveFind,
    recursiveTest,
    find2Min
  };
})();

var sampleCode = [0.3, 0.2, 0.15, 0.1, 0.1, 0.08, 0.05, 0.02];


function DX (v) {
  for (var i=0; i<v.length; i++) {
    v[i] = { p: v[i] };
  }

  return v;
}
