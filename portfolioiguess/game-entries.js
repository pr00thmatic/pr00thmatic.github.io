$(document).ready(() => {
  Handlebars.registerHelper('isodd', function (value) {
    return value % 2 == 0;
  });

  var personal = {
    game : [ {
      title: "Hypnogogia",
      team: "Developer, Music by Ariel Velarde",
      platform: "PC, Web",
      devSpan: "6 months (WIP)",
      year: "2022",
      video: "https://www.youtube.com/embed/ScF8L12zgL4",
      img: "",
      description: "In this physics-based game you play over and over the same day in the life of Rafa: an exploited 3rd world doctor, but no matter how hard you try to savotage him, everything works out fine at the end of the day in the most crazy ways."
    }, {
      title: "ConDiplomat",
      team: "Solo developer (WIP)",
      platform: "Oculus Quest",
      devSpan: "4 months (WIP)",
      year: "2019",
      video: "https://youtube.com/embed/yfxcaR8MpHc",
      description: "You are a conartist divorced unemployed parent, your son helps you find a decent job that turns out to be as a diplomat's secretary, except that you actually become the diplomat because he is a slacker and makes you do all of his work. Now you have to attend to diplomatic dinners and decide the destiny of your country, and even the world... SPOILER ALERT: it will all depend on your table etiquette and what gifts you bring to the meetings"
    }, {
      title: "Batallas Intertemporales Marítimas",
      team: "Solo developer",
      platform: "PC",
      devSpan: "2 weeks",
      year: 2021,
      video: "https://www.youtube.com/embed/DvhgQSx0Kjg",
      description: "Ever wondered how would Bolivia be today if Chile never have won the Pacific war? Well with this turn-based strategy game you will have the chance to change the course of time, and save the young girl Genoveva Ríos and Don Eduardo Abaroa from the cruel hands of the chilean army, and command them in a decissive battle for the southern pacific."
    }, {
      title: "ENTROPÍA: El último de los mecaguerreros",
      team: "Solo developer",
      platform: "PC",
      devSpan: "4 days (Unfinished experiment)",
      year: 2022,
      video: "https://youtube.com/embed/6wni-3_fCbI",
      description: "In this minigame I experimented with the shader graph in order to create a dessolation/action/postapocalyptic atmosphere. I also played with Unity's animator in order to allow the last of the mechawarriors to move his legs towards the motion, but at the same time his head and arms towards wherever he was shooting at."
    }, {
      title: "PC XMAS",
      team: "Solo developer",
      platform: "PC, Mobile",
      devSpan: "2 months (WIP)",
      year: 2022,
      video: "https://youtube.com/embed/kkHz7t4Mc0c",
      description: "Santa's reindeers have been confiscated by animal protection! Now he will have to deliver the world's gifts by foot, meanwhile, he will learn a thing or two about basic animal's needs and how to treat them correctly. I started working in this project some xmas ago, now I've decided that I am going to work on it every xmas until I release it."
    }, {
      title: "qeqe",
      team: "Solo developer",
      platform: "PC",
      devSpan: "5 months",
      video: "https://www.youtube.com/embed/W1NdabKynNY",
      description: "qeqe is one of the first games I ever made back in 2015. Even though it was the game I put less effort on, it was the game my friends liked the most! so I decided to continue its development, and migrate it to Unity so everyone can enjoy it."
    }, {
      title: "Orígenes",
      team: "Generalist, Music, concept and script by Gustavo Vásquez",
      platform: "PC",
      devSpan: "2 days",
      year: "2023",
      video: "https://www.youtube.com/embed/TmFXNkW_-N0",
      description: "As an orphan, you set yourself to discover the identity of your father, an origin that is, by now, long forgotten... buried, even. Where better to start looking for the truth than in the City Library? During the '70s in South America, multiple military coups took place. During these regimes, thousands of everyday people, protesters, workers and university students, were killed. Some of them, specially the most notorious political dissidents, disappeared without a trace. In many countries, such as ours, Bolivia and Guatemala, still don't share the records of what occurred during those years, and as such, the fate of thousands of fathers, mothers, daughters and sons are unknown. They tried to root out our identities, but without intending it, those actions rooted our beliefs and shaped future leaves and lives"
    }, {
      title: "Hotel Paraíso",
      team: "Developer, Art and assets by Isbar Abraxas and 6+",
      platform: "PC",
      devSpan: "2 days",
      year: 2020,
      video: "https://youtube.com/embed/4S5aK5o-QgI",
      description: "So you work as a handyman in this 5-stars hotel but the owner is penny-pinching monster, the whole hotel is falling apart and is your job to keep everything working as smoothly as possible for as many time as you can work. Change lightbulbs and turn off fires before the whole floor falls apart. This one was specially a challenge because no one in the team had Unity installed, and the modeller didn't know how to texturize by then, so I had to juggle all the 3D models and textures and integrate them into Unity... I am proud of the result."
    }, {
      title: "WILL-ON",
      team: "Technical artist with @Stylovich and @SeanDoe for the GGJ2022",
      platform: "PC",
      devSpan: "2 days",
      year: 2022,
      video: "https://youtube.com/embed/DumxMRUtZSg",
      description: "Play as Will-On, a robot in a postapocalyptic world that takes care of plants and tries to keep the plant-eating worms away. I was part of a team, I couldn't help too much because I was working, but during the weekend I helped with SFX, plant and worms models and animations"
    }, {
      title: "__________",
      team: "Developer, Music by Gustavo Vásquez, Art by Isbar Abraxas",
      platform: "PC",
      devSpan: "2 days",
      year: "2021",
      video: "https://youtube.com/embed/p3WCdBcfQtA",
      description: "This is a game without words in which you help a son to pack as he explores his memories. This one is a mix of Klotski and perspective puzzles, made in Unity but with a big help from Blender."
    } ]
  };

  var data = {
    game: [ {
      title: "Aventuras con la Patrulla Canina",
      team: "VReality - Arcor - Nickelodeon",
      platform: "Web",
      devSpan: "1 year of development",
      year: "2022",
      video: "https://www.youtube.com/embed/ANQMRN9U_8U",
      img: "img/paw-patrol/zuma.png",
      description: "As the main developer on this project, I was responsible for implementing the core mechanics, the retopology of several models, level design, the creation of several graphic assets and sometimes even the game design  of 7 minigames targeted for children between 3 and 7 years old for each of the Pups of the Paw Patrol."
    }, {
      title: "CybernautsDefender",
      team: "Relativity - Agetic",
      platform: "Android",
      devSpan: "4 months of development",
      year: "2020",
      video: "https://www.youtube.com/embed/Q6ZJc54d4UU",
      img: "img/patrulla-net/lvl7.png",
      description: "As the gameplay programmer for this 3D Platformer-Action game I was responsible for " +
        "implementing the core mechanics for three levels, each featuring a challenging boss fight with " +
        "unique attack patterns and weaknesses, as well as the final boss that culminated in an epic showdown " +
        "in which, in addition to the final boss, all past bosses and enemies would join forces to defeat " +
        "the player."
    }, {
      title: "Suri al Futuro",
      team: "Ancestral Gods - Ministerio de Medio Ambiente y Agua",
      platform: "Android",
      devSpan: "4 months of development",
      year: "2017",
      video: "https://www.youtube.com/embed/5bloLK3CGwQ",
      img: "img/suri-al-futuro/canoa.png",
      description: "As the main developer, game designer, and artist of Suri al Futuro, an RPG adventure game, I was responsible for developing and implementing the core mechanics, including the dialogue system, inventory, and the girl's canoe, as well as designing the game and levels. I also created several graphic assets, added effects to the water, and animated jumping fishes. The game features a little girl traveling back and forth in time to prevent her village lake from drying up and convincing the villagers to care for the water and think about the future. The project was completed within three months."
    }, {
      title: "Jukumari",
      team: "Untamed Fox - VReality - Senda Verde",
      platform: "Android",
      devSpan: "2 months of development",
      year: "2020",
      video: "https://www.youtube.com/embed/pTECmJO5rWg",
      img: "img/jukumari/snake.png",
      description: "As the lead developer on this project, I was responsible for porting the original LibGDX version of Jukumari to Unity to release it on the Play Store. This involved rearranging all the graphic assets, implementing the spine animations as well as developing all of the game mechanics from scratch. With no access to the original code, I had to rely on descriptions from the original game designer to recreate the game as faithfully as possible while also making necessary modifications."
    }, {
      title: "La tierra del Ekeko",
      team: "VReality",
      platform: "Android",
      devSpan: "1.5 months of development",
      year: "2023",
      video: "https://www.youtube.com/embed/gY2RrpcK-OU",
      img: "img/ekeko/all-the-minigames.png",
      description: "As a gameplay programmer and generalist, I contributed to the development of La tierra del Ekeko, a collection of 6 2D minigames that simulate the fair games of the Bolivian Alasitas. I implemented the core mechanics and level design of the minigames, integrated 3D models with 2D sprites, and worked with the team's lead programmer to integrate the levels with the economy system. This was a challenging project completed within a short development time of 1.5 months."
    } ]
  };
  var gameEntry = $("#game-entry-template").html();
  var compiledCode = Handlebars.compile(gameEntry);
  var result = compiledCode(data);

  $("#game-entries").html(result);

  var personalGameEntry = $("#game-entry-template").html();
  var compiledCode = Handlebars.compile(personalGameEntry);
  result = compiledCode(personal);

  $("#personal-game-entries").html(result);

});
