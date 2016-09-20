var Integrator = {};

var load = function () {
  var equiprobable = {
    dom : {
      input : document.getElementsByName("input-equiprobable")[0],
      output : document.getElementById("output-equiprobable"),
      accuracy : document.getElementById("limite-equiprobable")
    }
  },
      variable = {
        dom : {
          input : document.getElementsByName("input-variable")[0],
          output : document.getElementById("output-variable"),
          accuracy : document.getElementById("limite-variable")
        }
      };
  
  equiprobable.dom.input.
    addEventListener("keyup", function () {
      if (equiprobable.dom.input.value != "") 
        Integrator.refreshComponent(equiprobable.dom, even)
    });

  variable.dom.input.
    addEventListener("keyup", function () {
      if (variable.dom.input.value != "") 
      Integrator.refreshComponent(variable.dom, uneven)
    });
};

window.addEventListener("load", load);

Integrator.refreshComponent = function (dom, ac) {
  var encoded = ac.encode(dom.input.value);
  var decoded = ac.decode(encoded);

  if (ac.accuracyLimitReached) {
    dom.accuracy.classList.remove("hidden");
  } else {
    dom.accuracy.classList.add("hidden");
  }

  dom.output.innerHTML = "<p>" + encoded + "</p> <p>" + decoded + "</p>";
}
