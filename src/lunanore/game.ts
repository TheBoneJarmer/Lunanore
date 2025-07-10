import { Clock, WebGLRenderer } from "three";
import { GameScene } from "./game-scene.js";
import { GameAssets } from "./game-assets.js";

export class Game {
    private _sceneNext: GameScene = null;
    private _scene: GameScene = null;
    private _renderer: WebGLRenderer = null;
    private _assets: GameAssets = null;
    private _clock: Clock = null;

    public get scene(): GameScene {
        return this._scene;
    }

    public set scene(value: GameScene) {
        this._sceneNext = value;
    }

    constructor() {
        this._renderer = new WebGLRenderer();
        this._assets = new GameAssets();
        this._scene = null;
        this._sceneNext = null;
        this._clock = new Clock();
    }

    public run() {
        window.addEventListener("resize", this.onResize);

        this._renderer.setSize(innerWidth, innerHeight);
        this._renderer.setAnimationLoop(async () => {
            await this.onAnimate();
        });

        document.body.appendChild(this._renderer.domElement);
    }

    /* HELPER FUNCTIONS */

    /* CALLBACKS */
    private async onAnimate() {
        if (this._sceneNext != null) {
            this._scene = this._sceneNext;
            this._sceneNext = null;

            await this._scene.init(this._assets);
        }

        if (this._scene != null) {
            await this._scene.update(this._clock.getDelta());
            await this._scene.render(this._renderer);
        }
    }

    private onResize = () => {
        if (this._scene != null) {
            this._scene.camera.aspect = innerWidth / innerHeight;
            this._scene.camera.updateProjectionMatrix();
        }

        if (this._renderer != null) {
            this._renderer.setSize(innerWidth, innerHeight);
        }
    };
}
