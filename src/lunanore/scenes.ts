import * as THREE from "three";
import { Scene } from "./scene";

export class Scenes {
    private static _scenes: Map<string, Scene> = new Map();
    private static _scene: string = null;
    private static _sceneNext: string = null;

    public static get scene(): Scene {
        return this._scene != null ? this._scenes.get(this._scene) : null;
    }

    public static get(key: string): Scene {
        return this._scenes.get(key);
    }

    public static add(key: string, scene: Scene) {
        this._scenes.set(key, scene);
    }

    public static navigate(name: string) {
        const scene = this._scenes.get(name);

        if (!scene) {
            throw new Error(`No scene found with name '${name}'`);
        }

        this._sceneNext = name;
    }

    public static clear() {
        this._scenes.clear();
    }

    public static async update(dt: number) {
        if (this._sceneNext != null) {
            const scene = this._scenes.get(this._sceneNext);

            this._scene = this._sceneNext;
            this._sceneNext = null;

            scene.clear();
            await scene.init();
        }

        if (this._scene != null) {
            const scene = this._scenes.get(this._scene);

            for (let obj of scene.actors) {
                await obj.model.update(dt);
                await obj.update(dt);
            }

            await scene.update(dt);
        }
    }

    public static async render(renderer: THREE.WebGLRenderer) {
        if (this._scene != null) {
            const scene = this._scenes.get(this._scene);

            renderer.render(scene.scene, scene.camera);
        }
    }
}