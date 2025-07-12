import {
    AnimationAction,
    AnimationClip,
    AnimationMixer,
    BoxGeometry,
    ConeGeometry,
    CylinderGeometry,
    Group,
    LoopOnce,
    LoopRepeat,
    Material,
    Mesh,
    MeshBasicMaterial,
    PlaneGeometry,
    SphereGeometry,
    TorusGeometry
} from "three";
import { SkeletonUtils } from "three/examples/jsm/Addons.js";

export class Model {
    private _mixer: AnimationMixer = null;
    private _data: Group = null;
    private _animations: AnimationClip[] = [];

    public get data(): Group {
        return this._data;
    }

    public set data(value: Group) {
        this._data = value;
        this._mixer = new AnimationMixer(value);
    }

    public get animations(): AnimationClip[] {
        return this._animations;
    }

    public set animations(value: AnimationClip[]) {
        this._animations = value;
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
        this._data = new Group();
        this._mixer = new AnimationMixer(this._data);
        this._animations = [];
    }

    public async update(dt: number) {
        this._mixer.update(dt);
    }

    public async play(source: string | AnimationClip, loop: boolean = false): Promise<AnimationAction | null> {
        let clip: AnimationClip | null = null;

        if (typeof (source) == "string") {
            clip = this._animations.find(x => x.name == source) ?? null;
        }

        if (source instanceof AnimationClip) {
            clip = source;
        }

        if (clip != null) {
            const action = this._mixer.clipAction(clip);
            action.loop = loop ? LoopRepeat : LoopOnce;
            action.play();

            return action;
        }

        return null;
    }

    /* STATIC FUNCTIONS */
    public static cube(size: number = 1, mat: Material = null): Model {
        let geom = new BoxGeometry(size, size, size);

        if (mat == null) {
            mat = new MeshBasicMaterial();
        }

        const mesh = new Mesh(geom, mat);
        const model = new Model();
        model.data.add(mesh);

        return model;
    }

    public static sphere(radius: number = 1, widthSegments: number = 16, heightSegments: number = 12, mat: Material = null): Model {
        let geom = new SphereGeometry(radius, widthSegments, heightSegments);

        if (mat == null) {
            mat = new MeshBasicMaterial();
        }

        const mesh = new Mesh(geom, mat);
        const model = new Model();
        model.data.add(mesh);

        return model;
    }

    public static cone(radius: number = 1, height: number = 2, radialSegments: number = 16, mat: Material = null): Model {
        let geom = new ConeGeometry(radius, height, radialSegments);

        if (mat == null) {
            mat = new MeshBasicMaterial();
        }

        const mesh = new Mesh(geom, mat);
        const model = new Model();
        model.data.add(mesh);

        return model;
    }

    public static box(width: number = 1, height: number = 1, depth: number = 1, mat: Material = null): Model {
        let geom = new BoxGeometry(width, height, depth);

        if (mat == null) {
            mat = new MeshBasicMaterial();
        }

        const mesh = new Mesh(geom, mat);
        const model = new Model();
        model.data.add(mesh);

        return model;
    }

    public static cylinder(radiusTop: number = 1, radiusBottom: number = 1, height: number = 2, radialSegments: number = 16, mat: Material = null): Model {
        let geom = new CylinderGeometry(radiusTop, radiusBottom, height, radialSegments);

        if (mat == null) {
            mat = new MeshBasicMaterial();
        }

        const mesh = new Mesh(geom, mat);
        const model = new Model();
        model.data.add(mesh);

        return model;
    }

    public static torus(radius: number = 1, tube: number = 0.4, radialSegments: number = 16, tubularSegments: number = 100, mat: Material = null): Model {
        let geom = new TorusGeometry(radius, tube, radialSegments, tubularSegments);

        if (mat == null) {
            mat = new MeshBasicMaterial();
        }

        const mesh = new Mesh(geom, mat);
        const model = new Model();
        model.data.add(mesh);

        return model;
    }

    public static plane(width: number = 1, height: number = 1, widthSegments: number = 1, heightSegments: number = 1, mat: Material = null): Model {
        let geom = new PlaneGeometry(width, height, widthSegments, heightSegments);

        if (mat == null) {
            mat = new MeshBasicMaterial();
        }

        const mesh = new Mesh(geom, mat);
        const model = new Model();
        model.data.add(mesh);

        return model;
    }
}