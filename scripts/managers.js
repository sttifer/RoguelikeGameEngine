class SceneManager {
    _titleScene = null;
    _gameScene = null;
    _gameOverScene = null;
    _currentScene = null;
    _camera = null;

    constructor() {
        this._titleScene = new TitleScene();
        this._gameScene = new GameScene();
        this._gameOverScene = new GameOverScene();
        this._camera = new Camera();
        this._currentScene = this._gameScene;
    }

    static getInstance() {
        if (!SceneManager.instance) {
            SceneManager.instance = new SceneManager();
        }

        return SceneManager.instance;
    }
    
    init() {
        this._camera.init();
        this._gameScene.init();

        this.update();

        InputManager.getInstance().subscribe((event) => {
            this.update();
        });
    }

    initDraw(context) {
        this._currentScene.initDraw(context);
        this._camera.initDraw(context);

        this.draw(context);

        InputManager.getInstance().subscribe((event) => {
            $gameCore.clearScreen();

            this.draw(context);
        });
    }

    update() {
        this._currentScene.update();
        this._camera.update();
    }

    draw(context) {
        this._camera.draw(context);
        this._currentScene.draw(context);
    }

    loadScene(scene) {
        this._currentScene = scene;
    }
}

class MapManager {
    _maps = [];
    _currentMap = null;
    _tileWidth = 32;
    _tileHeight = 32;

    static getInstance() {
        if (!MapManager.instance) {
            MapManager.instance = new MapManager();
        }
        
        return MapManager.instance;
    }

    init(maps) {
        this._maps = maps;
        this.changeMap(0);
        
        this._currentMap.init();
    }
    
    initDraw(context) {
        if (!this._currentMap) { return; }
        
        this._currentMap.initDraw(context);
    }

    update() {
        if (!this._currentMap) { return; }
        
        this._currentMap.update();
    }

    draw(context) {
        if (!this._currentMap) { return; }
        
        this._currentMap.draw(context);
    }

    // chamar init e initDraw do mapa atual
    changeMap(index) {
        this._currentMap = this._maps[index];
    }
}

class InputManager {
    listeners = [];

    constructor() {
        window.addEventListener('keydown', (event) => {
            this.notify(event);
        });
    }

    static getInstance() {
        if (!InputManager.instance) {
            InputManager.instance = new InputManager();
        }

        return InputManager.instance;
    }   
  
    subscribe(listener) {
      this.listeners.push(listener);
    }
  
    unsubscribe(listener) {
      this.listeners = this.listeners.filter(l => l !== listener);
    }
  
    notify(event) {
      this.listeners.forEach(listener => listener(event));
    }
}