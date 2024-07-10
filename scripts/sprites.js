class Sprite {
    x = 0;
    y = 0;
    
    constructor(x, y, image) {
        this.x = x;
        this.y = y;
        this.image = image;
    }

    draw() {
        // image(this.image, this.x, this.y);
    }
}

class Rect {
    x = 0;
    y = 0;
    width = 0;
    height = 0;
    color = 'black';

    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw() {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}
