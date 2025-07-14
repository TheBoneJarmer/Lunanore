import { Clock, WebGLRenderer } from "three";
import { GameScene } from "./game-scene";
import { Keyboard } from "./keyboard";
import { Cursor } from "./cursor";

export class Game {
    private static _handle: number = -1;
    private static _sceneNext: GameScene = null;
    private static _scene: GameScene = null;
    private static _renderer: WebGLRenderer = null;
    private static _clock: Clock = new Clock();

    public static get canvas(): HTMLCanvasElement {
        return Game._renderer?.domElement;
    }

    public static get scene(): GameScene {
        return Game._scene;
    }

    public static set scene(value: GameScene) {
        Game._sceneNext = value;
    }

    public static async init() {
        Game._clock = new Clock();
        Game._renderer = new WebGLRenderer();
        Game._renderer.setSize(innerWidth, innerHeight);
        document.body.appendChild(Game._renderer.domElement);

        window.addEventListener("resize", Game.resize);

        Keyboard.init();
        Cursor.init();
    }

    public static async run() {
        try {
            if (Game._sceneNext != null) {
                Game._scene = Game._sceneNext;
                Game._sceneNext = null;

                await Game._scene.init();
            }

            if (Game._scene != null) {
                await Game._scene.update(Game._clock.getDelta());
                await Game._scene.render(Game._renderer);
            }

            Keyboard.update();
            Cursor.update();
        } catch (error) {
            console.error("An error occurred during the game loop");
            console.error(error);

            cancelAnimationFrame(this._handle);
            Game._handle = -1;
            return;
        }

        Game._handle = requestAnimationFrame(Game.run);
    }

    public static resize() {
        if (Game._scene != null) {
            Game._scene.camera.aspect = innerWidth / innerHeight;
            Game._scene.camera.updateProjectionMatrix();
        }

        if (Game._renderer != null) {
            Game._renderer.setSize(innerWidth, innerHeight);
        }
    };
}
