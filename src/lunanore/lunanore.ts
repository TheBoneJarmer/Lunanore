import * as THREE from "three";
import { Keyboard } from "./keyboard";
import { Mouse } from "./mouse";
import { LunanoreOptions } from "./structs";
import { ShadowType } from "./enums";
import { Scenes } from "./scenes";
import { Joystick } from "./joystick";

export class Lunanore {
    private static _deltaTime: number = 0;
    private static _lastTime: number = 0;
    private static _renderer: THREE.WebGLRenderer = null;
    private static _canvas: HTMLCanvasElement = null;
    private static _options: LunanoreOptions = null;

    public static get options(): LunanoreOptions {
        return this._options;
    }

    public static get canvas(): HTMLCanvasElement {
        return this._canvas;
    }

    public static init(canvas: HTMLCanvasElement, options: LunanoreOptions = new LunanoreOptions()) {
        this._options = options;
        this._canvas = canvas;

        // Set the css touch-action to none to prevent the mobile os from thinking that dragging means panning
        // Otherwise swiping wont work at all
        canvas.style.touchAction = "none";

        this.initRenderer();
        this.initInput();
    }

    private static initInput() {
        Keyboard.init();
        Mouse.init();
        Joystick.init();
    }

    private static initRenderer() {
        const width = this._canvas.clientWidth;
        const height = this._canvas.clientHeight;
        const shadowOptions = this._options.graphics.shadows;

        const rendererParams = {
            antialias: this._options.graphics.antialias,
            canvas: this._canvas
        };

        const renderer = new THREE.WebGLRenderer(rendererParams);
        renderer.setSize(width, height);
        renderer.shadowMap.enabled = shadowOptions.enabled;

        if (shadowOptions.type == ShadowType.HARD) {
            renderer.shadowMap.type = THREE.PCFShadowMap;
        } else {
            renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        }

        this._renderer = renderer;
    }

    public static run() {
        this.callback(0);
    }

    public static resize(width: number, height: number) {
        const scene = Scenes.scene;

        if (this._renderer != null) {
            this._renderer.setSize(width, height);
        }

        if (scene != null) {
            const cam = scene.camera;

            cam.aspect = width / height;
            cam.updateProjectionMatrix();
        }
    };

    private static async callback(time: number) {
        try {
            await Lunanore.update(time);
            await Lunanore.render();

            requestAnimationFrame(Lunanore.callback);
        } catch (error) {
            console.error("An error occurred during the game loop");
            console.error(error);
        }
    }

    private static async update(time: number) {
        this._deltaTime = time - this._lastTime;
        this._lastTime = time;

        await Scenes.update(this._deltaTime / 1000.0);

        Keyboard.update();
        Mouse.update();
        Joystick.update();
    }

    private static async render() {
        await Scenes.render(this._renderer);
    }
}
