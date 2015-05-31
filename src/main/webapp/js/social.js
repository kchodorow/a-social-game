var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update : update });

var tiles = [];
var counter = 0;

function preload () {
    game.load.spritesheet('ms', 'assets/spritesheet.png', 16, 16);
}

function create() {
    var frames = game.cache.getFrameData('ms').getFrames();

    for (var i = game.world.centerX - Tile.WIDTH * 2;
         i <= game.world.centerX + Tile.WIDTH * 2; i += Tile.WIDTH) {
        for (var j = game.world.centerY - Tile.HEIGHT * 2;
             j <= game.world.centerY + Tile.HEIGHT * 2; j += Tile.HEIGHT) {
            tiles.push(new Tile.EmptyTile(game.add.sprite(i, j, 'ms', 39)));
        }
    }
};

function update() {
    for (var i = 0; i < tiles.length; ++i) {
        tiles[i].update();
    }
};
