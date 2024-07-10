class GameMap {
    _mapGrid = [];
    _objects = [];

    constructor() {
        this.createMap();
        this._objects.push(new GameEnemy(5, 5, true));
    }

    init() { }

    initDraw(context) { }

    update() { }

    createMap() {
        var dungeonGenerator = new DungeonGenerator(15, 15, 10);
        dungeonGenerator.generateDungeon();
        console.log(dungeonGenerator.dungeon)
        console.log(dungeonGenerator.map)
        this._mapGrid = dungeonGenerator.map;
    }

    draw(context) {
        this.drawMap(context);
        this.drawObjects(context);
    }

    drawMap(context) {
        for (let i = 0; i < this._mapGrid.length; i++) {
            for (let j = 0; j < this._mapGrid[i].length; j++) {
                if (this._mapGrid[i][j] === -1) {
                    context.fillStyle = 'black';
                    context.fillRect(j * $gameConfig.tileWidth, i * $gameConfig.tileHeight, $gameConfig.tileWidth, $gameConfig.tileHeight);
                }
                if (this._mapGrid[i][j] === 1) {
                    context.fillStyle = 'black';
                    context.fillRect(j * $gameConfig.tileWidth, i * $gameConfig.tileHeight, $gameConfig.tileWidth, $gameConfig.tileHeight);
                }
            }
        }
    }

    drawObjects(context) {
        for (let i = 0; i < this._objects.length; i++) {
            this._objects[i].draw(context);
        }
    }
}

class GameObject {
    x = 0;
    y = 0;
    screenX = 0;
    screenY = 0;
    solid = true;

    constructor(x, y, solid) {
        this.x = x;
        this.y = y;
        this.solid = solid;
    }

    init() { }

    initDraw(context) { }

    update() {
        this.screenX = this.x * $gameConfig.tileWidth;
        this.screenY = this.y * $gameConfig.tileHeight;
     }

    draw(context) { }
}

class GamePlayer extends GameObject {
    constructor(x, y, solid) {
        super(x, y, solid);
    }

    movementComponent;

    init() {
        this.movementComponent = new MovementComponent(this);
        this.movementComponent.init();
    }

    update() {
        super.update();
    }

    draw(context) {
        super.draw(context);

        context.fillStyle = 'blue';
        context.fillRect(this.screenX, this.screenY, $gameConfig.tileWidth, $gameConfig.tileHeight);
    }
}

class GameEnemy extends GameObject {
    constructor(x, y, solid) {
        super(x, y, solid);
    }

    update() {
        super.update();
    }

    draw(context) {
        super.draw(context);

        context.fillStyle = 'red';
        context.fillRect(this.screenX, this.screenY, $gameConfig.tileWidth, $gameConfig.tileHeight);
    }
}

class Camera {
    x = 0;
    y = 0;
    difX = 0;
    difY = 0;

    constructor(player) { }

    init() { }

    initDraw(context) { }

    update() {
        if (!$gamePlayer) { return; }

        var playerX = $gamePlayer.screenX - $gameConfig.canvasWidth / 2;
        var playerY = $gamePlayer.screenY - $gameConfig.canvasHeight / 2;

        this.difX = playerX - this.x;
        this.difY = playerY - this.y;

        this.x = playerX;
        this.y = playerY;
    }

    draw(context) {
        context.clearRect(0, 0, this.x * $gameConfig.canvasWidth, this.y * $gameConfig.canvasHeight);
        context.translate(-this.difX, -this.difY);
    }
}