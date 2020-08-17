var MIN = 0,
    MAX = 1;

// INPUT
var distribution = {
  a : 0.4,
  b : 0.3,
  c : 0.2,
  d : 0.1
},
    word = "abacabad";

// needed...
var a, b, i, j;


for (i = 0; i<word.length; i++) {
  a = MAX;

  for (j in distribution) {
    b = a;
    a = (MAX-MIN) * distribution[j] + a;

    if (word[i] == j) {
      MIN = b;
      MAX = a;
      break;
    }

  }
}


