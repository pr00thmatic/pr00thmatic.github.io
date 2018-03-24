var methods = {
};

var data = {
  dist: [{
    p: 0.3
  }, {
    p: 0.2
  }, {
    p: 0.15
  }, {
    p: 0.1
  }, {
    p: 0.1
  }, {
    p: 0.08
  }, {
    p: 0.05
  }, {
    p: 0.02
  }, {
    p: ''
  }],

  huffman: [],

  headers: [],
  row: [],

  onChange : function (dist) {
    if (dist[dist.length-1].p != '') {
      dist.push({ p: '' });
    }
  },

  generate : function () {
    var dist = [];
    var p;
    var i;
    var j;
    var inverseI;
    this.row = [];
    this.headers = [];

    for (i=0; i<this.dist.length; i++) {
      if (this.dist[i].p)
        dist.push(eval(this.dist[i].p));
    }

    this.huffman = Huffman.startRecursiveFind(dist);
    for (i=0; i<this.huffman.R.length; i++) {
      this.row.push([]);
      this.row[i].push(this.huffman.R[i].c);
    }

    for (i=0; i<this.huffman.reductions.length; i++) {
      this.headers.push("S<sub>" + i + "</sub>");
      this.headers.push("C<sub>" + i + "</sub>");

      inverseI = this.huffman.reductions.length - i -1;
      for (j=0; j<this.huffman.reductions[inverseI].length; j++) {
        if (typeof(this.huffman.reductions[inverseI][j]) != "undefined") {
          this.row[j].push(Math.round(this.huffman.reductions[inverseI][j].p * 100000) / 100000);
          this.row[j].push(this.huffman.reductions[inverseI][j].c);
        }
      }
    }
  }
}

var demo = new Vue({
  el: '#huffman-table',
  data: data
});
