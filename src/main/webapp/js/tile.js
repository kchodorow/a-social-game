goog.provide('Tile');
goog.provide('Tile.EmptyTile');

goog.require('Resource');

var Tile = function(sprite) {
    this.sprite_ = sprite;
    sprite.anchor.set(0.5);
    sprite.width = Tile.WIDTH;
    sprite.height = Tile.HEIGHT;
    sprite.inputEnabled = true;
    sprite.events.onInputDown.add(this.listener, this);
    sprite.events.onInputOver.add(this.showTimer_, this);
    sprite.events.onInputOut.add(this.hideTimer_, this);

    this.level_ = 0;
    // If there is a timer running for this tile.
    this.timer_ = false;
    // The text for the timer.
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
    if (this.timer_) {
        var secsRemaining = this.getLatencySecs() -
                Math.floor((new Date().getTime() - this.start_ms_) / 1000);
        if (secsRemaining == 0) {
            this.timer_ = false;
            this.finish_();
        }
        this.text_.text = secsRemaining;
    }
};

Tile.prototype.getLatencySecs = function() {
    var time = [10, 100, 1000, 10000];
    return time[this.level_];
};

Tile.prototype.listener = function() {
    if (this.timer_) {
        return;
    }
    this.timer_ = true;
    // We don't use the in-game timer because we don't want pausing/switching
    // tabs to pause the timer.
    this.start_ms_ = new Date().getTime();
    this.text_.visible = true;
    this.color_ -= this.color_inc_;
    this.sprite_.tint = this.color_;
};

Tile.prototype.showTimer_ = function() {
    this.text_.visible = true;
};

Tile.prototype.hideTimer_ = function() {
    this.text_.visible = false;
};

Tile.prototype.finish_ = function() {
    this.level_++;
    this.text_.visible = false;
};

Tile.EmptyTile = function(sprite) {
    goog.base(this, sprite);
};

goog.inherits(Tile.EmptyTile, Tile);

Tile.EmptyTile.prototype.listener = function() {
    var modal_group = game.add.group();

    var modal = game.add.graphics(game.width, game.height);
    modal.beginFill("0x000000", 0.7);
    modal.x = 0;
    modal.y = 0;
    modal.inputEnabled = true;
    modal.drawRect(0, 0, game.width, game.height);
    modal_group.add(modal);

    var item_width = Resource.NUM * 2 * Tile.WIDTH - Tile.WIDTH;
    for (var i = 0; i < Resource.NUM; ++i) {
        var resource_type = Resource.START_FRAME + i;
        var item = game.add.sprite(i * 2 * Tile.WIDTH, 200, 'ms', resource_type);
        item.width = Tile.WIDTH;
        item.height = Tile.HEIGHT;
        item.inputEnabled = true;
        item.events.onInputDown.add(this.buy, {tile:this, store:modal_group, type:resource_type});
        modal_group.add(item);
    }
    modal_group.x = game.world.centerX - item_width/2;

    game.world.bringToTop(modal_group);
};

Tile.EmptyTile.prototype.buy = function() {
    this.store.visible = false;
    this.tile.sprite_.frame = this.type;
};
