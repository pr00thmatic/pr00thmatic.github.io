var mainState = ( function () {

    var preload = function () {
        game.load.spritesheet('dog', 'assets/dog.png', 46, 43);
    }

    var create = function () {
        this.keyListener = new KeyListener(game.input.keyboard.createCursorKeys());
        game.stage.backgroundColor = '#eee';
    }

    var update = function () {
        this.keyListener.update();
    };

    return { preload : preload,
             create : create,
             update : update };

})();

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');
game.state.add('main', mainState);
game.state.start('main');
