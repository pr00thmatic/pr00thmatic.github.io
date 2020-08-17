
bancos = [];

/**
 * Todos los bancos de Bolivia, aprobados por la ASFI
 * se encuentran en esta lista ( fuente: https://www.asfi.gob.bo/EntidadesFinancieras/EntidadesReguladas/Intermediaci%C3%B3nFinanciera/Bancos_AR.aspx )
 * 
 * Las imágenes de cada banco, se encuentran en una carpeta con su nombre, contenida en la misma carpeta en la que se encuentra este archivo. Estas imágenes son sólamente de prueba, y deben ser reemplazadas por imágenes más "apropiadas".
 * 
 * "banco.png", es el banner que saldrá sobre el banco al que el jugador entra para sacar su tarjeta de crédito. Debe ser reemplazada por una imagen con el logo del banco, y debe tener el mismo tamaño (alto y ancho, en pixeles) de la imagen contenida en esa carpeta
 * 
 * "tarjeta.png", es la tarjeta que sale sobre la cabeza del jugador, luego de que sacó su tarjeta de crédito en el banco. Debe ser reemplazada por una imagen con el logo del banco, y debe tener el mismo tamaño (alto y ancho, en pixeles) de la imagen contenida en esa carpeta
 *
 * Para que un banco no se muestre en el menú, se debe poner su atributo "enabled" en true. Por ejemplo, el banco bisa, ahora está desactivado, y no se muestra en el menú inicial... Si se cambia su atributo "enabled" a true, el banco bisa se mostrará en el menú.
 * 
 */

bancos.push({
  nombre : 'Banco Unión',
  imagenBanco : 'banco-union/banco.png',
  enabled : true,
  imagenTarjeta : 'banco-union/tarjeta.png'
});

bancos.push({
  nombre : 'BNB',
  imagenBanco : 'bnb/banco.png',
  enabled : false,
  imagenTarjeta : 'bnb/tarjeta.png'
});

bancos.push({
  nombre : 'Bisa',
  imagenBanco : 'bisa/banco.png',
  enabled : false,
  imagenTarjeta : 'bisa/tarjeta.png'
});

bancos.push({
  nombre : 'Crédito de Bolivia',
  imagenBanco : 'bcp/banco.png',
  enabled : false,
  imagenTarjeta : 'bcp/tarjeta.png'
});

bancos.push({
  nombre : 'Económico',
  imagenBanco : 'economico/banco.png',
  enabled : false,
  imagenTarjeta : 'economico/tarjeta.png'
});

bancos.push({
  nombre : 'Ganadero',
  imagenBanco : 'ganadero/banco.png',
  enabled : false,
  imagenTarjeta : 'ganadero/tarjeta.png'
});

bancos.push({
  nombre : 'Solidario',
  imagenBanco : 'solidario/banco.png',
  enabled : false,
  imagenTarjeta : 'solidario/tarjeta.png'
});

bancos.push({
  nombre : 'Prodem',
  imagenBanco : 'prodem/banco.png',
  enabled : false,
  imagenTarjeta : 'prodem/tarjeta.png'
});

bancos.push({
  nombre : 'Fomento a iniciativas Económicas',
  imagenBanco : 'fie/banco.png',
  enabled : false,
  imagenTarjeta : 'fie/tarjeta.png'
});

bancos.push({
  nombre : 'De la Nación Argentina',
  imagenBanco : 'bna/banco.png',
  enabled : false,
  imagenTarjeta : 'bna/tarjeta.png'
});

bancos.push({
  nombre : 'Do Brasil',
  imagenBanco : 'do-brasil/banco.png',
  enabled : false,
  imagenTarjeta : 'do-brasil/tarjeta.png'
});

bancos.push({
  nombre : 'Fortaleza',
  imagenBanco : 'fortaleza/banco.png',
  enabled : false,
  imagenTarjeta : 'fortaleza/tarjeta.png'
});

bancos.push({
  nombre : 'Fassil',
  imagenBanco : 'fassil/banco.png',
  enabled : false,
  imagenTarjeta : 'fassil/tarjeta.png'
});


link_de_descarga_del_manual = 'http://www.boa.bo/';
