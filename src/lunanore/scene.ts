import * as THREE from "three";
import { Actor } from "./actor";
import { Lunanore } from "./lunanore";
import { ShadowQuality } from "./enums";

export abstract class Scene {
    private _actors: Actor[] = [];
    private _scene: THREE.Scene = null;
    private _camera: THREE.PerspectiveCamera = null;
    private _light: THREE.Light = null;
    private _ambient: THREE.AmbientLight = null;

    public get scene(): THREE.Scene {
        return this._scene;
    }

    public get actors(): Actor[] {
        return this._actors;
    }

    public get camera(): THREE.PerspectiveCamera {
        return this._camera;
    }

    public set camera(value: THREE.PerspectiveCamera) {
        this._camera = value;
    }

    public get light(): THREE.Light {
        return this._light;
    }

    public set light(value: THREE.Light) {
        this._light = value;
    }

    public get ambient(): THREE.AmbientLight {
        return this._ambient;
    }

    public set ambient(value: THREE.AmbientLight) {
        this._ambient = value;
    }

    constructor() {
        this.constructScene();
        this.constructCamera();
        this.constructLight();
    }

    private constructScene() {
        this._scene = new THREE.Scene();
    }

    private constructCamera() {
        const width = Lunanore.canvas.clientWidth;
        const height = Lunanore.canvas.clientHeight;

        const fov = 60.0;
        const aspect = width / height;
        const near = 0.01;
        const far = 1000.0;

        this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    }

    private constructLight() {
        const shadowOptions = Lunanore.options.graphics.shadows;

        this._light = new THREE.DirectionalLight("#ffffff", 1.0);
        this._light.position.set(10, 10, 10);

        if (shadowOptions.enabled) {
            this._light.castShadow = true;

            if (shadowOptions.quality == ShadowQuality.LOW) {
                this._light.shadow.mapSize.width = 512;
                this._light.shadow.mapSize.height = 512;
            }

            if (shadowOptions.quality == ShadowQuality.MEDIUM) {
                this._light.shadow.mapSize.width = 1024;
                this._light.shadow.mapSize.height = 1024;
            }

            if (shadowOptions.quality == ShadowQuality.HIGH) {
                this._light.shadow.mapSize.width = 2048;
                this._light.shadow.mapSize.height = 2048;
            }

            if (shadowOptions.quality == ShadowQuality.ULTRA) {
                this._light.shadow.mapSize.width = 4096;
                this._light.shadow.mapSize.height = 4096;
            }

            const cam = this._light.shadow.camera as THREE.OrthographicCamera;
            cam.left = -20;
            cam.right = 20;
            cam.top = 20;
            cam.bottom = -20;
            cam.near = this._camera.near;
            cam.far = this._camera.far;
        }

        this._ambient = new THREE.AmbientLight("#ffffff", 1.0);
    }

    public clear() {
        this._actors = [];
        this._scene.clear();
        this._scene.add(this._light);
        this._scene.add(this._ambient);
    }

    public add(actor: Actor) {
        this._actors.push(actor);

        if (actor.model != null) {
            this._scene.add(actor.model.data);
        }
    }

    /* OVERRIDES */
    public async update(dt: number) {

    }

    public async init() {

    }
}