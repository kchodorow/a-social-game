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
            var tile = new Tile(game.add.sprite(i, j, 'einstein'));
        }
    }
    text = game.add.text(250, 16, '', { fill: '#ffffff' });
}
