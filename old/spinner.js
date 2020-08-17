var CreateSpinner = function (domSpinner) {
  
  var domSpinner = domSpinner;
  var shownElementId = 0;
  var timeout = 2;
  var images = [];
  var descriptions = [];
  
  var initialize = function () {
    var i;

    this.images = this.domSpinner.getElementsByClassName("images")[0]
      .getElementsByClassName("item");
    this.descriptions = this.domSpinner.getElementsByClassName("descriptions")[0]
      .getElementsByClassName("item");

    this.spin();
  };

  var spin = function (context) {
    if (!context) {
      context = this;
    }

    setTimeout((function (context) {
      return function () {
        spin(context);
      }
    })(context), context.timeout * 1000);

    context.setShownElement((context.shownElementId+1) % context.images.length);
  }

  var setShownElement = function (id) {
    this._hide(this.images[this.shownElementId]);
    this._hide(this.descriptions[this.shownElementId]);

    this.shownElementId = id;

    this._show(this.images[this.shownElementId]);
    this._show(this.descriptions[this.shownElementId]);
  }

  var _hide = function (element) {
    element.classList.remove("shown");
    element.classList.add("hidden");
  }

  var _show = function (element) {
    element.classList.remove("hidden");
    element.classList.add("shown");
  }

  return {
    // properties...
    images : images,
    descriptions : descriptions,
    shownElementId : shownElementId,
    domSpinner : domSpinner,
    timeout : timeout,

    // hidden methods...
    _hide : _hide,
    _show : _show,

    // methods...
    initialize : initialize,
    setShownElement : setShownElement,
    spin : spin
  };
};

// initializes all the spinners on the document...
window.addEventListener("load", function () {
  var domSpinners = document.getElementsByClassName("spinner"),
      i = 0,
      spinners = [];

  for (i=0; i<domSpinners.length; i++) {
    spinners[i] = CreateSpinner(domSpinners[i]);
    spinners[i].initialize();
  }
});
