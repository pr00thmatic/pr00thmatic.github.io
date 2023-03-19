$(document).ready(() => {
  Handlebars.registerHelper('isodd', function (value) {
    return value % 2 == 0;
  });

  var data = {
    game: [ {
      title: "Aventuras con la Patrulla Canina",
      team: "VReality - Arcor - Nickelodeon",
      platform: "Web",
      description: "9 minigames for the pups from Paw Patrol, each of them with its own infinite runner segment."
    }, {
      title: "Jukumari",
      team: "Untamed Fox - VReality",
      platform: "Android",
      description: "Worked in porting the javascript version of Jukumari to Unity for its posterior release to the playstore"
    }, {
      title: "La tierra del Ekeko",
      team: "VReality",
      platform: "Android",
      description: "Development of 6 minigames that simulate the fair games you can find at the Bolivian Alasitas traditional anual fair."
    }, {
      title: "Suri al Futuro",
      team: "Ancestral Gods",
      platform: "Android",
      description: "Main developer, game designer and artist of a top-to-down adventure game featuring time travel."
    } ]
  };
  var gameEntry = $("#game-entry-template").html();
  var compiledCode = Handlebars.compile(gameEntry);
  var result = compiledCode(data);

  $("#game-entries").html(result);
});
