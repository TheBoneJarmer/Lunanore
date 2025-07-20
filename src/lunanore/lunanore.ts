import * as THREE from "three";
import { Scene } from "./scene";
import { Keyboard } from "./keyboard";
import { Mouse } from "./mouse";
import { LunanoreOptions } from "./structs";
import { ShadowType } from "./enums";

export class Lunanore {
    private static _deltaTime: number = 0;
    private static _lastTime: number = 0;
    private static _scenes: Map<string, Scene> = null;
    private static _sceneNext: string = null;
    private static _scene: string = null;
    private static _renderer: THREE.WebGLRenderer = null;
    private static _canvas: HTMLCanvasElement = null;
    private static _options: LunanoreOptions = null;

    public static get options(): LunanoreOptions {
        return this._options;
    }

    public static get canvas(): HTMLCanvasElement {
        return this._canvas;
    }

    public static get scene(): string {
        return this._scene;
    }

    public static set scene(value: string) {
        this._sceneNext = value;
    }

    public static init(canvas: HTMLCanvasElement, options: LunanoreOptions = new LunanoreOptions()) {
        this._scenes = new Map();
        this._options = options;
        this._canvas = canvas;

        this.initRenderer();
        this.initInput();
        this.initEventListeners();
    }

    private static initInput() {
        Keyboard.init();
        Mouse.init();
    }

    private static initEventListeners() {
        window.addEventListener("resize", this.resize);
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

    public static register(name: string, scene: Scene) {
        this._scenes.set(name, scene);
    }

    public static run() {
        this.callback(0);
    }

    public static resize() {
        const width = this._canvas.clientWidth;
        const height = this._canvas.clientHeight;

        if (this._renderer != null) {
            this._renderer.setSize(width, height);
        }

        if (this._scene != null) {
            const scene = this._scenes.get(this._scene);
            const cam = scene.camera;

            cam.aspect = width / height;
            cam.updateProjectionMatrix();
        }
    };

    private static async callback(time: number) {
        try {
            await Lunanore.update(time);
        } catch (error) {
            console.error("An error occurred during the game loop");
            console.error(error);
        }

        requestAnimationFrame(Lunanore.callback);
    }

    private static async update(time: number) {
        this._deltaTime = time - this._lastTime;
        this._lastTime = time;

        if (this._sceneNext != null) {
            const scene = this._scenes.get(this._sceneNext);

            this._scene = this._sceneNext;
            this._sceneNext = null;

            scene.clear();
            await scene.init();
        }

        if (this._scene != null) {
            const dt = this._deltaTime / 1000.0;
            const scene = this._scenes.get(this._scene);

            for (let obj of scene.actors) {
                await obj.model.update(dt);
                await obj.update(dt);
            }

            await scene.update(dt);

            this._renderer.render(scene.scene, scene.camera);
        }

        Keyboard.update();
        Mouse.update();
    }
}
