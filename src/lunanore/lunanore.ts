import * as THREE from "three";
import { Scene } from "./scene";
import { Keyboard } from "./keyboard";
import { Mouse } from "./mouse";

export class Lunanore {
    private static _handle: number = -1;
    private static _scenes: Map<string, Scene> = null;
    private static _sceneNext: string = null;
    private static _scene: string = null;
    private static _renderer: THREE.WebGLRenderer = null;
    private static _clock: THREE.Clock = null;

    public static get canvas(): HTMLCanvasElement {
        return Lunanore._renderer?.domElement;
    }

    public static get scene(): string {
        return this._scene;
    }

    public static set scene(value: string) {
        this._sceneNext = value;

        if (this._scenes.has(value)) {
            throw new Error(`No scene found with key '${value}'`);
        }
    }

    public static init() {
        Lunanore._clock = new THREE.Clock();
        Lunanore._scenes = new Map();
        
        this.initRenderer();
        this.initInput();
        this.initEventListeners();
    }

    private static initInput() {
        Keyboard.init();
        Mouse.init();
    }

    private static initEventListeners() {
        window.addEventListener("resize", Lunanore.resize);
    }

    private static initRenderer() {
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(innerWidth, innerHeight);

        document.body.appendChild(renderer.domElement);
        this._renderer = renderer;
    }

    public static register(name: string, scene: Scene) {
        this._scenes.set(name, scene);
    }

    public static run(scene: string) {
        Lunanore._handle = requestAnimationFrame(Lunanore.loop);
        Lunanore._sceneNext = scene;
    }

    public static resize() {
        if (Lunanore._scene != null) {
            const scene = Lunanore._scenes.get(Lunanore._scene);

            scene.camera.aspect = innerWidth / innerHeight;
            scene.camera.updateProjectionMatrix();
        }

        if (Lunanore._renderer != null) {
            Lunanore._renderer.setSize(innerWidth, innerHeight);
        }
    };

    private static async loop() {
        try {
            if (Lunanore._sceneNext != null) {
                const scene = Lunanore._scenes.get(Lunanore._sceneNext);

                Lunanore._scene = Lunanore._sceneNext;
                Lunanore._sceneNext = null;

                scene.clear();
                await scene.init();
            }

            if (Lunanore._scene != null) {
                const scene = Lunanore._scenes.get(Lunanore._scene);
                const dt = Lunanore._clock.getDelta();

                for (let obj of scene.actors) {
                    await obj.model.update(dt);
                    await obj.update(dt);
                }

                await scene.update(dt);

                Lunanore._renderer.render(scene.scene, scene.camera);
            }

            Keyboard.update();
            Mouse.update();

            Lunanore._handle = requestAnimationFrame(Lunanore.loop);
        } catch (error) {
            console.error("An error occurred during the game loop");
            console.error(error);

            cancelAnimationFrame(Lunanore._handle);
            Lunanore._handle = -1;
        }
    }
}
