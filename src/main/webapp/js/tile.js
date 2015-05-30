var Tile = function(sprite) {
    this.sprite_ = sprite;
    sprite.anchor.set(0.5);
    sprite.width = Tile.WIDTH;
    sprite.height = Tile.HEIGHT;
    sprite.inputEnabled = true;
    sprite.events.onInputDown.add(this.listener, this);
};

Tile.WIDTH = 44;
Tile.HEIGHT = 44;

Tile.prototype.getSprite = function() {
    return this.sprite_;
};

Tile.prototype.listener = function() {
    counter++;
    this.sprite_.tint = 0xff00ff;
    text.text = "You clicked " + counter + " times!";
};
