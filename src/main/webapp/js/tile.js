var Tile = function(sprite) {
    this.sprite_ = sprite;
    sprite.anchor.set(0.5);
    sprite.width = Tile.WIDTH;
    sprite.height = Tile.HEIGHT;
    sprite.inputEnabled = true;
    sprite.events.onInputDown.add(this.listener, this);

    this.level_ = 0;
    this.timer_ = game.time.create(false);
    this.timer_.add(11000, this.finish_, this);
};

Tile.WIDTH = 44;
Tile.HEIGHT = 44;

Tile.prototype.getSprite = function() {
    return this.sprite_;
};

Tile.prototype.listener = function() {
    if (this.timer_.running) {
        return;
    }
    this.text_ = game.add.text(this.sprite_.x, this.sprite_.y, '', { fill: '#ffffff' });
    this.text_.anchor.set(0.5);
    this.timer_.start();

    this.level_++;
    this.sprite_.tint = 0xff00ff;
};

Tile.prototype.update = function() {
    if (this.timer_.running) {
        this.text_.text = Math.floor(this.timer_.ms / 1000);
    }
};

Tile.prototype.finish_ = function() {
    console.log("done");
    this.timer_.stop();
};
