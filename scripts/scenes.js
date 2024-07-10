class Scene {
    constructor() {
    }

    init() {}

    initDraw(context) {}

    update() {}

    draw(context) {}
}

class TitleScene extends Scene {
    constructor() {
        super();
    }

    init() {
        super.init();
    }

    initDraw(context) {
        super.initDraw(context);
    }

    update() {
        super.update();
    }

    draw(context) {
        super.draw();

        // draw title
        context.fillStyle = 'black';
        context.font = '48px serif';
        // center of the screen text
        context.textAlign = 'center';
        context.fillText('Title Scene', 320, 80);

        // draw start button
        context.fillStyle = 'blue';
        context.fillRect(200, 200, 240, 80);
        context.fillStyle = 'white';
        context.font = '24px serif';
        context.fillText('Start', 320, 245);
    }
}

class GameScene extends Scene {
    _mapManager = {};
    _inputManager = {};
    _gamePlayer = {};
    
    constructor() {
        super();
    }

    init() {
        super.init();

        this._mapManager = MapManager.getInstance();
        this._mapManager.init([new GameMap()]);

        // create player
        for(let i = 0; i < this._mapManager._currentMap._mapGrid.length; i++) {
            for(let j = 0; j < this._mapManager._currentMap._mapGrid[i].length; j++) {
                if (this._mapManager._currentMap._mapGrid[i][j] === 11) {
                    this._gamePlayer = new GamePlayer(j, i, true);
                }
            }
        }

        this._gamePlayer.init();
        $gamePlayer = this._gamePlayer;
    }


    update() {
        super.update();

        this._gamePlayer.update();
        this._mapManager.update();
    }

    draw(context) {
        super.draw();

        $gamePlayer.draw(context);
        this._mapManager.draw(context);
    }
}

class GameOverScene extends Scene {
    constructor() {
        super();
    }
}