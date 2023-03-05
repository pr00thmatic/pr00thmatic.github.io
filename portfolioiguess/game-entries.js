$(document).ready(() => {
  var data = {
    title: "zicko el niño feral",
    team: "zolo io",
    platform: "pc master race",
    description: "zicko escapa de casa y decide no hablar con nadie nunca más, pero en su viaje descubrirá que los animales hablan más de lo que él esperaba"
  };
  var gameEntry = $("#game-entry-template").html();
  var compiledCode = Handlebars.compile(gameEntry);
  var result = compiledCode(data);

  $("#game-entries").html(result);
});
