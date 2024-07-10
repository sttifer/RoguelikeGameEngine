$gamePlayer = null;
$gameConfig = {
    tileWidth: 32,
    tileHeight: 32,
    canvasWidth: 640,
    canvasHeight: 480
}
$gameCore = null;

class GameCore
{
    _canvas = null;
    _context = null;

    constructor() {
        this._canvas = document.getElementById('game');
        this._context = this._canvas.getContext('2d');

        $gameConfig.canvasWidth = this._canvas.width;
        $gameConfig.canvasHeight = this._canvas.height;

        this._sceneManager = SceneManager.getInstance();

        this.init();
        this.initDraw();
        // this.loop();
    }

    static getInstance() {
        if (!GameCore.instance) {
            GameCore.instance = new GameCore();
        }

        return GameCore.instance;
    }

    init() {
        this._sceneManager.init();
    }

    initDraw() {
        this.clearScreen();
        this._sceneManager.initDraw(this._context);
    }

    update() {
        this._sceneManager.update();
    }

    draw() {
        this.clearScreen();
        this._sceneManager.draw(this._context);
    }

    loop() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.loop());
    }

    clearScreen() {
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }
}

$gameCore = GameCore.getInstance();