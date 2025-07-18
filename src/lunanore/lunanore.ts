import * as THREE from "three";
import { Scene } from "./scene";
import { Keyboard } from "./keyboard";
import { Mouse } from "./mouse";

export class Lunanore {
    private static _handle: number = -1;
    private static _sceneNext: Scene = null;
    private static _scene: Scene = null;
    private static _renderer: THREE.WebGLRenderer = null;
    private static _clock: THREE.Clock = new THREE.Clock();

    public static get canvas(): HTMLCanvasElement {
        return Lunanore._renderer?.domElement;
    }

    public static get scene(): Scene {
        return Lunanore._scene;
    }

    public static set scene(value: Scene) {
        Lunanore._sceneNext = value;
    }

    public static async init() {
        Lunanore._clock = new THREE.Clock();
        Lunanore._renderer = new THREE.WebGLRenderer();
        Lunanore._renderer.setSize(innerWidth, innerHeight);
        document.body.appendChild(Lunanore._renderer.domElement);

        window.addEventListener("resize", Lunanore.resize);

        Keyboard.init();
        Mouse.init();
    }

    public static async run() {
        try {
            if (Lunanore._sceneNext != null) {
                Lunanore._scene = Lunanore._sceneNext;
                Lunanore._sceneNext = null;

                await Lunanore._scene.clear();
                await Lunanore._scene.init();
            }

            if (Lunanore._scene != null) {
                const dt = Lunanore._clock.getDelta();

                for (let obj of Lunanore._scene.actors) {
                    await obj.model.update(dt);
                    await obj.update(dt);
                }

                await Lunanore._scene.update(dt);
                
                Lunanore._renderer.render(Lunanore._scene.scene, Lunanore._scene.camera);
            }

            Keyboard.update();
            Mouse.update();
        } catch (error) {
            console.error("An error occurred during the game loop");
            console.error(error);

            cancelAnimationFrame(Lunanore._handle);
            Lunanore._handle = -1;
            return;
        }

        Lunanore._handle = requestAnimationFrame(Lunanore.run);
    }

    public static resize() {
        if (Lunanore._scene != null) {
            Lunanore._scene.camera.aspect = innerWidth / innerHeight;
            Lunanore._scene.camera.updateProjectionMatrix();
        }

        if (Lunanore._renderer != null) {
            Lunanore._renderer.setSize(innerWidth, innerHeight);
        }
    };
}
