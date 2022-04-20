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
    ],
    nino_1_6: [ {
      dir: 'img/trivia/nino_1_6/',
      question: 'Anclaje-nina angustiada1.png',
      answers: [
        'Anclaje-nina angustiada1.png',
        'Anclaje-nina angustiada2.png',
        'Anclaje-nina angustiada3.png',
      ],
      correctAnswer: 1
    }, {
      dir: 'img/trivia/nino_1_6/',
      question: 'Anclaje-nino emociones-01.png',
      answers: [
        'Anclaje-nino emociones-03.png',
        'Anclaje-nino emociones-02.png',
        'Anclaje-nino emociones-01.png',
      ],
      correctAnswer: 2
    }, {
      dir: 'img/trivia/nino_1_6/',
      question: 'Anclaje-ninos tristes-02.png',
      answers: [
        'Anclaje-ninos tristes-02.png',
        'Anclaje-ninos tristes-03.png',
        'Anclaje-ninos tristes-01.png',
      ],
      correctAnswer: [1,2],
    }, {
      dir: 'img/trivia/nino_1_6/',
      question: 'Anclaje-nina en DNA-01.png',
      answers: [
        'Anclaje-nina en DNA-01.png',
        'Anclaje-nina en DNA-02.png',
        'Anclaje-nina en DNA-03.png',
      ],
      correctAnswer: [0,1]
    } ],
    nino_2_4: [ {
      dir: 'img/trivia/nino_2_4/',
      question: 'Anclaje-astronauta.png',
      answers: [
        'ninos.png',
        'ninas.png',
        'todas y todos.png'
      ],
      correctAnswer: [0,1,2]
    }, {
      dir: 'img/trivia/nino_2_4/',
      question: 'anclaje-emoticon.png',
      answers: [
        'ninos.png',
        'ninas.png',
        'todas y todos.png'
      ],
      correctAnswer: [0,1,2]
    }, {
      dir: 'img/trivia/nino_2_4/',
      question: 'Anclaje-objMedicos.png',
      answers: [
        'ninos.png',
        'ninas.png',
        'todas y todos.png'
      ],
      correctAnswer: [0,1,2]
    }, {
      dir: 'img/trivia/nino_2_4/',
      question: 'Anclaje-pelota.png',
      answers: [
        'ninos.png',
        'ninas.png',
        'todas y todos.png'
      ],
      correctAnswer: [0,1,2]
    }, {
      dir: 'img/trivia/nino_2_4/',
      question: 'Anclaje-superheroe.png',
      answers: [
        'ninos.png',
        'ninas.png',
        'todas y todos.png'
      ],
      correctAnswer: [0,1,2]
    } ],
    nino_2_5: [{
      dir: 'img/trivia/nino_2_5/',
      question: 'Anclaje-Rocio triste.png',
      answers: [
        'decoy.png',
      ],
      correctAnswer: 1
    }, {
      dir: 'img/trivia/nino_2_5/',
      question: 'Anclaje-abrazo.png',
      answers: [
        'decoy.png',
      ],
      correctAnswer: 0
    }, {
      dir: 'img/trivia/nino_2_5/',
      question: 'Anclaje-nina enojada.png',
      answers: [
        'decoy.png',
      ],
      correctAnswer: 1
    }, {
      dir: 'img/trivia/nino_2_5/',
      question: 'Anclaje-padre hija.png',
      answers: [
        'decoy.png',
      ],
      correctAnswer: 0
    }, {
      dir: 'img/trivia/nino_2_5/',
      question: 'Anclaje-Nina gritando.png',
      answers: [
        'decoy.png',
      ],
      correctAnswer: 1
    }, {
      dir: 'img/trivia/nino_2_5/',
      question: 'Anclaje-Nino hablando.png',
      answers: [
        'decoy.png',
      ],
      correctAnswer: 0
    }],
    puber_1_1: [ {
      question: '¿Qué cambios físicos atraviesan las mujeres en la adolescencia y pubertad?',
      answers: [
        'Crecimiento de pechos, ensanchamiento de caderas, crecimiento de vello y menstruación.',
        'No atraviesan cambios.',
        'Solamente crecen los pechos.'
      ],
      correctAnswer: 0
    }, {
      question: '¿Qué cambios físicos atraviesan los hombres en la adolescencia y pubertad?',
      answers: [
        'Ensanchamiento de la espalda, crecimiento del pene y los testículos, erecciones, crecimiento de vello, cambio de voz.',
        'No atraviesan cambios.',
        'Solamente crece la barba'
      ],
      correctAnswer: 0
    }, {
      question: '¿Qué es la menstruación?',
      answers: [
        'Es un sangrado que sale por la vagina que puede durar entre 3 y 7 días y es un proceso natural por el que atraviesan todas las mujeres.',
        'Es un estado de ánimo de las mujeres.'
      ],
      correctAnswer: 0
    }, {
      question: '¿Cuánto dura el ciclo menstrual?',
      answers: [
        'En promedio dura 28 días, sin embargo, puede tener una duración menor o mayor.',
        'En promedio dura 40 días',
        'En promedio dura 50 días'
      ],
      correctAnswer: 0
    }, {
      question: '¿Qué es la sexualidad?',
      answers: [
        'La sexualidad es la forma de conocer nuestro cuerpo, es una forma de expresión y comunicación afectiva relacionada con los sentimientos, emociones, ternura y amor.',
        'La sexualidad hace referencia a las relaciones sexuales.'
      ],
      correctAnswer: 0
    }, {
      question: '¿La sexualidad se vive solo a través de nuestros órganos reproductivos?',
      answers: [
        'No, la sexualidad puede ser vivida a través de todo nuestro cuerpo y sentidos, incluyendo nuestros valores, actitudes, sentimientos, interacciones y conductas.',
        'Sí, la sexualidad solamente es la vivencia con los órganos sexuales.'
      ],
      correctAnswer: 0
    } ],
    puber_1_6: [ {
      question: ' ¿Qué significa ser sujeto de derechos?',
      answers: [
        'Que somos personas con derechos que deben ser respetados y garantizados.',
        'Que vivimos en un país con leyes'
      ],
      correctAnswer: 0
    }, {
      question: '¿Qué implica el derecho a la protección?',
      answers: [
        'Vivir en un contexto seguro y ser protegido de cualquier tipo de maltrato.',
        'Vivir con miedo en el hogar y el colegio.'
      ],
      correctAnswer: 0
    }, {
      question: '¿Qué implica el derecho a la no discriminación?',
      answers: [
        'No sufrir ningún tipo de discriminación por mi edad, género, etnia, clase social, religión, preferencia sexual, etc.',
        'Vivir en un contexto seguro y ser protegido de cualquier tipo de maltrato, violencia o explotación.'
      ],
      correctAnswer: 0
    }, {
      question: '¿Qué implica el derecho a la participación?',
      answers: [
        'Ser escuchado y que mi opinión sea tomada en cuenta.',
        'Ser educado en una institución del estado.'
      ],
      correctAnswer: 0
    }, {
      question: '¿Cuál de los siguientes derechos está relacionado a la sexualidad?',
      answers: [
        'Derecho a la protección',
        'Derecho a la identidad',
        'Derecho a decidir sobre mi cuerpo',
        'Derecho a la no discriminación'
      ],
      correctAnswer: 2
    }, {
      question: '¿Cuál de estos derechos me permite decidir si quiero tener hijos o no y a qué edad?',
      answers: [
        'Derecho a decidir sobre mi vida reproductiva.',
        'Derecho a la protección',
        'Derecho a la identidad'
      ],
      correctAnswer: 0
    } ],
    puber_1_7: [ {
      question: '¿A qué nos referimos cuando hablamos de sexo?',
      answers: [
        'Son aquellas características físicas y biológicas que diferencian a los hombres de las mujeres.',
        'Son aquellas normas culturales que nos dicen cómo deben ser las mujeres y los hombres.'
      ],
      correctAnswer: 0
    }, {
      question: '¿A qué nos referimos cuando hablamos de género?',
      answers: [
        'El género son aquellas normas culturales que nos dicen cómo deben ser las mujeres y los hombres.',
        'El género son las  características físicas y biológicas que diferencian a los hombres de las mujeres.'
      ],
      correctAnswer: 0
    }, {
      question: '¿Qué son los roles de género?',
      answers: [
        'Son expectativas de cómo deben actuar los hombres y mujeres y qué roles deben cumplir en la sociedad.',
        'Son las formas naturalmente aprendidas de cómo  deben comportarse los hombres y mujeres.'
      ],
      correctAnswer: 0
    }, {
      question: '¿Qué son los estereotipos de género?',
      answers: [
        'Son prejuicios sobre cómo deben ser los hombres o las mujeres.',
        'Son las características biológicas de las mujeres y hombres.'
      ],
      correctAnswer: 0
    } ],
    puber_1_9: [ {
      question: '¿Qué es la orientación sexual?',
      answers: [
        'Es a quién te sientes atraído o atraída, física, sexual y románticamente.',
        'Es tu sexo biológico'
      ],
      correctAnswer: 0
    }, {
      question: '¿Qué significa ser heterosexual?',
      answers: [
        'Sentirse atraído o atraída por una persona del sexo opuesto.',
        'Sentirse atraído o atraída por una persona del  mismo sexo.'
      ],
      correctAnswer: 0
    }, {
      question: '¿Qué significa ser homosexual?',
      answers: [
        'Sentirse atraído o atraída por una persona del mismo sexo.',
        'Sentirse atraído o atraída por una persona del otro sexo'
      ],
      correctAnswer: 0,
    }, {
      question: '¿Qué significa ser bisexual?',
      answers: [
        'Sentirse atraído o atraída por hombre y por mujeres.',
        'Sentirse atraído solamente hacia mujeres'
      ],
      correctAnswer: 0,
    }, {
      question: '¿Qué es la identidad de género?',
      answers: [
        'Es cómo te sientes, defines y expresas tu género.',
        'Es tu sexo biológico'
      ],
      correctAnswer: 0
    } ],
    puber_1_13: [ {
      question: '¿Cómo podemos manejar de mejor manera nuestras emociones?',
      answers: [
        'Reconociendo nuestras emociones y cómo actuamos cuando las sentimos.',
        'Utilizando formas positivas para expresar nuestras emociones.',
        'Respirando profundo o utilizar otras técnicas para evitar actuar de forma impulsiva',
        'Todas las respuestas son correctas'
      ],
      correctAnswer: 3
    }, {
      question: '¿En qué nos ayuda la empatía?',
      answers: [
        'Nos permite comprender las emociones de los demás y ponernos en su lugar.',
        'Nos permite tener una posición firme de nuestros pensamientos.'
      ],
      correctAnswer: 0,
    }, {
      question: '¿Qué es la negociación?',
      answers: [
        'Se trata de llegar a acuerdos que permitan resolver el conflicto.',
        'Se trata de discutir con la otra persona y reconozca que yo tengo la razón'
      ],
      correctAnswer: 0
    }, {
      question: '¿Qué es el reconocimiento?',
      answers: [
        'Es tolerar, respetar y comprender a la otra persona, su posición, su opinión y sus emociones.',
        'Es saber que la otra persona puede hablar, aunque no la escuche.'
      ],
      correctAnswer: 0
    }, {
      question: '¿A qué se refiere la colaboración en la resolución de conflictos?',
      answers: [
        'Se refiere a que ambas partes deben participar activamente en la resolución del conflicto.',
        'Se refiere a que puedo apoyarme en otras personas para que me den la razón cuando tengo una discusión.'
      ],
      correctAnswer: 0
    } ],
    cuidador_2_6: [ {
      question: '¿Cuál  es un factor de riesgo para que las hijas e hijos puedan pasar por una situación de violencia sexual?',
      answers: [
        'Poca comunicación con nuestras hijas e hijos.',
        'Divorcio de los padres.'
      ],
      correctAnswer: 0
    }, {
        question: '¿Para qué les enseñamos a nuestras hijas e hijos a contarnos sobre sus experiencias, en especial aquellas situaciones que les hacen sentir mal?',
      answers: [
        'Para obligarlos a que hablen.',
        'Para castigarlos por hacer las cosas mal.',
        'Para apoyarlos y protegerlos de los posibles riesgos'
      ],
      correctAnswer: 2
    }, {
      question: '¿Dónde debo denunciar si sé que mi hija o hijo pasó por una situación de violencia sexual?',
      answers: [
        'No debo denunciar, es mejor ocultarlo.',
        'En las Defensorías de la niñez y Adolescencia o la policía'
      ],
      correctAnswer: 1
    } ],
    cuidador_3_2: [{
      question: 'El abuso sexual a nuestras hijas e hijos afecta a',
      answers: [
        'Solo a nuestras hijas e hijos',
        'A nuestras hijas e hijos y toda la familia',
        'A los abusadores'
      ],
      correctAnswer: 1
    }, {
      question: 'El abusador sexual es:',
      answers: [
        'Siempre es un extraño',
        'Siempre es alguien de la familia o conocido',
        'Puede ser cualquiera, una persona desconocida o conocida'
      ],
      correctAnswer: 2,
    }, {
      question: 'Las emociones de miedo, culpa, vergüenza o tristeza ante un abuso sexual de nuestras hijas o hijos, solo es permitido sentirla por:',
      answers: [
        'La víctima y la familia',
        'Solo la víctima',
        'Solo la familia'
      ],
      correctAnswer: 0
    }, {
      question: '¿Qué hacemos como madres, padres y cuidadores con las emociones de miedo, culpa, vergüenza o tristeza ante un abuso sexual a nuestras hijas o hijos?',
      answers: [
        'No se tiene esas emociones',
        'Negar esas emociones',
        'Identificar esas emociones y buscar una persona de confianza para desahogarnos y poder apoyar a nuestras hijas e hijos a gestionar sus propias emociones.'
      ],
      correctAnswer: 2
    }, {
      question: '¿Qué hacer si aparecen pensamientos como “soy  mala o malo”, “nadie me va a querer” ante un abuso sexual?',
      answers: [
        'Hablar con nuestras hijas e hijos resaltando que lo ocurrido no cambia el amor que les tenemos',
        'Es cosa de niñas y niños, se les va a pasar.'
      ],
      correctAnswer: 0
    }, {
      question: '¿Qué debemos hacer ante un caso de abuso sexual a nuestras hijas e hijos?',
      answers: [
        'Se debe escuchar con mucho respeto y amor, debemos creerles siempre.',
        'Se realiza la denuncia en la policía o en la Defensoría de la Niñez y Adolescencia.',
        'Se busca asistencia médica y psicológica.',
        'Continuar el proceso civil y la investigación penal hasta su culminación.',
        'todas las respuestas son correctas'
      ],
      correctAnswer: 4
    }],
    cuidador_3_5: [ {
      question: '¿Qué es una amenaza?',
      answers: [
        'Son factores externos que representan un riesgo o peligro.',
        'Son factores externos que no representan un riesgo o peligro.'
      ],
      correctAnswer: 0
    }, {
      question: '2. ¿Cómo podemos superar la vulnerabilidad?',
      answers: [
        'No se puede.',
        'Desarrollando y fortaleciendo nuestras capacidades.'
      ],
      correctAnswer: 1
    }, {
      question: '3. ¿Por qué cuidar mucho más a nuestras hijas e hijos en situaciones de amenazas o desastres?',
      answers: [
        'Porque además del riesgo del desastre natural hay mayor vulnerabilidad de sufrir algún tipo de abuso o violencia sexual.',
        'Porque estarán más tristes nuestras hijas e hijos.'
      ],
      correctAnswer: 0
    }, {
      question: '4. ¿Por qué es importante conformar una red de apoyo entre madres, padres, cuidadores, profesores, miembros de la comunidad?',
      answers: [
        'No es muy importante yo puedo sola o solo con mi familia.',
        'Porque se necesita superar la amenaza de manera conjunta desde el respeto y el cariño.'
      ],
      correctAnswer: 1
    } ],
    adolescente_2_2: [{
      question: '¿Qué es la identidad sexual?',
      answers: [
        'La identidad sexual es la percepción que tiene cada persona de sí misma.',
        'Es una atracción emocional, romántica sexual o afectiva hacia otra persona.'
      ],
      correctAnswer: 0
    }, {
      question: '¿Qué es el sexo biológico?',
      answers: [
        'Son las características biológicas (pene o vagina) con las que nacemos.',
        'Son aquellas características de lo masculino o femenino que aprendemos en la familia, la escuela, la comunidad, etc.'
      ],
      correctAnswer: 0
    }, {
      question: '¿Qué es el género?',
      answers: [
        'Son aquellas características de lo masculino o femenino que aprendemos en la familia, la escuela, la comunidad, etc.',
        'Es la forma en la que uno expresa su  apariencia, forma de vestir y de comportarse.'
      ],
      correctAnswer: 0
    }, {
      question: '¿Qué es la identidad de género?',
      answers: [
        'Tiene que ver con cómo nos identificamos, ya sea como masculino o femenino.',
        'Son las características biológicas (pene o vagina) con las que nacemos'
      ],
      correctAnswer: 0
    }, {
      question: '¿Qué es la orientación sexual?',
      answers: [
        'Es una atracción emocional, romántica sexual o afectiva hacia otra persona.',
        'Es la percepción que tiene cada persona de sí misma.'
      ],
      correctAnswer: 0
    }, {
      question: '¿Qué es la expresión de género?',
      answers: [
        'Es la forma en la que uno expresa su feminidad o masculinidad, esta incluye la apariencia, forma de vestir y de comportarse.',
        'Son aquellas características de lo masculino o femenino que aprendemos en la familia, la escuela, la comunidad, etc.'
      ],
      correctAnswer: 0
    }],
    // adolescente_2_5: [ {
    //   question: 'Qué es una amenaza?',
    //   answers: [
    //     'Son factores externos que representan un riesgo o peligro.',
    //     'Son factores externos que no representan un riesgo o peligro.'
    //   ],
    //   correctAnswer: 0,
    // }, {
    //   question: '¿Cómo podemos superar la vulnerabilidad?',
    //   answers: [
    //     'No se puede.',
    //     'Desarrollando y fortaleciendo nuestras capacidades.'
    //   ],
    //   correctAnswer: 1,
    // }, {
    //   question: '¿Por qué cuidar mucho más a nuestras hijas e hijos en situaciones de amenazas o desastres?',
    //   answers: [
    //     'Porque además del riesgo del desastre natural hay mayor vulnerabilidad de sufrir algún tipo de abuso o violencia sexual.',
    //     'Porque estarán más tristes nuestras hijas e hijos.'
    //   ],
    //   correctAnswer: 0,
    // }, {
    //   question: '¿Por qué es importante conformar una red de apoyo entre madres, padres, cuidadores, profesores, miembros de la comunidad?',
    //   answers: [
    //     'No es muy importante yo puedo sola o solo con mi familia.',
    //     'Porque se necesita superar la amenaza de manera conjunta desde el respeto y el cariño.'
    //   ],
    //   correctAnswer: 1
    // }]
  },

  unir: {
    lider_1_2: {
      left: [ 'Equidad de género', 'Mecanismo de protección basado en la comunidad (MPBC)',
              'Acciones de prevención', 'Acciones de atención de casos', 'Acciones de respuesta' ],
      right: [
        'Se refiere a la dignidad y los derechos que poseen tanto hombres como mujeres.',
        'Es un grupo de personas que trabaja de manera coordinada para promover la protección de las NNA frente a cualquier forma de violencia.',
        'Realización de charlas, talleres, ferias y campañas de sensibilización sobre los derechos de las NNA.',
        'Identificación de casos de violencia, remisión de los mismos a las Defensorías y Policía y acompañamiento en el proceso de denuncia.',
        'Creación de rutas y protocolos para casos de violencia.',
      ]
    },
    lider_1_3: {
      left: [ 'Violencia psicológica', 'Violencia física', 'Violencia sexual', 'Ruta crítica',
              'Protocolo de atención' ],
      right: [
        'Amenazas, insultos, críticas, comentarios malintencionados, aislar a una persona de su familia, amigos o amigas u otros miembros de su comunidad.',
        'Golpes, patadas, empujones y cualquier tipo de acto que implique un daño físico a otra persona.',
        'Obligar a una persona a realizar algún acto de tipo sexual sin su consentimiento. Puede ser: acoso sexual, abuso sexual, violación. también puede estar relacionado a trata y tráfico.',
        'Es una herramienta que visibiliza los distintos pasos a tomar en caso de violencia.',
        'Reglamento que especifica las acciones que deben tomar las distintas instituciones y profesionales que atienden casos de violencia de género.',
      ]
    },
    lider_1_5: {
      left: [ 'La trata', 'La violencia sexual comercial', 'El tráfico de personas', 'La“Ley Integral Contra la Trata y Tráfico de Personas”' ],
      right: [
        'Es un delito que consiste en poner a una persona en una situación de explotación para obtener un beneficio propio.',
        'Es un delito conexo a la trata y tráfico de personas, en el cual se da la comercialización sexual de personas menores de dieciocho años de edad.',
        'Es un delito en el cual se facilita la entrada ilegal de una persona a un país que no es el suyo, esto con el fin de obtener un beneficio financiero u otro beneficio de orden material.',
        'Es una norma que tiene como objetivo combatir la trata y tráfico de personas, y delitos conexos.',
      ]
    },
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
    puber_1_8: {
      left: [
        'Autoconocimiento', 'Autocuidado', 'Autonomía en la toma de decisiones', 'Empatía'
      ],
      right: [
        'Proceso que nos permite conocernos, aceptarnos y valorarnos.',
        'Acciones que realizamos para asegurar nuestro bienestar. Están acorde a lo que somos, lo que queremos y a nuestros planes.',
        'Capacidad de decidir sobre los distintos aspectos de tu vida de manera libre y sin presiones de los demás.',
        'Capacidad de conocer, respetar y comprender a los demás sin juzgarlos.'
      ],
      answers: [
        [0,0], [1,1], [2,2], [3,3]
      ]
    },
    puber_1_12: {
      left: [
        'Consentimiento sexual', 'El consentimiento es libre', 'El consentimiento debe ser específico', 'El consentimiento es reversible', 'Violencia sexual'
      ],
      right: [
        'Es un acuerdo entre dos personas para participar en una actividad sexual.',
        'No debe existir ningún tipo de presión, amenaza o chantaje de por medio.',
        'Puedo decir que sí una vez y decir que no en otras ocasiones; o decir que sí sólo a algunas cosas y a otras no.',
        'Puedo cambiar de parecer después de haber dicho que sí. ',
        'Cualquier contacto de tipo sexual en el cual no existe consentimiento de ambas personas.'
      ],
      answers: [
        [0,0], [1,1], [2,2], [3,3], [4,4]
      ]
    },
    puber_1_14: {
      left: [
        'Si te sientes en peligro en la calle y estás sola o solo',
        'No aceptes bebidas de extraños,',
        'En caso de violencia en tu familia o de pareja,',
        'En caso de abuso o violación,'
      ],
      right: [
        'puedes acercarte a un adulto y comentarle la situación.',
        'recuerda que nadie debe obligarte a consumir alcohol o drogas',
        'recurre a un adulto de confianza y realiza la denuncia en una defensoría o en la policía.',
        'recuerda no cambiarte ni bañarte, recurrir a un adulto de confianza y acudir a la defensoría o policía para realizar la denuncia.'
      ],
      answers: [
        [0,0], [1,1], [2,2], [3,3]
      ]
    },
    puber_1_1: {
      dir: 'img/unir/puber_1_1/',
      left: [
        'Comer frutas', 'Higiene', 'Higiene dental', 'Comer verduras', 'Cambios físicos'
      ],
      right: [
        'Unir-cambios fisicos1.png',  'unir-comer verduras1.png',   'unir-higiene3.png',
        'Unir-cambios fisicos2.png',  'unir-comer verduras2.png',   'unir-higiene4.png',
        'unir-comer frutas1.png',      'unir-higiene1.png',
        'unir-comer frutas2.png',      'unir-higiene2.png'
      ],
      answers: [
        [0, 6], [0, 8],
        [1, 2], [1, 5], [1, 7],
        [2, 9],
        [3, 1,], [3, 4],
        [4, 0], [4, 3]
      ],
      destroysLeft: false
    },
    puber_1_8: {
      dir: 'img/unir/puber_1_8/',
      left: [
        'Decirle a mamá o papá que hay alguien afuera',
        'Hablar con un adulto responsable',
        'Preguntar a papá o mamá qué sucede',
        'Respirar hondo y hablar con mamá y papá'
      ],
      right: [
        'Anclaje-extrano.png',
        'Anclaje-perdido_Mesa de trabajo 1.png',
        'Anclaje-emergencia.png',
        'Anclaje-preocupacion.png'
      ],
      answers: [ [0,0], [1,1], [2,2], [3,3] ]
    },
    puber_3_5: {
      dir: 'img/unir/puber_3_5/',
      left: [
        'Violencia física', 'Violencia psicológica', 'Negligencia'
      ],
      right: [
        'Anclaje-golpes.png', 'Anclaje-palabras lastiman.png', 'Anclaje-no cuidar hijos.png'
      ],
      answers: [ [0,0], [1,1], [2,2] ]
    },
    adolescente_2_7: {
      left: [
        'Violencia de género',
        'Violencia psicológica',
        'Violencia física',
        'Violencia sexual',
        'Violencia económica',
        'Violencia digital',
        'Feminicidio',
      ],
      right: [
        'Todo acto que busque dañar a una persona por su género, hace referencia especialmente a la violencia en contra de las mujeres a los niños y niñas.',
        'Amenazas, insultos, críticas, comentarios malintencionados.',
        'Cualquier tipo de acto que implique un daño físico a otra persona.',
        'Obligar a una persona a realizar un acto de tipo sexual sin su consentimiento.',
        'Controlar los ingresos económicos de una persona o impedirle trabajar.',
        'Cualquier acto dañino que se da mediante el uso de la tecnología.',
        'Asesinato de una mujer por el hecho de ser mujer.',
      ],
      answers: [ [0,0], [1,1], [2,2], [3,3], [4,4], [5,5], [6,6] ]
    },
    adolescente_3_7: {
      left: [
        'Violencia de género',
        'Ley 348',
        'Ruta crítica',
        'Protocolo de atención',
      ],
      right: [
        'Todo acto que busque dañar a una persona por su género. Tiene su origen en la desigualdad de género, el abuso de poder y normas perjudiciales como los roles de género.',
        'Tiene como objetivo establecer “mecanismos, medidas y políticas integrales de prevención, atención, protección y reparación a las mujeres en casos de violencia”, y de perseguir y sancionar a los agresores.',
        'Es una herramienta que visibiliza los distintos pasos a tomar en caso de violencia.',
        'Reglamento que especifica las acciones que deben tomar las distintas instituciones y profesionales que atienden casos de violencia de género.',
      ],
      answers: [ [0,0], [1,1], [2,2], [3,3] ]
    },
    lider_2_2: {
      left: [
        'Roles de género tradicionales',
        'Machismo',
        'Violencia de género',
        'Equidad de género'
      ],
      right: [
        'Construcciones sociales sobre cómo deberían ser y actuar los hombres y las mujeres.',
        'Serie de comportamientos (insultos, acoso, maltrato, golpes y otros), basados en la idea de que los hombres son superiores a las mujeres.',
        'Todo acto que busque dañar a una persona por su género. Tiene su origen en la desigualdad de género, el abuso de poder y normas perjudiciales como los roles de género tradicionales.',
        'Se refiere a la dignidad y los derechos que poseen tanto hombres como mujeres.',
      ],
      answers: [ [0,0], [1,1], [2,2], [3,3] ]
    },
    lider_2_4: {
      left: [
        'Mapa de riesgos y recursos',
        'Los pasos para la elaboración de un mapa de riesgos',
        'Plan comunitario de gestión de riesgos',
        'Brigadas comunitarias',
      ],
      right: [
        'Es un dibujo o croquis sencillo de la comunidad que identifica por una parte las amenazas, vulnerabilidades y riesgos.',
        'Recorrido por la comunidad, difusión de riesgos y recursos encontrados, elaboración del mapa de riesgos de manera gráfica, validación colectiva del mapa y difusión de los mapas de riesgos y recursos en la comunidad.',
        'Es un documento que construye una comunidad y que indica las acciones, los responsables y la organización para la reducción de los principales riesgos y para el manejo de las emergencias y eventuales desastres.',
        'Grupos de personas que son responsables de llevar a cabo las distintas acciones planteadas en el plan de emergencias.',
      ],
      answers: [ [0,0], [1,1], [2,2], [3,3] ]
    },
    lider_3_3: {
      left: [
        'Identificación de casos',
        'Atención',
        'Derivación',
        'Acompañamiento',
        'Evaluación de rutas y protocolos de atención',
        'Estrategias comunitarias',
      ],
      right: [
        'Detectar casos de violación de derechos en niñas, niños, adolescentes  y jóvenes de la comunidad.',
        'Atender y acompañar a las niñas, niños, adolescentes, jóvenes que esten siendo víctimas de violación de sus derechos.',
        'Dirigir a las niñas, niños, adolescentes, jóvenes que estan sufriendo violación de sus derechos a recibir atención integral en instituciones competentes.',
        'Brindar apoyo constante a la niña, niño, adolescente o joven víctima y a su círculo familiar más cercano, asistiendo a los distintos procesos de la denuncia.',
        'Determinar si las rutas y protocolos de atención se cumplen de manera óptima o no y en los tiempos correspondientes.',
        'El conjunto de las acciones promovidas por los mecanismos comunitarios, con el objetivo de realizar cambios favorables a la comunidad.',
      ],
      answers: [ [0,0], [1,1], [2,2], [3,3], [4,4], [5,5] ]
    },
    cuidador_3_4: {
      left: [
        'Autoconciencia emocional',
        'Autocontrol o autorregulación',
        'Automotivación ',
        'Empatía',
      ],
      right: [
        'Cuando estoy triste suelo enojarme con la gente que más quiero y mientras más me enojo más se alejan las personas y esto me pone más triste porque tengo la impresión de que no tengo apoyo, pero en realidad yo estoy alejando a las personas.',
        'Cuando estoy muy feliz me gusta demostrarlo con risas, compartiendo con mucha gente y pasándola bien, esto muchas veces genera que me olvide de muchas actividades importantes que tenía que hacer. Ahora esta felicidad la expreso, pero no me olvido de mis responsabilidades.',
        'Ayer no me dieron el trabajo que tanto necesito. Hace un mes que me quedé desempleado me podía quedar en mi cama llorando, quejándome de mi infortunio, pero hoy me levanté con más ganas para encontrar el trabajo de mis sueños. Sé que lo voy a encontrar, tengo que ser constante y esforzarme.',
        'Ayer llegué muy contenta del trabajo, pero vi que mi hija estaba muy triste. Me acerqué a hablar con ella y le pregunté si podía ayudarle en algo.',
      ],
      answers: [ [0,0], [1,1], [2,2], [3,3] ]
    }
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
    ],
    lider_3_1: [{
      label: 'Derecho a decidir de forma libre sobre mi cuerpo y mi sexualidad.',
      category: 'Derechos sexuales'
    }, {
      label: 'Derecho a elegir mis parejas sexuales y/o parejas amorosas.',
      category: 'Derechos sexuales'
    }, {
      label: 'Derecho a vivir mi sexualidad sin ningún tipo de violencia sexual. ',
      category: 'Derechos sexuales'
    }, {
      label: 'Derecho a vivir y expresar libremente mi orientación sexual e identidad de género.',
      category: 'Derechos sexuales'
    }, {
      label: 'Derecho a la protección, prevención de las Infecciones de transmisión sexual (ITS) y embarazos no deseados. ',
      category: 'Derechos sexuales'
    }, {
      label: 'Derecho a acceder a métodos anticonceptivos.',
      category: 'Derechos reproductivos'
    }, {
      label: 'Derecho a decidir libremente si deseo o no tener hijas o hijos.',
      category: 'Derechos reproductivos'
    }, {
      label: 'Derecho a tomar decisiones sobre la reproducción sin sufrir discriminación, coerción ni violencia.',
      category: 'Derechos reproductivos'
    }, {
      label: 'Derecho a decidir sobre el tipo de familia que deseo formar.',
      category: 'Derechos reproductivos'
    }, {
      label: 'Derecho al acceso a servicios integrales de salud reproductiva.',
      category: 'Derechos reproductivos'
    }],
    adolescente_1_1: [{
      label: 'Derecho a decidir de forma libre sobre mi cuerpo y mi sexualidad.',
      category: 'Derechos sexuales'
    }, {
      label: 'Derecho a elegir mis parejas sexuales y/o parejas amorosas.',
      category: 'Derechos sexuales'
    }, {
      label: 'Derecho a vivir mi sexualidad sin ningún tipo de violencia sexual. ',
      category: 'Derechos sexuales'
    }, {
      label: 'Derecho a vivir y expresar libremente mi orientación sexual e identidad de género.',
      category: 'Derechos sexuales'
    }, {
      label: 'Derecho a la protección, prevención de las Infecciones de transmisión sexual (ITS) y embarazos no deseados. ',
      category: 'Derechos sexuales'
    }, {
      label: 'Derecho a acceder a métodos anticonceptivos.',
      category: 'Derechos reproductivos'
    }, {
      label: 'Derecho a decidir libremente si deseo o no tener hijas o hijos.',
      category: 'Derechos reproductivos'
    }, {
      label: 'Derecho a tomar decisiones sobre la reproducción sin sufrir discriminación, coerción ni violencia.',
      category: 'Derechos reproductivos'
    }, {
      label: 'Derecho a decidir sobre el tipo de familia que deseo formar.',
      category: 'Derechos reproductivos'
    }, {
      label: 'Derecho al acceso a servicios integrales de salud reproductiva.',
      category: 'Derechos reproductivos'
    }],
    puber_1_15: [
      {
        category: 'Peligros de las Tecnologías de Información y Comunicación (TICs)',
        label: 'Un desconocido te manda una solicitud de amistad',
      }, {
        category: 'Peligros de las Tecnologías de Información y Comunicación (TICs)',
        label: 'Alguien te pide o envía fotografías íntimas'
      }, {
        category: 'Peligros de las Tecnologías de Información y Comunicación (TICs)',
        label: 'Cyberbullying (burlas, mensajes o comentarios violentos)'
      }, {
        category: 'Trata y Tráfico',
        label: 'Una adolescente responde a un anuncio laboral en el que ofrecen mucho dinero por pocas horas de trabajo.'
      }, {
        category: 'Trata y Tráfico',
        label: 'Una adolescente se encuentra con una persona que conoció por internet, es retenida y no puede volver a casa.'
      }, {
        category: 'Trata y Tráfico',
        label: 'Un adolescente es llevado a otro país o ciudad para realizar trabajos forzados.'
      }
    ],
    puber_1_2: [
      {
        category: 'Autoconocimiento',
        label: 'Conozco las partes de mi cuerpo y sus funciones'
      }, {
        category: 'Autoconocimiento',
        label: 'Conozco y acepto mis rasgos (color de piel, ojos y cabello)'
      }, {
        category: 'Autoconocimiento',
        label: 'Reconozco aspectos físicos que me hacen única o único. '
      }, {
        category: 'Autoconocimiento',
        label: 'Es un proceso que se da a lo largo de la vida'
      }, {
        category: 'Autocuidado',
        label: 'Nadie puede tocar mi cuerpo sin mi consentimiento'
      }, {
        category: 'Autocuidado',
        label: 'Me alimento de manera correcta y balanceada '
      }, {
        category: 'Autocuidado',
        label: 'Realizo el ejercicio o actividad física de mi preferencia'
      }, {
        category: 'Autocuidado',
        label: 'Tengo horarios de descanso regulares'
      }
    ],
    puber_1_11: [
      {
        category: 'Relaciones positivas',
        label: 'Te escucha'
      }, {
        category: 'Relaciones positivas',
        label: 'Te apoya para lograr tus metas'
      }, {
        category: 'Relaciones positivas',
        label: 'Respeta tu espacio'
      }, {
        category: 'Relaciones positivas',
        label: 'Confía en ti cuando sales con tus amigos o amigas'
      }, {
        category: 'Relaciones tóxicas',
        label: 'Te pide tus contraseñas'
      }, {
        category: 'Relaciones tóxicas',
        label: 'Se molesta si no quieres ser afectuoso o afectuosa en público'
      }, {
        category: 'Relaciones tóxicas',
        label: 'Te ignora o te hace la ley del hielo cuando está enojado o enojada'
      }, {
        category: 'Relaciones tóxicas',
        label: 'Es celoso o celosa'
      }
    ],
    adolescente_3_6: [ {
      label: 'Tengo privacidad',
      category: 'Relaciones sanas'
    }, {
      label: 'Puedo poner límites a mi pareja (Decirle que cosas me gustan y que no en la relación)',
      category: 'Relaciones sanas'
    }, {
      label: 'Mantengo las actividades y amistades que tenía antes de estar en pareja',
      category: 'Relaciones sanas'
    }, {
      label: 'Tengo derecho a estudiar, trabajar y administrar mi tiempo y mi dinero por mi cuenta',
      category: 'Relaciones sanas'
    }, {
      label: 'Mi pareja respeta mis decisiones y yo las de mi pareja',
      category: 'Relaciones sanas'
    }, {
      label: 'Puedo confiar en mi pareja sin controlarla o controlarlo',
      category: 'Relaciones sanas'
    }, {
      label: 'Compartimos absolutamente todo , ninguno tiene su privacidad,',
      category: 'Relaciones tóxicas'
    }, {
      label: 'Deje mis actividades y mis amistades de lado, solo paso tiempo con mi pareja',
      category: 'Relaciones tóxicas'
    }, {
      label: 'Tengo miedo de decirle a mi pareja que algunas cosas no me gustan o no me parecen',
      category: 'Relaciones tóxicas'
    }, {
      label: 'Tenemos acceso a las contraseñas y redes sociales del otro',
      category: 'Relaciones tóxicas'
    }, {
      label: 'Mi pareja me dice cómo vestir o actuar',
      category: 'Relaciones tóxicas'
    }, {
      label: 'Tengo celos y siento que no puedo confiar en mi pareja',
      category: 'Relaciones tóxicas'
    }],
    lider_2_1: [{
      label: 'Una familia debe mudarse, los padres tienen una conversación con sus hijos al respecto.',
      category: 'Se garantiza el derecho a la participación'
    }, {
      label: 'En la feria de la comunidad, los adolescentes organizan actividades de su agrado.',
      category: 'Se garantiza el derecho a la participación'
    }, {
      label: 'En la escuela, se realizan las elecciones del centro de estudiantes.',
      category: 'Se garantiza el derecho a la participación'
    }, {
      label: 'Los padres de una familia deciden cambiar de colegio a sus hijas, sin consultarles.',
      category: 'NO se garantiza el derecho a la participación'
    }, {
      label: 'Los adolescentes de una escuela desean hacer una queja, sin embargo, el director no los atiende.',
      category: 'NO se garantiza el derecho a la participación'
    }, {
      label: 'Los niños, niñas y adolescentes no pueden asistir a las asambleas de la comunidad.',
      category: 'NO se garantiza el derecho a la participación'
    }],
    lider_2_4: [{
      label: 'Recorrido por la comunidad.',
      category: 'Pasos para crear un mapa de riesgos'
    }, {
      label: 'Difusión de riesgos y recursos encontrados.',
      category: 'Pasos para crear un mapa de riesgos'
    }, {
      label: 'Elaboración del mapa de riesgos de manera gráfica.',
      category: 'Pasos para crear un mapa de riesgos'
    }, {
      label: 'Validación colectiva del mapa.',
      category: 'Pasos para crear un mapa de riesgos'
    }, {
      label: 'Difusión de los mapas de riesgos y recursos en la comunidad.',
      category: 'Pasos para crear un mapa de riesgos'
    }, {
      label: 'Identificación de los principales riesgos y recursos a partir de la memoria local y el mapeo de riesgos.',
      category: 'Pasos para crear un plan de emergencias'
    }, {
      label: 'Plantear las metas u objetivos del plan.',
      category: 'Pasos para crear un plan de emergencias'
    }, {
      label: 'Plantear acciones concretas a realizarse antes, durante y después de una emergencia.',
      category: 'Pasos para crear un plan de emergencias'
    }, {
      label: 'Conformar brigadas de personas que serán las responsables de realizar determinadas acciones.',
      category: 'Pasos para crear un plan de emergencias'
    }, {
      label: 'Llevar a cabo simulacros en la comunidad.',
      category: 'Pasos para crear un plan de emergencias'
    }]
  },

  sopa: {
    lider_1_1: '[{"capsule":{"origin":{"r":0,"c":0},"end":{"r":12,"c":12}},"word":"PARTICIPACION"},{"capsule":{"origin":{"r":5,"c":0},"end":{"r":5,"c":9}},"word":"PROTECCION"},{"capsule":{"origin":{"r":4,"c":11},"end":{"r":12,"c":11}},"word":"EDUCACION"},{"capsule":{"origin":{"r":8,"c":1},"end":{"r":8,"c":9}},"word":"IDENTIDAD"},{"capsule":{"origin":{"r":12,"c":2},"end":{"r":8,"c":2}},"word":"SALUD"},{"capsule":{"origin":{"r":1,"c":4},"end":{"r":1,"c":11}},"word":"LIBERTAD"}]',
    puber_1_3: '[{"capsule":{"origin":{"r":7,"c":2},"end":{"r":7,"c":9}},"word":"GONORREA"},{"capsule":{"origin":{"r":0,"c":5},"end":{"r":8,"c":5}},"word":"SECRECION"},{"capsule":{"origin":{"r":0,"c":5},"end":{"r":6,"c":11}},"word":"SIFILIS"},{"capsule":{"origin":{"r":6,"c":9},"end":{"r":4,"c":11}},"word":"VIH"},{"capsule":{"origin":{"r":8,"c":0},"end":{"r":8,"c":5}},"word":"CONDON"},{"capsule":{"origin":{"r":5,"c":1},"end":{"r":9,"c":1}},"word":"ARDOR"},{"capsule":{"origin":{"r":6,"c":8},"end":{"r":11,"c":8}},"word":"HERPES"},{"capsule":{"origin":{"r":11,"c":0},"end":{"r":11,"c":8}},"word":"HEPATITIS"},{"capsule":{"origin":{"r":4,"c":2},"end":{"r":4,"c":8}},"word":"ULCERAS"}]',
    lider_2_2: '[{"capsule":{"origin":{"r":0,"c":12},"end":{"r":7,"c":12}},"word":"PREVENIR"},{"capsule":{"origin":{"r":12,"c":0},"end":{"r":12,"c":8}},"word":"ACOMPAÑAR"},{"capsule":{"origin":{"r":5,"c":8},"end":{"r":12,"c":8}},"word":"INFORMAR"},{"capsule":{"origin":{"r":0,"c":0},"end":{"r":8,"c":0}},"word":"DENUNCIAR"}]',
    puber_1_3: '[{"capsule":{"origin":{"r":7,"c":2},"end":{"r":7,"c":9}},"word":"GONORREA"},{"capsule":{"origin":{"r":0,"c":5},"end":{"r":8,"c":5}},"word":"SECRECION"},{"capsule":{"origin":{"r":0,"c":5},"end":{"r":6,"c":11}},"word":"SIFILIS"},{"capsule":{"origin":{"r":6,"c":9},"end":{"r":4,"c":11}},"word":"VIH"},{"capsule":{"origin":{"r":8,"c":0},"end":{"r":8,"c":5}},"word":"CONDON"},{"capsule":{"origin":{"r":5,"c":1},"end":{"r":9,"c":1}},"word":"ARDOR"},{"capsule":{"origin":{"r":6,"c":8},"end":{"r":11,"c":8}},"word":"HERPES"},{"capsule":{"origin":{"r":11,"c":0},"end":{"r":11,"c":8}},"word":"HEPATITIS"},{"capsule":{"origin":{"r":4,"c":2},"end":{"r":4,"c":8}},"word":"ULCERAS"}]',
    puber_3_1: '[{"capsule":{"origin":{"r":2,"c":4},"end":{"r":6,"c":4}},"word":"UTERO"},{"capsule":{"origin":{"r":12,"c":6},"end":{"r":12,"c":12}},"word":"HIGIENE"},{"capsule":{"origin":{"r":12,"c":1},"end":{"r":1,"c":12}},"word":"MENSTRUACION"},{"capsule":{"origin":{"r":4,"c":3},"end":{"r":4,"c":7}},"word":"REGLA"}]',
    adolescente_3_1: '[{"capsule":{"origin":{"r":0,"c":0},"end":{"r":10,"c":0}},"word":"AUTOEVALUAR"},{"capsule":{"origin":{"r":12,"c":1},"end":{"r":3,"c":10}},"word":"AUTOESTIMA"},{"capsule":{"origin":{"r":12,"c":1},"end":{"r":12,"c":11}},"word":"AUTOCONOCER"},{"capsule":{"origin":{"r":2,"c":1},"end":{"r":2,"c":12}},"word":"AUTOCUIDARSE"}]',
    adolescente_3_3: '[{"capsule":{"origin":{"r":0,"c":0},"end":{"r":0,"c":12}},"word":"PLANIFICACION"},{"capsule":{"origin":{"r":3,"c":3},"end":{"r":3,"c":11}},"word":"PASTILLAS"},{"capsule":{"origin":{"r":10,"c":0},"end":{"r":12,"c":0}},"word":"DIU"},{"capsule":{"origin":{"r":10,"c":10},"end":{"r":10,"c":12}},"word":"ITS"},{"capsule":{"origin":{"r":1,"c":1},"end":{"r":8,"c":8}},"word":"IMPLANTE"},{"capsule":{"origin":{"r":2,"c":2},"end":{"r":2,"c":11}},"word":"MATERNIDAD"},{"capsule":{"origin":{"r":8,"c":11},"end":{"r":8,"c":2}},"word":"PATERNIDAD"},{"capsule":{"origin":{"r":12,"c":3},"end":{"r":12,"c":12}},"word":"DECISIONES"}]'
  },

  crucigrama: {
    lider_1_4: '{"words":[{"capsule":{"origin":{"r":0,"c":8},"end":{"r":10,"c":8}},"word":"CAPACIDADES","number":{"position":{"x":143,"y":33},"number":1},"hint":{"text":"1: Las (...) son fortalezas que tenemos o podemos desarrollar para enfrentar de manera exitosa un desastre o una emergencia","position":{"x":34,"y":300}}},{"capsule":{"origin":{"r":6,"c":0},"end":{"r":6,"c":17}},"word":"GESTION DE RIESGOS","number":{"position":{"x":15,"y":129},"number":2},"hint":{"text":"2: La (...) son las diversas acciones que los gobiernos y los miembros de una comunidad deben realizar para reducir los riesgos y vivir más seguros.","position":{"x":34,"y":327}}},{"capsule":{"origin":{"r":4,"c":1},"end":{"r":9,"c":1}},"word":"RIESGO","number":{"position":{"x":31,"y":97},"number":3},"hint":{"text":"3: El (...) es el cálculo de los potenciales daños o pérdidas que se podrían producir tomando en cuenta las amenazas, las vulnerabilidades y las capacidades.","position":{"x":34,"y":354}}},{"capsule":{"origin":{"r":9,"c":4},"end":{"r":9,"c":17}},"word":"VULNERABILIDAD","number":{"position":{"x":79,"y":177},"number":4},"hint":{"text":"4: La (...) es una debilidad que tenemos en caso de que se presente una amenaza.","position":{"x":34,"y":381}}},{"capsule":{"origin":{"r":3,"c":2},"end":{"r":3,"c":14}},"word":"MEMORIA LOCAL","number":{"position":{"x":47,"y":81},"number":5},"hint":{"text":"5: La (...) de eventos adversos es una herramienta que nos permite realizar el análisis de riesgos como un primer paso para prevenir y gestionar una emergencia.","position":{"x":34,"y":408}}},{"capsule":{"origin":{"r":1,"c":8},"end":{"r":1,"c":15}},"word":"AMENAZAS","number":{"position":{"x":143,"y":49},"number":6},"hint":{"text":"6: Factores externos que representan un riesgo o peligro.","position":{"x":34,"y":435}}}],"numberStyle":{"font":"8px Helvetica","color":"#000000"},"hintStyle":{"color":"#000000","font":"15px Helvetica","wordWrap":{"width":290}}}',
    puber_1_4: '{"words":[{"capsule":{"origin":{"r":3,"c":2},"end":{"r":3,"c":11}},"word":"COMPARTIDA","number":{"position":{"x":47,"y":81},"number":1},"hint":{"text":"1: El uso de métodos anticonceptivos es una responsabilidad (...)","position":{"x":34,"y":300}}},{"capsule":{"origin":{"r":0,"c":7},"end":{"r":9,"c":7}},"word":"EMERGENCIA","number":{"position":{"x":127,"y":33},"number":2},"hint":{"text":"2: Puede tomarse una pastilla de (...) hasta 3 días después de una relación sin protección.","position":{"x":34,"y":327}}},{"capsule":{"origin":{"r":6,"c":5},"end":{"r":6,"c":10}},"word":"CONDON","number":{"position":{"x":95,"y":129},"number":3},"hint":{"text":"3: Es un método de barrera que previene el contagio de ITS y el embarazo.","position":{"x":34,"y":354}}},{"capsule":{"origin":{"r":9,"c":7},"end":{"r":9,"c":20}},"word":"ANTICONCEPTIVA","number":{"position":{"x":127,"y":177},"number":4},"hint":{"text":"4: Debes tomar una pastilla (...) cada día a la misma hora.","position":{"x":34,"y":381}}},{"capsule":{"origin":{"r":4,"c":13},"end":{"r":11,"c":13}},"word":"IMPLANTE","number":{"position":{"x":223,"y":97},"number":5},"hint":{"text":"5: Es colocado debajo de la piel en el brazo y previene el embarazo hasta por 4 años.","position":{"x":34,"y":408}}},{"capsule":{"origin":{"r":4,"c":12},"end":{"r":4,"c":14}},"word":"DIU","number":{"position":{"x":207,"y":97},"number":6},"hint":{"text":"6: Es un método que debe ser colocado dentro del útero.","position":{"x":34,"y":435}}}],"numberStyle":{"font":"8px Helvetica","color":"#000000"},"hintStyle":{"color":"#000000","font":"15px Helvetica","wordWrap":{"width":290}}}',
lider_3_2: '{"words":[{"capsule":{"origin":{"r":3,"c":9},"end":{"r":10,"c":9}},"word":"OBJETIVO","number":{"position":{"x":159,"y":81},"number":1},"hint":{"text":"1: Definir el (…) del plan de acción de forma clara.","position":{"x":34,"y":300}}},{"capsule":{"origin":{"r":1,"c":5},"end":{"r":8,"c":5}},"word":"ACCIONES","number":{"position":{"x":95,"y":49},"number":2},"hint":{"text":"2: Plantear (...) que permitan cumplir el objetivo.","position":{"x":34,"y":326.2451171875}}},{"capsule":{"origin":{"r":11,"c":3},"end":{"r":11,"c":14}},"word":"RESPONSABLES","number":{"position":{"x":63,"y":209},"number":3},"hint":{"text":"3: Definir a las personas (...) de realizar cada acción.","position":{"x":34,"y":352.490234375}}},{"capsule":{"origin":{"r":3,"c":3},"end":{"r":3,"c":10}},"word":"RECURSOS","number":{"position":{"x":63,"y":81},"number":4},"hint":{"text":"4: Identificar los (...) necesarios para llevar a cabo cada acción.","position":{"x":34,"y":378.7353515625}}},{"capsule":{"origin":{"r":6,"c":14},"end":{"r":11,"c":14}},"word":"FECHAS","number":{"position":{"x":239,"y":129},"number":5},"hint":{"text":"5: Establecer (...) límite para la realización de las acciones.","position":{"x":34,"y":404.98046875}}},{"capsule":{"origin":{"r":1,"c":7},"end":{"r":12,"c":7}},"word":"VERIFICACION","number":{"position":{"x":127,"y":49},"number":6},"hint":{"text":"6: Establecer medidas de evaluación o (...) del progreso del plan.","position":{"x":34,"y":431.2255859375}}}],"numberStyle":{"font":"8px Helvetica","color":"#000000"},"hintStyle":{"color":"#000000","font":"15px Helvetica","wordWrap":{"width":290}}}',
    lider_3_4:'{"words":[{"capsule":{"origin":{"r":2,"c":6},"end":{"r":2,"c":17}},"word":"MEMORIALOCAL","number":{"position":{"x":111,"y":65},"number":1},"hint":{"text":"1: La (...) es un herramienta que nos permite conocer qué situaciones de emergencia se vivieron en la comunidad","position":{"x":34,"y":300}}},{"capsule":{"origin":{"r":8,"c":1},"end":{"r":8,"c":13}},"word":"MAPADERIESGOS","number":{"position":{"x":31,"y":161},"number":2},"hint":{"text":"2: El (...) nos permite identificar zonas de mayor riesgo o vulnerabilidad en la comunidad","position":{"x":34,"y":326.2451171875}}},{"capsule":{"origin":{"r":1,"c":10},"end":{"r":8,"c":10}},"word":"BRIGADAS","number":{"position":{"x":175,"y":49},"number":3},"hint":{"text":"3: Las (...) son los grupos responsables de realizar distintas acciones antes, durante y después de una emergencia","position":{"x":34,"y":352.490234375}}},{"capsule":{"origin":{"r":5,"c":5},"end":{"r":5,"c":13}},"word":"SIMULACRO","number":{"position":{"x":95,"y":113},"number":4},"hint":{"text":"4: Un (...) es la simulación de una situación de emergencia con el fin de poner en práctica y evaluar el plan de gestión de riesgos","position":{"x":34,"y":378.7353515625}}}],"numberStyle":{"font":"8px Helvetica","color":"#000000"},"hintStyle":{"color":"#000000","font":"15px Helvetica","wordWrap":{"width":290}}}',
    puber_1_4: '{"words":[{"capsule":{"origin":{"r":3,"c":2},"end":{"r":3,"c":11}},"word":"COMPARTIDA","number":{"position":{"x":47,"y":81},"number":1},"hint":{"text":"1: El uso de métodos anticonceptivos es una responsabilidad (...)","position":{"x":34,"y":300}}},{"capsule":{"origin":{"r":0,"c":7},"end":{"r":9,"c":7}},"word":"EMERGENCIA","number":{"position":{"x":127,"y":33},"number":2},"hint":{"text":"2: Puede tomarse una pastilla de (...) hasta 3 días después de una relación sin protección.","position":{"x":34,"y":327}}},{"capsule":{"origin":{"r":6,"c":5},"end":{"r":6,"c":10}},"word":"CONDON","number":{"position":{"x":95,"y":129},"number":3},"hint":{"text":"3: Es un método de barrera que previene el contagio de ITS y el embarazo.","position":{"x":34,"y":354}}},{"capsule":{"origin":{"r":9,"c":7},"end":{"r":9,"c":20}},"word":"ANTICONCEPTIVA","number":{"position":{"x":127,"y":177},"number":4},"hint":{"text":"4: Debes tomar una pastilla (...) cada día a la misma hora.","position":{"x":34,"y":381}}},{"capsule":{"origin":{"r":4,"c":13},"end":{"r":11,"c":13}},"word":"IMPLANTE","number":{"position":{"x":223,"y":97},"number":5},"hint":{"text":"5: Es colocado debajo de la piel en el brazo y previene el embarazo hasta por 4 años.","position":{"x":34,"y":408}}},{"capsule":{"origin":{"r":4,"c":12},"end":{"r":4,"c":14}},"word":"DIU","number":{"position":{"x":207,"y":97},"number":6},"hint":{"text":"6: Es un método que debe ser colocado dentro del útero.","position":{"x":34,"y":435}}}],"numberStyle":{"font":"8px Helvetica","color":"#000000"},"hintStyle":{"color":"#000000","font":"15px Helvetica","wordWrap":{"width":290}}}',
    puber_2_6: '{"words":[{"capsule":{"origin":{"r":3,"c":5},"end":{"r":8,"c":5}},"word":"CUENTA","number":{"position":{"x":95,"y":81},"number":1},"hint":{"text":"1: Si no tengo cuidado con mi  contraseña pueden robar mi (...)","position":{"x":34,"y":300}}},{"capsule":{"origin":{"r":5,"c":1},"end":{"r":5,"c":12}},"word":"SECUESTRARME","number":{"position":{"x":31,"y":113},"number":2},"hint":{"text":"2: Si planeo encontrarme con personas que conocí en internet pueden (...)","position":{"x":34,"y":326.2451171875}}},{"capsule":{"origin":{"r":0,"c":8},"end":{"r":9,"c":8}},"word":"PELIGROSOS","number":{"position":{"x":143,"y":33},"number":3},"hint":{"text":"3: Las personas que no conozco y están en mis redes sociales son contactos (...)","position":{"x":34,"y":352.490234375}}},{"capsule":{"origin":{"r":1,"c":7},"end":{"r":1,"c":12}},"word":"PERDER","number":{"position":{"x":127,"y":49},"number":4},"hint":{"text":"4: Si las personas roban mi cuenta puedo (...) mi intimidad","position":{"x":34,"y":378.7353515625}}}],"numberStyle":{"font":"8px Helvetica","color":"#000000"},"hintStyle":{"color":"#000000","font":"15px Helvetica","wordWrap":{"width":290}}}',
    adolescente_1_4:'{"words":[{"capsule":{"origin":{"r":6,"c":5},"end":{"r":6,"c":10}},"word":"CONDON","number":{"position":{"x":95,"y":129},"number":1},"hint":{"text":"1: Es un método de barrera que previene el contagio de ITS y el embarazo.","position":{"x":34,"y":300}}},{"capsule":{"origin":{"r":4,"c":12},"end":{"r":4,"c":14}},"word":"DIU","number":{"position":{"x":207,"y":97},"number":2},"hint":{"text":"2: Es un método que debe ser colocado dentro del útero.","position":{"x":34,"y":326.2451171875}}},{"capsule":{"origin":{"r":9,"c":7},"end":{"r":9,"c":20}},"word":"ANTICONCEPTIVA","number":{"position":{"x":127,"y":177},"number":3},"hint":{"text":"3: Debes tomar una cada día a la misma hora.","position":{"x":34,"y":352.490234375}}},{"capsule":{"origin":{"r":0,"c":7},"end":{"r":9,"c":7}},"word":"EMERGENCIA","number":{"position":{"x":127,"y":33},"number":4},"hint":{"text":"4: Puede tomarse una pastilla de (…) hasta 3 días después de una relación sin protección.","position":{"x":34,"y":378.7353515625}}},{"capsule":{"origin":{"r":4,"c":13},"end":{"r":11,"c":13}},"word":"IMPLANTE","number":{"position":{"x":223,"y":97},"number":5},"hint":{"text":"5: Es colocado debajo de la piel en el brazo y previene el embarazo hasta por 4 años","position":{"x":34,"y":404.98046875}}},{"capsule":{"origin":{"r":3,"c":2},"end":{"r":3,"c":11}},"word":"COMPARTIDA","number":{"position":{"x":47,"y":81},"number":6},"hint":{"text":"6: El uso de métodos anticonceptivos es una responsabilidad (…)","position":{"x":34,"y":431.2255859375}}}],"numberStyle":{"font":"8px Helvetica","color":"#000000"},"hintStyle":{"color":"#000000","font":"15px Helvetica","wordWrap":{"width":290}}}',
    adolescente_2_4:'{"words":[{"capsule":{"origin":{"r":0,"c":6},"end":{"r":9,"c":6}},"word":"CONFLICTOS","number":{"position":{"x":111,"y":33},"number":1},"hint":{"text":"1: Todas las familias tienen (...) que resolver.","position":{"x":34,"y":300}}},{"capsule":{"origin":{"r":0,"c":6},"end":{"r":0,"c":17}},"word":"COMUNICACION","number":{"position":{"x":111,"y":33},"number":2},"hint":{"text":"2: La mejor manera de resolver conflictos es a través de la (...)","position":{"x":34,"y":326.2451171875}}},{"capsule":{"origin":{"r":1,"c":8},"end":{"r":1,"c":15}},"word":"EXPRESAR","number":{"position":{"x":143,"y":49},"number":3},"hint":{"text":"3: La comunicación tiene que ver con saber (...) nuestras ideas, opiniones o puntos de vista.","position":{"x":34,"y":352.490234375}}},{"capsule":{"origin":{"r":1,"c":8},"end":{"r":8,"c":8}},"word":"ESCUCHAR","number":{"position":{"x":143,"y":49},"number":4},"hint":{"text":"4: La comunicación tiene que ver con saber (...) a los demás para poder comprenderlos","position":{"x":34,"y":378.7353515625}}},{"capsule":{"origin":{"r":4,"c":7},"end":{"r":4,"c":12}},"word":"JUZGAR","number":{"position":{"x":127,"y":97},"number":5},"hint":{"text":"5: Para generar confianza en la familia es importante no (...) a los demás ni sus opiniones o puntos de vista.","position":{"x":34,"y":404.98046875}}},{"capsule":{"origin":{"r":7,"c":2},"end":{"r":7,"c":8}},"word":"EMPATIA","number":{"position":{"x":47,"y":145},"number":6},"hint":{"text":"6: Al escuchar a una persona debemos ponernos en su lugar y comprender lo que nos quieren decir a esto se le llama: (...)","position":{"x":34,"y":431.2255859375}}}],"numberStyle":{"font":"8px Helvetica","color":"#000000"},"hintStyle":{"color":"#000000","font":"15px Helvetica","wordWrap":{"width":290}}}',
    adolescente_3_8:'{"words":[{"capsule":{"origin":{"r":4,"c":5},"end":{"r":4,"c":15}},"word":"RESILIENCIA","number":{"position":{"x":95,"y":97},"number":1},"hint":{"text":"1: La capacidad de las personas de afrontar las dificultades, problemas o situaciones adversas","position":{"x":34,"y":300}}},{"capsule":{"origin":{"r":2,"c":6},"end":{"r":9,"c":6}},"word":"AMENAZAS","number":{"position":{"x":111,"y":65},"number":2},"hint":{"text":"2: Factores externos que representan un riesgo o peligro.","position":{"x":34,"y":326.2451171875}}},{"capsule":{"origin":{"r":6,"c":7},"end":{"r":6,"c":20}},"word":"VULNERABILIDAD","number":{"position":{"x":127,"y":129},"number":3},"hint":{"text":"3: La (...) es una debilidad que tenemos en caso de que se presente una amenaza.","position":{"x":34,"y":352.490234375}}},{"capsule":{"origin":{"r":1,"c":15},"end":{"r":11,"c":15}},"word":"CAPACIDADES","number":{"position":{"x":255,"y":49},"number":4},"hint":{"text":"4: Las (...) son fortalezas que tenemos o podemos desarrollar para enfrentar de manera exitosa un desastre o una emergencia.","position":{"x":34,"y":378.7353515625}}}],"numberStyle":{"font":"8px Helvetica","color":"#000000"},"hintStyle":{"color":"#000000","font":"15px Helvetica","wordWrap":{"width":290}}}'
  },

  palabrasFaltantes : {
    cuidador_1_2: "1. Las Infecciones de _transmisión_ sexual son enfermedades que se contagian durante las relaciones _sexuales_ sin protección.\n\n" +
      "2. La mejor forma de prevenir las ITS y el embarazo es el correcto uso del _condón_.\n\n" +
      "3. Violencia sexual es:\n" +
      "   - Si alguien toca tus pechos, nalgas, boca o genitales sin tu _consentimiento_.\n" +
      "   - Si alguien te fuerza a que lo _beses_.\n" +
      "   - Si alguien te obliga a sacarte _fotografías_ sin ropa o en posiciones eróticas.",

    cuidador_1_7: "Hace mucho tiempo cerca a un lago se inundaron varias casas, entre ellas la casa de Pedro y Fabiola. Durante todo el día no había parado de _llover_. Entonces, Pedro y Fabiola sintieron mucha _preocupación_ porque su casa y su familia estaban en riesgo. A pesar de esta emoción, Pedro trató de _calmarse_, para ello _respiró_ profundamente y de esa manera pudo sacar de su _casa_, sanos y salvos a sus dos hijas e hijo, quienes estaban con mucho _miedo_. Llegaron a un lugar _seguro_ pero Pedro y Fabiola sabían que tenían que estar alerta para _cuidar_ y _proteger_ a su familia, porque en estas situaciones las _niñas, niños y adolescentes_ son más _vulnerables_ y corren más peligro." +
      "Durante varios días tuvieron que vivir en un _Refugio_, por eso Fabiola les explicó a sus hijas e hijos que ahora más que nunca se tenían que _cuidar_ entre todos, porque hay mucha gente que puede aprovechar esta situación para cometer _abuso sexual_. Y les recordaron que como su madre y padre estaban para _cuidarlos_ y _amarlos_,  y que entre todos resolverán cualquier problema.",

    puber_1_5: "La violencia sexual se refiere a cualquier\n contacto _no deseado_. Sucede cuando alguien te fuerza o presiona física o \nemocionalmente (_amenazas_, chantajes) a que hagas alguna cosa de tipo sexual.\n\n" +
      "Dentro de lo que se considera violencia sexual se encuentra el abuso sexual y la _violación_. El abuso sexual refiere a varias situaciones como: toques, frotes, mostrar las partes íntimas, mostrar pornografía, etc. Todas estas _sin consentimiento_. La violación tiene que ver con tener una relación sexual forzada.\n\n" +
      "Si vives una situación de violencia sexual debes: buscar un lugar seguro, contarle lo sucedido a \nun _adulto_, no cambiarte de ropa o bañarte (en caso de violación) y realizar la _denuncia_ en la policía o en la defensoría de la Niñez y Adolescencia.",

    cuidador_2_1: "Las mamás, papás, cuidadores, comunidad y el estado tenemos la responsabilidad de _proteger_ a las niñas, niños y adolescentes.\n\n" +
      "Los derechos de las niñas, niños y adolescentes están plenamente estipulados en el _código_ niña, niño y adolescente.",

    cuidador_2_4: "Como adultos nuestra responsabilidad es asegurar el _cuidado_ y protección de nuestras hijas e hijos. Sin embargo, también tenemos que enseñarles a _enfrentar_ posibles situaciones de riesgo y el mejor mecanismo de enseñanza es el ejemplo, por lo que el _autocuidado_ lo deben ver en nosotras y nosotros.\n\n" +
      "Identificar personas de _confianza_. Enseñarles\nque una persona de confianza es quien te escucha, te _respeta_ y te trata con cariño, por tanto, puede ser mamá, papá, cuidadores, profesores, etc. Especialmente estas personas te hacen _sentir_ segura, escuchada y te orientan.\n\n" +
      "Enseñarles sobre sus _derechos_ y a expresar\nsus _emociones_.",

    nino_2_6: "El internet es\nuna _herramienta.png_ muy\nútil, que nos\npermite _aprender.png_, informarnos\ny _divertirnos.png_, pero no podemos utilizarla todo el tiempo, tenemos que tener horarios establecidos, cuidarnos de _informacion.png_ falsa y no dar nuestros nombre ni subir _fotos.png_, así podremos disfrutar del internet."
  },

  ahorcado: {
    puber_1_3: [
      'Derecho a decidir sobre mi cuerpo',
      'Derecho a vivir seguro y protegido',
      'Derecho a ser incluido'
    ],
    puber_2_8:[
      'desconocidos',
      'juegos',
      'empleo'
    ],
    puber_3_2:[
      'embarazo',
      'evitar',
      'decision'
    ],
    puber_1_10: [
      'Buena comunicacion',
      'Respeto',
      'Violencia',
      'Desconfianza'
    ]
  }
};
