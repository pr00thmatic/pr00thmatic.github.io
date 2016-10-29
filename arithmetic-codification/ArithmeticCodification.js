var LetterDistribution = {
  A: 11.72,  B: 1.49,  C: 3.87,  D: 4.67,
  E: 13.72,  F: 0.69,  G: 1.00,  H: 1.18,
  I: 5.28,  J: 0.52,  K: 0.11,  L: 5.24,
  M: 3.08,  N: 6.83,  O: 8.44,  P: 2.89,
  Q: 1.11,  R: 6.41,  S: 7.20,  T: 4.60,
  U: 4.55,  V: 1.05,  W: 0.04,  X: 0.14,
  Y: 1.09,  Z: 0.47
}; // suman 97.39%

var ArithmeticCodification = {};

ArithmeticCodification.create = function () {
  return {
    source : {
      a : 0.396,
      b : 0.297,
      c : 0.198,
      d : 0.099,
      $ : 0.01
    },

    MIN : 0,
    MAX : Number.MAX_VALUE/2,
    MAX_ITERATIONS : 100000,
    accuracyLimitReached : false,

    encode : function (word) {
      var a, b, i, j, L, D;

      word += "$";
      word = word.toUpperCase();

      var min = this.MIN,
          max = this.MAX;

      for (i=0; i<word.length; i++) {
        a = min;

        for (j in this.source) {
          b = a;
          a = (max - min) * this.source[j] + a;

          if (word[i] == j) {
            min = b;
            max = a;
            break;
          }
        }
      }

      // TODO: return a beautifull number!!
      return (min + max)/2;
    },

    decode : function (number, wordLength) {
      var a, b, i, j, min, max, word = "", found = "", infinityLoopGuard = 0;
      this.accuracyLimitReached = false;

      var min = this.MIN,
          max = this.MAX;

      // for (i=0; i<wordLength; i++) {
      while (found != "$" && infinityLoopGuard < this.MAX_ITERATIONS) {
        infinityLoopGuard++;
        a = min;

        for (j in this.source) {
          b = a;
          a = (max - min) * this.source[j] + a;

          if (b < number && number < a) {
            min = b;
            max = a;
            word += j;
            found = j;
            break;
          }
        }
      }

      if (infinityLoopGuard === this.MAX_ITERATIONS) {
        this.accuracyLimitReached = true;
      }
      return word.substr(0, word.length-1).toLowerCase();
    },

    digestLetterDistribution : function () {
      var letter;
      this.source = {};
      
      for (letter in LetterDistribution) {
        this.source[letter] = LetterDistribution[letter]/100;
      }

      this.source["$"] = this.source["."] = this.source[" "] = this.source[","] =
        0.0261 * 0.25;
    },

    digestEquiprobableLetterDistribution : function () {
      var letter;
      this.source = {};

      for (letter in LetterDistribution) {
        this.source[letter] = 1/30;
      }

      this.source["$"] = this.source["."] = this.source[" "] = this.source[","] =
        1/30;
    },

    test : function (word) {
      return this.decode(this.encode(word));
    }
  };
}

uneven = ArithmeticCodification.create();
uneven.digestLetterDistribution();

even = ArithmeticCodification.create();
even.digestEquiprobableLetterDistribution();
