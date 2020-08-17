var Huffman = (function () {
  var symbols = '0123456789' +
        'abcdefghijklmnñopqrstuvwxyz' +
        'ABCDEFGHIJKLMNOPQRSTUVWXYZÑ' +
        '`-=][\';/.,\\~!@#$%^&*()_+}|{":?></¡¿€';

  var isIndexIn = function (item, array) {
    var i;
    for (i=0; i<array.length; i++) {
      if (item === array[i].i) {
        return true;
      }
    }

    return false;
  };

  var getCompositeProb = function (minArray) {
    var composite = {
      dependencies: [],
      p: 0
    };
    var i;

    for (i=0; i<minArray.length; i++) {
      composite.dependencies.push(minArray[i].i);
      composite.p += minArray[i].p;
    }

    if (composite.dependencies.length === 0) {
      return null;
    }

    return composite;
  };

  var copy = function (obj) {
    return JSON.parse(JSON.stringify(obj));
  };

  var findMins = function (v, r) {
    var c = copy(v);
    var i;

    for (i=0; i<c.length; i++) {
      c[i] = { p: v[i].p, i };
    }

    c.sort((a, b) => {
      return a.p - b.p;
    });

    return c.slice(0, r);
  };

  var recursiveFind = function (R, r, reductions) {
    var R2 = [];
    var min = findMins(R, r);
    var i;
    var j;
    var composite = {};
    reductions = reductions || [];

    if (R.length === r) { // STOP CONDITION! :O
      for (i=0; i<r; i++) R[i].c = symbols[i];
      return { R, r, reductions };
    }

    for (i=0; i<R.length; i++) { // unreduced probabilities
      if (!isIndexIn(i, min)) {
        R2.push({ dependencies: [i], p: R[i].p });
      }
    }

    composite = getCompositeProb(min); // reduced probability
    if (composite) R2.push(composite);

    recursiveFind(R2, r, reductions); // RECURSION!!!

    for (i=0; i<R2.length; i++) { // now lets find the codewords...
      if (R2[i].dependencies.length > 1) { // <=> reduced probability
        for (j=0; j<R2[i].dependencies.length; j++) {
          R[R2[i].dependencies[j]].class = "reduced-next";
          R[R2[i].dependencies[j]].c = R2[i].c + symbols[j];
        }
      } else { // <=> unreduced probability
        R[R2[i].dependencies[0]].c = R2[i].c;
      }
    }

    reductions.push(R2);

    return { R, r, reductions };
  };

  var startRecursiveFind = function (dist, r) {
    var R = [];
    var spurious;
    var i;

    for (i=0; i<dist.length; i++) {
      R.push({
        p: dist[i],
        dependencies: [i]
      });
    }

    spurious = r + Math.ceil((R.length-r) / (r-1)) * (r-1);

    for (i=R.length; i<spurious; i++) {
      R.push({
        p: 0,
        dependencies: [i]
      });
    }

    return recursiveFind(R, r);
  };

  return {
    recursiveFind,
    startRecursiveFind,
    findMins
  };
})();

var sampleCode = [0.3, 0.2, 0.15, 0.1, 0.1, 0.08, 0.05, 0.02];


function DX (v) {
  for (var i=0; i<v.length; i++) {
    v[i] = { p: v[i] };
  }

  return v;
}
