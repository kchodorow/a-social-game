goog.provide('Inventory');
goog.provide('Resource');

var Inventory = function() {
    this.inventory_ = [];
    var inventory_group = game.add.group();
    var inventory_width = Resource.NUM * 2 * Tile.WIDTH - Tile.WIDTH;
    for (var i = 0; i < Resource.NUM; ++i) {
        var resource = new Resource(inventory_group, Resource.START_FRAME + i);
        var resource_sprite = resource.getSprite();
        resource_sprite.x = i * 2 * Tile.WIDTH;
        inventory_group.add(resource_sprite);
        this.inventory_.push(resource);
    }
    inventory_group.x = game.world.centerX - inventory_width/2;
    inventory_group.y = 20;
};

var Resource = function(parent, frame) {
    this.type_ = frame;
    this.quantity_ = 100;
    this.item_group_ = new Phaser.Group(game, parent, 'item');

    var item = game.add.sprite(0, 0, 'ms', frame);
    item.width = Tile.WIDTH;
    item.height = Tile.HEIGHT;
    this.item_group_.add(item);

    var text = game.add.text(Tile.WIDTH/2, Tile.HEIGHT/2, '100', { fill: '#ffffff' });
    text.anchor.set(0.5);
    this.item_group_.add(text);
};

Resource.NUM = 4;
Resource.START_FRAME = 58;

Resource.prototype.getSprite = function() {
    return this.item_group_;
};
