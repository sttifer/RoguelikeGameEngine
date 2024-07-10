class Component {
    _gameObject = null;

    constructor(gameObject) {
        this._gameObject = gameObject;
    }

    init() {}

    update() {}

    draw() {}
}

class MovementComponent extends Component {
    constructor(gameObject) {
        super(gameObject);
    }

    init() {
        super.init();

        InputManager.getInstance().subscribe((event) => { $gamePlayer.movementComponent.checkInput(event); });
    }

    update() {
        super.update();
    }

    checkInput(event) {
        switch(event.key) {
            case 'ArrowUp':
                this.move(0, -1);
                break;
            case 'ArrowDown':
                this.move(0, 1);
                break;
            case 'ArrowLeft':
                this.move(-1, 0);
                break;
            case 'ArrowRight':
                this.move(1, 0);
                break;
        }
    }

    move(x, y) {
        this._gameObject.x += x;
        this._gameObject.y += y;

        if (MapManager.instance._currentMap._mapGrid.length > 0) {
            if (MapManager.instance._currentMap._mapGrid[this._gameObject.y][this._gameObject.x] === 1) {
                this._gameObject.x -= x;
                this._gameObject.y -= y;
            }
        }

        if (MapManager.instance._currentMap._objects.forEach(obj => {
            if (obj.x === this._gameObject.x && obj.y === this._gameObject.y && obj.solid == true) {
                this._gameObject.x -= x;
                this._gameObject.y -= y;
            }
        }));
    }
}