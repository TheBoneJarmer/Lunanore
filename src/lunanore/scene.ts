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
        this._scene = new THREE.Scene();
        this._camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.01, 1000);
        this._light = new THREE.DirectionalLight("#ffffff", 1.0);
        this._ambient = new THREE.AmbientLight("#aaaaaa", 0.5);
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