$(document).ready(() => {
  Handlebars.registerHelper('isodd', function (value) {
    return value % 2 == 0;
  });

  var data = {
    game: [ {
      title: "Aventuras con la Patrulla Canina",
      team: "VReality - Arcor - Nickelodeon",
      platform: "Web",
      devSpan: "1 year of development",
      year: "2022",
      img: "img/paw-patrol/zuma.png",
      description: "As the main developer on this project, I was responsible for implementing the core mechanics, the retopology of several models, level design, the creation of several graphic assets and sometimes even the game design  of 7 minigames targeted for children between 3 and 7 years old for each of the Pups of the Paw Patrol."
    }, {
      title: "Jukumari",
      team: "Untamed Fox - VReality",
      platform: "Android",
      devSpan: "2 months of development",
      year: "2020",
      img: "img/jukumari/snake.png",
      description: "As the lead developer on this project, I was responsible for porting the original LibGDX version of Jukumari to Unity to release it on the Play Store. This involved rearranging all the graphic assets, implementing the spine animations as well as developing all of the game mechanics from scratch. With no access to the original code, I had to rely on descriptions from the original game designer to recreate the game as faithfully as possible while also making necessary modifications."
    }, {
      title: "La tierra del Ekeko",
      team: "VReality",
      platform: "Android",
      devSpan: "1.5 months of development",
      year: "2023",
      img: "img/ekeko/all-the-minigames.png",
      description: "As a gameplay programmer and generalist, I contributed to the development of La tierra del Ekeko, a collection of 6 2D minigames that simulate the fair games of the Bolivian Alasitas. I implemented the core mechanics and level design of the minigames, integrated 3D models with 2D sprites, and worked with the team's lead programmer to integrate the levels with the economy system. This was a challenging project completed within a short development time of 1.5 months."
    }, {
      title: "Suri al Futuro",
      team: "Ancestral Gods",
      platform: "Android",
      devSpan: "4 months of development",
      year: "2017",
      img: "img/suri-al-futuro/canoa.png",
      description: "As the main developer, game designer, and artist of Suri al Futuro, an RPG adventure game, I was responsible for developing and implementing the core mechanics, including the dialogue system, inventory, and the girl's canoe, as well as designing the game and levels. I also created several graphic assets, added effects to the water, and animated jumping fishes. The game features a little girl traveling back and forth in time to prevent her village lake from drying up and convincing the villagers to care for the water and think about the future. The project was completed within three months."
    }, {
      title: "CybernautsDefender",
      team: "Relativity",
      platform: "Android",
      devSpan: "4 months of development",
      year: "2020",
      img: "img/patrulla-net/lvl7.png",
      description: "As the gameplay programmer for this 3D Platformer-Action game I was responsible for " +
        "implementing the core mechanics for three levels, each featuring a challenging boss fight with " +
        "unique attack patterns and weaknesses, as well as the final boss that culminated in an epic showdown " +
        "in which, in addition to the final boss, all past bosses and enemies would join forces to defeat " +
        "the player."
    } ]
  };
  var gameEntry = $("#game-entry-template").html();
  var compiledCode = Handlebars.compile(gameEntry);
  var result = compiledCode(data);

  $("#game-entries").html(result);
});
