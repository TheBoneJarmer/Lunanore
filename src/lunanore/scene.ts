import * as THREE from "three";
import { Actor } from "./actor";

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
        const fov = 60.0;
        const aspect = innerWidth / innerHeight;
        const near = 0.01;
        const far = 1000.0;

        this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    }

    private constructLight() {
        const ambLight = new THREE.AmbientLight("#ffffff", 1.0);

        const light = new THREE.DirectionalLight("#ffffff", 1.0);
        light.position.set(10, 10, 10);
        light.shadow.mapSize.set(1024, 1024);
        light.castShadow = true;

        const cam = light.shadow.camera as THREE.OrthographicCamera;
        cam.left = -10;
        cam.right = 10;
        cam.top = 10;
        cam.bottom = -10;
        cam.near = this._camera.near;
        cam.far = this._camera.far;

        this._light = light;
        this._ambient = ambLight;
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