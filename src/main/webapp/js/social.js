var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

var text;
var counter = 0;

function preload () {
    game.load.image('einstein', 'assets/mushroom.jpg');
}

function create() {
    var width = 44;
    var height = 44;

    for (var i = game.world.centerX - width * 2; i <= game.world.centerX + width * 2; i += width) {
        for (var j = game.world.centerY - height * 2; j <= game.world.centerY + height * 2; j += height) {
            var image = game.add.sprite(i, j, 'einstein');
            image.anchor.set(0.5);
            image.width = 44;
            image.height = 44;
            image.inputEnabled = true;
            image.events.onInputDown.add(listener, image);
        }
    }
    text = game.add.text(250, 16, '', { fill: '#ffffff' });
}

function listener () {
    counter++;
    this.tint = 0xff00ff;
    text.text = "You clicked " + counter + " times!";
}
