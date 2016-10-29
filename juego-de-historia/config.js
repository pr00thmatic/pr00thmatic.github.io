var config = {
  'main-level' : {
    house : {
      x : 500,
      y : 240
    },
    storage : {
      x : 1000,
      y : 240
    }
  },
  'house' : {
  },
  'storage' : {
  },
  'beach' : {
  },

  parallax: {
    skyWidth : 2000,
    floorHeight : 100
  },

  girl : {
    jumpHeight : 150
  },

  qa : [
    {
      question : {
        text : 'Para qué se usaba el guano?',
        place : {
          x : 30,
          y : 250,
          levelName : 'storage'
        },
      },
      answer : {
        text : 'Para fertilizar la tierra',
        place : {
          x : 550,
          y : 240,
          levelName : 'main-level'
        }
      },
    }, {
      question : {
        text : 'En dónde se recolecta el guano?',
        place : {
          x : 40,
          y : 350,
          levelName : 'storage'
        },
      },
      answer : {
        text : 'En el puerto. Las heces de las gaviotas, luego de unos años, se convierten en guano.',
        place : {
          x : 190,
          y : 240,
          levelName : 'beach'
        }
      }
    }]
};
