var utils = {
  tilefy: function (vector, tileSize) {
    return { x: Math.floor(vector.x / tileSize) * tileSize, y: Math.floor(vector.y / tileSize) * tileSize };
  },
  frames: function (key, nums) {
    var arr = [];
    for (var i=0; i<nums.length; i++) {
      arr[i] = { key: key, frame: nums[i] };
    }

    return arr;
  },

  shuffle: function (arr) {
    for (var i=0; i<arr.length-1; i++) {
      var tmp = arr[i];
      var b = utils.randomIntBetween(i+1, arr.length);
      arr[i] = arr[b]
      arr[b] = tmp;
    }
  },

  randomIntBetween: function (a, b) {
    var max = Math.max(a, b);
    var min = Math.min(a, b);

    return Math.floor(min + Math.random() * (max - min));
  },

  distance: function (a, b) {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
  },

  difference: function (a, b) {
    return { x: a.x - b.x, y: a.y - b.y };
  },

  randomPick : function (arr) {
    return arr[utils.randomIntBetween(0, arr.length)];
  },

  deg2Rad : 2 * Math.PI / 360,
  rad2Deg : 360 / (Math.PI * 2)
}
