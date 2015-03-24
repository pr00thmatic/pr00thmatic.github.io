var KeyListener = function (keyboard) {
    var i,
        keys = ['Q', 'W', 'E',
                'A', 'S', 'D',
                'Z', 'X', 'C'];

    this.keyboard = keyboard;
    for (i = keys.length-1; i >= 0; i--) {
        this.addKey(keys[i]);
    }

    this.sequence = [];
};

KeyListener.prototype.addKey = function (key) {
    var keyCode = Phaser.keyboard,
        keyboard = game.input.keyboard;

    this.keyboard[key] = keyboard.addKey(keyCode[key]);
};

KeyListener.prototype.addSequence = function (sequence) {
    var i;
    this.sequence.push(sequence);

    for (i = sequence.length-1; i >= 0; i--) {
        if (typeof(sequence[i]) === "string") {
            this.addKey(sequence[i]);
        }
    }
};

KeyListener.prototype.update = function () {

};
