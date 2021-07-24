var utils = {
  lerp: function (start, end, amt) {
    return Math.min(start, Math.max(end, (1-amt)*start+amt*end))
  },
  randomBetween: function (a, b) { return (Math.max(a,b) - Math.min(a,b)) * Math.random() + Math.min(a,b); },
  lerpedRange: function (range, i, t) {
    return utils.lerp(range[0][i], range[1][i], t);
  },
  randomLerpedRange: function (range, t) {
    return utils.randomBetween(utils.lerpedRange(range, 0, t),
                               utils.lerpedRange(range, 1, t));
  }
};
