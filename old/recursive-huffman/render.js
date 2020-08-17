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

  r: '',
  alert: '',

  huffman: [],

  headers: [],
  row: [],

  onChange : function (dist) {
    var i=0;

    console.log(dist);
    for (i=0; i<dist.length-1; i++) {
      if (!dist[i].p) {
        dist[i] = dist.pop();
      }
    }

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
    var reduction;

    this.row = [];
    this.headers = [];

    if (!this.r) {
      this.alert = "aridad indefinida, asumiendo r=2";
      this.r = 2;
    } else {
      this.alert = "";
    }
    this.r = eval(this.r);

    for (i=0; i<this.dist.length; i++) {
      if (this.dist[i].p)
        dist.push(eval(this.dist[i].p));
    }

    this.huffman = Huffman.startRecursiveFind(dist, this.r);
    for (i=0; i<this.huffman.R.length; i++) {
      this.row.push([]);
      this.row[i].push({
        content: this.huffman.R[i].c
      });
    }

    for (i=0; i<this.huffman.reductions.length; i++) {
      this.headers.push("S<sub>" + i + "</sub>");
      this.headers.push("C<sub>" + i + "</sub>");

      inverseI = this.huffman.reductions.length - i -1;
      console.log(this.huffman.reductions);
      for (j=0; j<this.huffman.reductions[inverseI].length; j++) {
        reduction = this.huffman.reductions[inverseI][j];
        console.log(reduction.class);
        if (typeof(reduction) != "undefined") {
          this.row[j].push({
            content: Math.round(reduction.p * 100000) / 100000,
            class: (reduction.dependencies.length > 1? 'reduced': '') +
              ' probability ' + reduction.class
          });
          this.row[j].push({
            content: reduction.c,
            class: 'symbol'
          });
        }
      }
    }
  }
}

var demo = new Vue({
  el: '#huffman-table',
  data: data
});
