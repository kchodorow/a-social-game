var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update : update });

var tiles = [];
var counter = 0;

function preload () {
    game.load.image('einstein', 'assets/mushroom.jpg');
    game.load.spritesheet('ms', 'assets/spritesheet.png', 16, 16);
}

function create() {
    var width = 64;
    var height = 64;
    var frames = game.cache.getFrameData('ms').getFrames();

    for (var i = game.world.centerX - width * 2; i <= game.world.centerX + width * 2; i += width) {
        for (var j = game.world.centerY - height * 2; j <= game.world.centerY + height * 2; j += height) {
            tiles.push(new Tile(game.add.sprite(i, j, 'ms', 0)));
        }
    }
};

function update() {
    for (var i = 0; i < tiles.length; ++i) {
        tiles[i].update();
    }
};
