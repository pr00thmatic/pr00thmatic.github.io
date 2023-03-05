$(document).ready(() => {
  var data = {
    templateEngine:"Handlebar",
    italicText:"<i>This text should be in italics</i>"
  };
  var template = $("#template1").html();
  var compiledCode = Handlebars.compile(template);
  var result = compiledCode(data);

  $("#content").html(result);
});
