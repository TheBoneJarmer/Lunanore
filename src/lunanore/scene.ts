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
        const ambLight = new THREE.AmbientLight("#aaaaaa", 0.5);

        const dirLight = new THREE.DirectionalLight("#ffffff", 1.0);
        dirLight.position.set(10, 10, 10);
        dirLight.shadow.mapSize.set(1024, 1024);
        dirLight.castShadow = true;

        const shadowCam = dirLight.shadow.camera as THREE.OrthographicCamera;
        shadowCam.left = -10;
        shadowCam.right = 10;
        shadowCam.top = 10;
        shadowCam.bottom = -10;
        shadowCam.near = 0.01;
        shadowCam.far = 1000;

        this._light = dirLight;
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