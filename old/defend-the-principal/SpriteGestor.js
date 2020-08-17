var SpriteGestor = (function () {
    var globalScale = 2;

    var xDirection = function (sprite) {
        var scaleX = sprite.scale.x;
        return scaleX / Math.abs(scaleX);
    };

    var flipX = function (sprite) {
        var viewDirection = xDirection(sprite);
        viewDirection -= 2*viewDirection; // Math magic! consider yourself flipped
        sprite.scale.set(viewDirection * globalScale, globalScale);
    };

    var setGlobalScale = function (scale) {
        globalScale = scale;
    };

    var coherentlyScale = function (sprite) {
        sprite.scale.set(globalScale * xDirection(sprite), globalScale);
    };

    return {
        xDirection : xDirection,
        flipX : flipX,
        setGlobalScale : setGlobalScale,
        coherentlyScale : coherentlyScale
    };

})();
