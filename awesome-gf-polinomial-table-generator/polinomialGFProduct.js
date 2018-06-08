var platform = 'node';
try {
  const toCSV = require('array-to-csv');
  const fs = require('fs');
} catch (error) {
  platform = 'browser';
}

// CAMBIAR ESTO PARA GENERAR DIFERENTES TABLAS DE MULTIPLICAR!!
var n = 4;
var content = '';

var polinomialGFProduct = (function () {
  function rotate (word, degree) {
    var rotated = word;
    var i;

    if (degree === 0) {
      return word;
    }

    if (degree === 1) {
      rotated = rotated.split('');
      for (i=0; i<rotated.length; i++) {
        rotated[i] = word[(i+1) % rotated.length];
      }

      return rotated.join('');
    }

    for (i=degree; i>0; i--) {
      rotated = this.rotate(rotated, 1);
    }

    return rotated;
  }

  function sum (a, b) {
    var c = [];
    var i;

    for (i=0; i<a.length; i++) {
      c[i] = (a[i] === b[i]? '0': '1');
    }

    return c.join('');
  }

  function product (a, b) {
    var product = '0'.repeat(a.length);
    var i;

    for (i=0; i<a.length; i++) {
      if (a[i] === '1') {
        product = this.sum(product, this.rotate(b, (a.length - 1 - i)));
      }
    }

    return product;
  }

  function multiplicationTable (degree) {
    var i, j;
    var M = [];
    M[0] = ['x'.repeat(degree)];

    for (i=1; i<= (1<<degree); i++) {
      M[i] = [];
      M[0][i] = M[i][0] = this.binary(i-1, degree);
    }

    for (i=1; i<M.length; i++) {
      for (j=1; j<M.length; j++) {
        M[i][j] = this.product(M[0][j], M[i][0]);
      }
    }

    return M;
  }

  function binary (number, symbols) {
    var result = "0".repeat(symbols).split('');

    for (var i=0; i<symbols; i++) {
      result[symbols - 1 - i] = (number & (1<<i)) !== 0? '1': '0';
    }

    return result.join('');
  }
  
  return {
    rotate,
    sum,
    product,
    multiplicationTable,
    binary
  };
})();

if (platform === 'node') {
  console.log('se generará un archivo .csv con el siguiente contenido:');

  content = toCSV(polinomialGFProduct.multiplicationTable(n));
  console.log(content);

  console.log('el archivo se llamará ' + n + '.csv y puede ser importado a excel');

  console.log('para importarlo a excel, copiar el texto del archivo .csv, y pegarlo mediante pegado especial, luego poner los delimiters como ","');

  fs.writeFile('./' + n + '.csv', content, function (err) {
    if (err) {
      console.log('no pude guardar el archivo, apareció este error :(');
      console.log(err);
    } else {
      console.log('archivo generado exitosamente! :D');
    }
  });
  module.exports = polinomialGFProduct;
}

