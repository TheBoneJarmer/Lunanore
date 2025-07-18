import * as THREE from "three";
import { SkeletonUtils } from "three/examples/jsm/Addons.js";

export class Model {
    private _mixer: THREE.AnimationMixer = null;
    private _data: THREE.Group = null;
    private _position: THREE.Vector3 = new THREE.Vector3();
    private _rotation: THREE.Euler = new THREE.Euler(0, 0, 0);
    private _scale: THREE.Vector3 = new THREE.Vector3(1, 1, 1);
    private _animations: THREE.AnimationClip[] = [];

    public get data(): THREE.Group {
        return this._data;
    }

    public set data(value: THREE.Group) {
        this._data = value;
        this._mixer = new THREE.AnimationMixer(value);
    }

    public get animations(): THREE.AnimationClip[] {
        return this._animations;
    }

    public set animations(value: THREE.AnimationClip[]) {
        this._animations = value;
    }

    public get position(): THREE.Vector3 {
        return this._position;
    }

    public set position(value: THREE.Vector3) {
        this._position = value;
    }

    public get rotation(): THREE.Euler {
        return this._rotation;
    }

    public set rotation(value: THREE.Euler) {
        this._rotation = value;
    }

    public get scale(): THREE.Vector3 {
        return this._scale;
    }

    public set scale(value: THREE.Vector3) {
        this._scale = value;
    }

    public clone(): Model {
        let result = new Model();

        for (let obj of this._data.children) {
            const clone = SkeletonUtils.clone(obj);
            result.data.add(clone);
        }

        for (let anim of this.animations) {
            const clone = anim.clone();
            result.animations.push(clone);
        }

        return result;
    }

    constructor() {
        this._data = new THREE.Group();
        this._mixer = new THREE.AnimationMixer(this._data);
        this._animations = [];
    }

    public async update(dt: number) {
        this._data.position.copy(this._position);
        this._data.rotation.copy(this._rotation);
        this._data.scale.copy(this._scale);

        this._mixer.update(dt);
    }

    public async play(source: string | THREE.AnimationClip, loop: boolean = false): Promise<THREE.AnimationAction | null> {
        let clip: THREE.AnimationClip | null = null;

        if (typeof (source) == "string") {
            clip = this._animations.find(x => x.name == source) ?? null;
        }

        if (source instanceof THREE.AnimationClip) {
            clip = source;
        }

        if (clip != null) {
            const action = this._mixer.clipAction(clip);
            action.loop = loop ? THREE.LoopRepeat : THREE.LoopOnce;
            action.play();

            return action;
        }

        return null;
    }

    /* STATIC FUNCTIONS */
    public static cube(size: number = 1, mat: THREE.Material = null): Model {
        let geom = new THREE.BoxGeometry(size, size, size);

        if (mat == null) {
            mat = new THREE.MeshBasicMaterial();
        }

        const mesh = new THREE.Mesh(geom, mat);
        const model = new Model();
        model.data.add(mesh);

        return model;
    }

    public static sphere(radius: number = 1, widthSegments: number = 16, heightSegments: number = 12, mat: THREE.Material = null): Model {
        let geom = new THREE.SphereGeometry(radius, widthSegments, heightSegments);

        if (mat == null) {
            mat = new THREE.MeshBasicMaterial();
        }

        const mesh = new THREE.Mesh(geom, mat);
        const model = new Model();
        model.data.add(mesh);

        return model;
    }

    public static cone(radius: number = 1, height: number = 2, radialSegments: number = 16, mat: THREE.Material = null): Model {
        let geom = new THREE.ConeGeometry(radius, height, radialSegments);

        if (mat == null) {
            mat = new THREE.MeshBasicMaterial();
        }

        const mesh = new THREE.Mesh(geom, mat);
        const model = new Model();
        model.data.add(mesh);

        return model;
    }

    public static box(width: number = 1, height: number = 1, depth: number = 1, mat: THREE.Material = null): Model {
        let geom = new THREE.BoxGeometry(width, height, depth);

        if (mat == null) {
            mat = new THREE.MeshBasicMaterial();
        }

        const mesh = new THREE.Mesh(geom, mat);
        const model = new Model();
        model.data.add(mesh);

        return model;
    }

    public static cylinder(radiusTop: number = 1, radiusBottom: number = 1, height: number = 2, radialSegments: number = 16, mat: THREE.Material = null): Model {
        let geom = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments);

        if (mat == null) {
            mat = new THREE.MeshBasicMaterial();
        }

        const mesh = new THREE.Mesh(geom, mat);
        const model = new Model();
        model.data.add(mesh);

        return model;
    }

    public static torus(radius: number = 1, tube: number = 0.4, radialSegments: number = 16, tubularSegments: number = 100, mat: THREE.Material = null): Model {
        let geom = new THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments);

        if (mat == null) {
            mat = new THREE.MeshBasicMaterial();
        }

        const mesh = new THREE.Mesh(geom, mat);
        const model = new Model();
        model.data.add(mesh);

        return model;
    }

    public static torusKnot(radius: number = 1, tube: number = 0.4, tubularSegments: number = 100, radialSegments: number = 16, p: number = 2, q: number = 3, mat: THREE.Material = null): Model {
        let geom = new THREE.TorusKnotGeometry(radius, tube, tubularSegments, radialSegments, p, q);

        if (mat == null) {
            mat = new THREE.MeshBasicMaterial();
        }

        const mesh = new THREE.Mesh(geom, mat);
        const model = new Model();
        model.data.add(mesh);

        return model;
    }

    public static plane(width: number = 1, height: number = 1, widthSegments: number = 1, heightSegments: number = 1, mat: THREE.Material = null): Model {
        let geom = new THREE.PlaneGeometry(width, height, widthSegments, heightSegments);

        if (mat == null) {
            mat = new THREE.MeshBasicMaterial();
        }

        const mesh = new THREE.Mesh(geom, mat);
        const model = new Model();
        model.data.add(mesh);

        return model;
    }
}