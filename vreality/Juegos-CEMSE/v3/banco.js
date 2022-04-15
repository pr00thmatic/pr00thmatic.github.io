let colors = {
  toHex: function (ox) { return '#' + ox.substr(2); },
  global: {
    wrong: '0xC14612',
    right: '0x12C185'
  },
  nino: {
    fill: '0xFFF3C8',
    stroke: '0xFFC907'
  },
  puber: {
    fill: '0xFFE790',
    stroke: '0xFF8D07'
  },
  adolescente: {
    fill: '0xFFC690',
    stroke: '0xFA6A35'
  },
  cuidador: {
    fill: '0xF5FEE2',
    stroke: '0x87BC1F'
  },
  educador: {
    fill: '0xE1FFA6',
    stroke: '0x5D8C01'
  },
  lider: {
    fill: '0xEAFFFA',
    stroke: '0x006E54'
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
    ],
    cuidador_1_4: [
      {
        question: '¿Qué es el sexo?',
        answers: [
          'Tiene relación con tus características físicas y biológicas, si eres hombre o mujer.',
          'Son aquellas reglas que pone nuestra sociedad respecto a cómo debemos ser o actuar según nuestro sexo.',
          'Ninguna de las otras opciones'
        ],
        correctAnswer: 0
      }, {
        question: '¿Qué es el género?',
        answers: [
          'Tiene relación con tus características físicas y biológicas, si eres hombre o mujer.',
          'Son aquellas reglas que pone nuestra sociedad respecto a cómo debemos ser o actuar según nuestro sexo.',
          'Ninguna de las otras opciones'
        ],
        correctAnswer: 1
      }, {
        question: 'Los hombres pueden... Hay más de una respuesta correcta',
        answers: [
          'Ser fuertes y sensibles',
          'Hacerse cargo de sus hijas e hijos',
          'Tener cualquier profesión u ocupación'
        ],
        correctAnswer: [0,1,2]
      }, {
        question: 'Las mujeres pueden... Hay más de una respuesta correcta',
        answers: [
          'Ser fuertes y sensibles',
          'Hacerse  cargo de sus hijas e hijos',
          'Tener cualquier profesión u ocupación'
        ],
        correctAnswer: [0,1,2]
      }
    ],
    cuidador_2_3: [
      {
        question: '¿De quién o quiénes es la responsabilidad y obligación de realizar tareas domésticas y crianza de las hijas e hijos?',
        answers: [
          'Solo de las madres.',
          'Madres, padres y cuidadores.',
          'Solo de los padres.'
        ],
        correctAnswer: 1,
      }, {
        question: '¿Qué debemos evitar decir las madres, padres y cuidadores?',
        answers: [
          'Esto lo hacen solo las mujeres.',
          'Los hombres no lloran.',
          'Los niños no juegan con muñecas.',
          'Todas.'
        ],
        correctAnswer: 3
      }, {
        question: 'Las muñecas son juguetes para:',
        answers: [
          'Niñas', 'Niños', 'Todos y todas'
        ],
        correctAnswer: 2
      }, {
        question: 'Si soy testigo de alguna burla sexista yo debo:',
        answers: [
          'Reírme',
          'Manifestar mi inconformidad y explicar porque es equivocada esa burla sexista.',
          'No se puede hacer nada'
        ],
        correctAnswer: 1
      }, {
        question: 'Las mujeres siempre se deben encargar de las tareas del hogar.',
        answers: [ 'Verdadero', 'Falso' ],
        correctAnswer: 1
      }, {
        question: 'Los hombres nunca lloran',
        answers: [ 'Verdadero', 'Falso' ],
        correctAnswer: 1
      }
    ],
    cuidador_2_5: [
      {
        question: 'Es el caso de Rocío es una madre que prohíbe a su hija de 16 años salir con sus amigos. A ella le da mucho miedo que su hija se pueda meter en problemas o que sea víctima de cualquier tipo de violencia. ¿Qué podría hacer?',
        answers: [
          'Enseñarle a medir los peligros y evaluar las consecuencias para que cuando salga con sus amigos ella se proteja.',
          'Prohibirle salir.',
          'Permitirle que salga con sus amigos, no hay necesidad de enseñarle nada porque no hay peligros.'
        ],
        correctAnswer: 0
      }, {
        question: 'Rodolfo se enteró que su hija recibe muchos insultos de parte de sus compañeras de curso. Pero su hija no le contó nada al respecto ¿Qué podría hacer Rodolfo?',
        answers: [
          'Gritarles a las compañeras de su hija para que no vuelvan a tratarla mal.',
          'Mejorar la relación entre padre e hija para que ella sienta confianza de pedirle ayuda.',
          'Las niñas y niños son así, no hay por qué preocuparse.'
        ],
        correctAnswer: 1,
      }, {
        question: 'El hijo de Marta está por tener su primera novia y a ella no le gusta para nada la idea, porque distrae a su hijo de sus estudios. ¿Qué podría hacer Marta?',
        answers: [
          'Tratar mal a su novia, así ella ya no querrá verlo.',
          'Prohibirle que la vea.',
          'Escuchar y comprender sus emociones y deseos, a pesar de que no piensen igual.'
        ],
        correctAnswer: 2
      }
    ]
  },

  unir: {
    lider_2_1: {
      left: [
        'Incidencia política', 'Derecho a la participación', 'Empoderamiento'
      ],
      right: [
        'Proceso debidamente planificado que tiene como objetivo influir sobre las políticas públicas que contribuyan al bienestar de las personas.',
        'Permite que puedan expresar sus opiniones en todo los asuntos que las y los involucran, que sean escuchadas y escuchados y que puedan elegir sus propios beneficios.',
        'El impacto que tiene la participación en su desarrollo personal está relacionado con el desarrollo de la autoestima, la autonomía, las habilidades sociales, la identidad, la solidaridad, la seguridad y la dignidad.'
      ],
      answers: [
        [0,0], [1,1], [2,2]
      ]
    },
  },

  ordenar: {
    lider_2_1: [
      {
        category: 'Se garantiza el derecho a la participación',
        label: 'Una familia debe mudarse, los padres tienen una conversación con sus hijos al respecto.'
      }, {
        category: 'Se garantiza el derecho a la participación',
        label: 'En la feria de la comunidad, los adolescentes organizan actividades de su agrado.'
      }, {
        category: 'Se garantiza el derecho a la participación',
        label: 'En la escuela, se realizan las elecciones del centro de estudiantes.'
      }, {
        category: 'No se garantiza el derecho a la participación',
        label: 'Los padres de una familia deciden cambiar de colegio a sus hijas, sin consultarles.'
      }, {
        category: 'No se garantiza el derecho a la participación',
        label: 'Los adolescentes de una escuela desean hacer una queja, sin embargo, el director no los atiende.'
      }, {
        category: 'No se garantiza el derecho a la participación',
        label: 'Los niños, niñas y adolescentes no pueden asistir a las asambleas de la comunidad.'
      }
    ]
  }
};
