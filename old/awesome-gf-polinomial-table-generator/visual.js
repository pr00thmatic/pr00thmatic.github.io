document.addEventListener("DOMContentLoaded", function (event) {
  var visual = (function () {
    document.getElementById('calculate').addEventListener('click', () => {
      var retrievedDegree = document.getElementById('n');
      var n = eval(retrievedDegree.value);
      var M = polinomialGFProduct.multiplicationTable(n);
      var result = '';

      for (var i=0; i<M.length; i++) {
        result += M[i].join(', ') + '\n';
      }

      document.getElementById('result').value = result;
    });

  })();
});
