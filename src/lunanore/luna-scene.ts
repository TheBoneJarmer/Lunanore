import { AmbientLight, DirectionalLight, Light, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { LunaObject } from "./luna-object";

export abstract class LunaScene {
    private _objects: LunaObject[] = [];
    private _scene: Scene = null;
    private _camera: PerspectiveCamera = null;
    private _light: Light = null;
    private _ambient: AmbientLight = null;

    public get scene(): Scene {
        return this._scene;
    }

    public get objects(): LunaObject[] {
        return this._objects;
    }

    public get camera(): PerspectiveCamera {
        return this._camera;
    }

    public set camera(value: PerspectiveCamera) {
        this._camera = value;
    }

    public get light(): Light {
        return this._light;
    }

    public set light(value: Light) {
        this._light = value;
    }

    public get ambient(): AmbientLight {
        return this._ambient;
    }

    public set ambient(value: AmbientLight) {
        this._ambient = value;
    }

    constructor() {
        this._scene = new Scene();
        this._camera = new PerspectiveCamera(75, innerWidth / innerHeight, 0.01, 1000);
        this._light = new DirectionalLight("#ffffff", 1.0);
        this._ambient = new AmbientLight("#aaaaaa", 0.5);
    }

    public async clear() {
        this._objects = [];
        this._scene.clear();
        this._scene.add(this._light);
        this._scene.add(this._ambient);
    }

    public async add(obj: LunaObject) {
        this._objects.push(obj);

        if (obj.model != null) {
            this._scene.add(obj.model.data);
        }
    }

    /* OVERRIDES */
    public async update(dt: number) {
        
    }

    public async init() {
        
    }
}