let colors = {
  toHex: function (ox) { return '#' + ox.substr(2); },
  global: {
    wrong: '0xC14612',
    right: '0x12C185',
    fill: '0xFFFFFF',
    stroke: '0xFD8204',
    accent: '0X9E28B5',
    highlight: '0xF0F0F0'
  }
};
let banco = {
  trivia : {
    lider_1_1: [
      {
        question: '¿Cuáles son los roles de los líderes comunitarios?',
        answers: ['Crear planes o proyectos para la comunidad',
                  'Identificar problemáticas dentro de la comunidad',
                  'Promover la participación de los miembros de la comunidad',
                  'Coordinar con distintas instancias e instituciones',
                  'Todas son correctas' ],
        correctAnswer: 4,
      }, {
        question: 'Las y los líderes comunitarios para proteger a las niñas, niños y adolescentes pueden realizar acciones de prevención, identificación, atención y derivación de casos de violencia.',
        answers: ['Verdadero', 'Falso' ],
        correctAnswer: 0
      }, {
        question: '¿Qué ley se enfoca en la protección de las niñas, niños y adolescentes en Bolivia?',
        answers: ['La ley de educación Avelino Siñani -Elizardo Perez',
                  'La constitución',
                  'El código Niño, Niña y Adolescente o Ley 548' ],
        correctAnswer: 2
      }, {
        question: 'Según el Código Niño, Niña y Adolescente, ¿quiénes son los encargados de proteger el bienestar de los niños, niñas y adolescentes?',
        answers: ['El gobierno',
                  'Los padres y madres',
                  'El Estado, los gobernantes, las familias y la sociedad en general' ],
        correctAnswer: 2
      }
    ]
  },

  crucigrama: {
    prueba: '{"words":[{"capsule":{"origin":{"r":3,"c":3},"end":{"r":9,"c":3}},"word":"MUNDIAL","number":{"position":{"x":65,"y":70},"number":1},"hint":{"text":"1: Competencia internacional de fútbol donde intervienen los mejores países del mundo","position":{"x":34,"y":300}}},{"capsule":{"origin":{"r":8,"c":3},"end":{"r":8,"c":12}},"word":"AZKARGORTA","number":{"position":{"x":45,"y":190},"number":2},"hint":{"text":"2: Apellido del entrenador de la selección boliviana del 94","position":{"x":34,"y":355}}},{"capsule":{"origin":{"r":8,"c":10},"end":{"r":12,"c":10}},"word":"RUSIA","number":{"position":{"x":205,"y":170},"number":3},"hint":{"text":"3: Lugar en el que fue el pasado mundial de fútbol","position":{"x":34,"y":390}}},{"capsule":{"origin":{"r":12,"c":3},"end":{"r":12,"c":10}},"word":"MARADONA","number":{"position":{"x":45,"y":270},"number":4},"hint":{"text":"4: El jugador argentino que llevaba el 10 antes de Messi","position":{"x":34,"y":425}}}],"numberStyle":{"font":"15px Poppins","color":"#FD8204","align":"center"},"hintStyle":{"color":"#000000","font":"15px Poppins","wordWrap":{"width":290}}}'
  },
};
