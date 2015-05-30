var Tile = function(sprite) {
    this.sprite_ = sprite;
    sprite.anchor.set(0.5);
    sprite.width = Tile.WIDTH;
    sprite.height = Tile.HEIGHT;
    sprite.inputEnabled = true;
    sprite.events.onInputDown.add(this.listener_, this);
    sprite.events.onInputOver.add(this.showTimer_, this);
    sprite.events.onInputOut.add(this.hideTimer_, this);

    this.level_ = 0;
    this.timer_ = game.time.create(false);
    this.timer_.add(11000, this.finish_, this);
    this.text_ = game.add.text(this.sprite_.x, this.sprite_.y, '', { fill: '#ffffff' });
    this.text_.anchor.set(0.5);
    this.text_.visible = false;

    // TODO: move to subclasses.
    this.color_ = 0xffffff;
    this.color_inc_ = 0x202000;
};

Tile.WIDTH = 64;
Tile.HEIGHT = 64;

Tile.prototype.update = function() {
    if (this.timer_.running) {
        this.text_.text = this.getLevelTime_() - Math.floor(this.timer_.ms / 1000);
    }
};

Tile.prototype.listener_ = function() {
    if (this.timer_.running) {
        return;
    }
    this.text_.visible = true;
    this.timer_.start();
    this.color_ -= this.color_inc_;
    this.sprite_.tint = this.color_;
};

Tile.prototype.showTimer_ = function() {
    this.text_.visible = true;
};

Tile.prototype.hideTimer_ = function() {
    this.text_.visible = false;
};

Tile.prototype.getLevelTime_ = function() {
    var time = [10, 100, 1000, 10000];
    return time[this.level_];
};

Tile.prototype.finish_ = function() {
    this.timer_.stop();
    this.level_++;
    this.text_.visible = false;
};
